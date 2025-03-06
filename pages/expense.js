import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '../lib/supabase';

const TransactionsPage = () => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user-specific transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('transaction_date', { ascending: false });

        if (error) throw error;
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  // Handle edit button click
  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditData(transaction);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value
    }));
  };

  // Save changes to Supabase
  const handleSave = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .update(editData)
        .eq('id', editingId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setTransactions(prev => prev.map(t => 
        t.id === editingId ? { ...t, ...editData } : t
      ));
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete transaction
  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // if (loading) return <Layout>Loading...</Layout>;
  // if (error) return <Layout>Error: {error}</Layout>;

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="px-4 py-2">
                    {editingId === transaction.id ? (
                      <input
                        type="date"
                        name="transaction_date"
                        value={editData.transaction_date}
                        onChange={handleChange}
                        className="border rounded p-1"
                      />
                    ) : (
                      new Date(transaction.transaction_date).toLocaleDateString()
                    )}
                  </td>
                  
                  <td className="px-4 py-2">
                    {editingId === transaction.id ? (
                      <input
                        type="text"
                        name="description"
                        value={editData.description}
                        onChange={handleChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      transaction.description
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {editingId === transaction.id ? (
                      <input
                        type="number"
                        name="amount"
                        value={editData.amount}
                        onChange={handleChange}
                        className="border rounded p-1"
                        step="0.01"
                      />
                    ) : (
                      `$${transaction.amount.toFixed(2)}`
                    )}
                  </td>

                  <td className="px-4 py-2 space-x-2">
                    {editingId === transaction.id ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default TransactionsPage;