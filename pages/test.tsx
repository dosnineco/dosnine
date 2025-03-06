import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { Edit2, Trash2, Save, X, Plus, Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Transaction {
  id: string;
  transaction_date: string;
  post_date: string;
  description: string;
  amount: number;
}

interface TrackedExpense {
  id: string;
  name: string;
  amount: number;
}

interface TransactionSummary {
  totalCredits: number;
  totalDebits: number;
  netBalance: number;
}

type FilterPeriod = 'all' | 'day' | 'week' | 'month';

function App() {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [trackedExpenses, setTrackedExpenses] = useState<TrackedExpense[]>([]);
  const [summary, setSummary] = useState<TransactionSummary>({
    totalCredits: 0,
    totalDebits: 0,
    netBalance: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Transaction>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    transaction_date: format(new Date(), 'yyyy-MM-dd'),
    post_date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    amount: 0,
  });
  const [newExpense, setNewExpense] = useState<Partial<TrackedExpense>>({
    name: '',
    amount: 0,
  });
  const [showAddExpense, setShowAddExpense] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchTransactions();
    fetchTrackedExpenses();
  }, [user]);

  const fetchTrackedExpenses = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('tracked_expenses')
        .select('*')
        .eq('user_id', user?.id);

      if (fetchError) throw fetchError;
      setTrackedExpenses(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const addTrackedExpense = async () => {
    if (!user || !newExpense.name || !newExpense.amount) return;

    try {
      const { error: insertError } = await supabase
        .from('tracked_expenses')
        .insert([
          {
            user_id: user.id,
            name: newExpense.name,
            amount: newExpense.amount,
          },
        ]);

      if (insertError) throw insertError;

      fetchTrackedExpenses();
      setNewExpense({ name: '', amount: 0 });
      setShowAddExpense(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const deleteTrackedExpense = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('tracked_expenses')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (deleteError) throw deleteError;
      fetchTrackedExpenses();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const fetchTransactions = async () => {
    try {
      let query = supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user?.id);

      // Apply date filters
      if (filterPeriod === 'day') {
        query = query.gte('transaction_date', format(subDays(new Date(), 1), 'yyyy-MM-dd'));
      } else if (filterPeriod === 'week') {
        query = query
          .gte('transaction_date', format(startOfWeek(new Date()), 'yyyy-MM-dd'))
          .lte('transaction_date', format(endOfWeek(new Date()), 'yyyy-MM-dd'));
      } else if (filterPeriod === 'month') {
        query = query
          .gte('transaction_date', format(startOfMonth(new Date()), 'yyyy-MM-dd'))
          .lte('transaction_date', format(endOfMonth(new Date()), 'yyyy-MM-dd'));
      }

      const { data, error: fetchError } = await query.order('transaction_date', { ascending: false });

      if (fetchError) throw fetchError;

      let filteredData = data || [];
      
      // Apply search filter
      if (searchTerm) {
        filteredData = filteredData.filter(t => 
          t.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setTransactions(filteredData);
      calculateSummary(filteredData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async () => {
    if (!user || !newTransaction.description || !newTransaction.amount) return;

    try {
      const { error: insertError } = await supabase
        .from('transactions')
        .insert([
          {
            user_id: user.id,
            ...newTransaction,
          },
        ]);

      if (insertError) throw insertError;

      fetchTransactions();
      setNewTransaction({
        transaction_date: format(new Date(), 'yyyy-MM-dd'),
        post_date: format(new Date(), 'yyyy-MM-dd'),
        description: '',
        amount: 0,
      });
      setShowAddForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const calculateSummary = (data: Transaction[]) => {
    const summary = data.reduce(
      (acc, curr) => {
        if (curr.amount >= 0) {
          acc.totalCredits += curr.amount;
        } else {
          acc.totalDebits += Math.abs(curr.amount);
        }
        return acc;
      },
      { totalCredits: 0, totalDebits: 0, netBalance: 0 }
    );

    summary.netBalance = summary.totalCredits - summary.totalDebits;
    setSummary(summary);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditData(transaction);
  };

  const handleSave = async () => {
    if (!editingId || !user) return;

    try {
      const { error: updateError } = await supabase
        .from('transactions')
        .update(editData)
        .eq('id', editingId)
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setTransactions(prev =>
        prev.map(t => (t.id === editingId ? { ...t, ...editData } : t))
      );
      calculateSummary(
        transactions.map(t => (t.id === editingId ? { ...t, ...editData } : t))
      );
      setEditingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;

    try {
      const { error: deleteError } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      const updatedTransactions = transactions.filter(t => t.id !== id);
      setTransactions(updatedTransactions);
      calculateSummary(updatedTransactions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Transaction Management
        </h1>

        {/* Tracked Expenses */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Tracked Expenses</h2>
            <button
              onClick={() => setShowAddExpense(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <Plus className="h-5 w-5 inline mr-2" />
              Add Expense
            </button>
          </div>

          {showAddExpense && (
            <div className="bg-gray-50 p-4 rounded mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Expense Name"
                  value={newExpense.name}
                  onChange={e => setNewExpense(prev => ({ ...prev, name: e.target.value }))}
                  className="border rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={e => setNewExpense(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                  className="border rounded px-3 py-2"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddExpense(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={addTrackedExpense}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save Expense
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {trackedExpenses.map(expense => (
              <div key={expense.id} className="bg-gray-50 p-4 rounded relative">
                <button
                  onClick={() => deleteTrackedExpense(expense.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <h3 className="font-semibold">{expense.name}</h3>
                <p className="text-xl font-bold">${expense.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Credits</h3>
            <p className="text-2xl font-bold text-green-600">
              ${summary.totalCredits.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Total Debits</h3>
            <p className="text-2xl font-bold text-red-600">
              ${summary.totalDebits.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">Net Balance</h3>
            <p
              className={`text-2xl font-bold ${
                summary.netBalance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              ${summary.netBalance.toFixed(2)}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterPeriod}
                onChange={e => setFilterPeriod(e.target.value as FilterPeriod)}
                className="border rounded px-4 py-2"
              >
                <option value="all">All Time</option>
                <option value="day">Last 24 Hours</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <button
                onClick={() => fetchTransactions()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <Filter className="h-5 w-5 inline mr-2" />
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Add Transaction Form */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            <Plus className="h-5 w-5 inline mr-2" />
            Add Transaction
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                value={newTransaction.transaction_date}
                onChange={e => setNewTransaction(prev => ({ ...prev, transaction_date: e.target.value }))}
                className="border rounded px-3 py-2"
              />
              <input
                type="date"
                value={newTransaction.post_date}
                onChange={e => setNewTransaction(prev => ({ ...prev, post_date: e.target.value }))}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={newTransaction.description}
                onChange={e => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={e => setNewTransaction(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                step="0.01"
                className="border rounded px-3 py-2"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={addTransaction}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Transaction
              </button>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === transaction.id ? (
                        <input
                          type="date"
                          value={editData.transaction_date}
                          onChange={e =>
                            setEditData(prev => ({
                              ...prev,
                              transaction_date: e.target.value,
                            }))
                          }
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        format(new Date(transaction.transaction_date), 'MMM d, yyyy')
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === transaction.id ? (
                        <input
                          type="text"
                          value={editData.description}
                          onChange={e =>
                            setEditData(prev => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        transaction.description
                      )}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        transaction.amount >= 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {editingId === transaction.id ? (
                        <input
                          type="number"
                          value={editData.amount}
                          onChange={e =>
                            setEditData(prev => ({
                              ...prev,
                              amount: parseFloat(e.target.value),
                            }))
                          }
                          step="0.01"
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        `$${Math.abs(transaction.amount).toFixed(2)}`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingId === transaction.id ? (
                        <div className="space-x-2">
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Save className="h-5 w-5 inline" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <X className="h-5 w-5 inline" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-x-2">
                          <button
                            onClick={() => handleEdit(transaction)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit2 className="h-5 w-5 inline" />
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5 inline" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;