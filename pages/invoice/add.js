import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Ensure you have Supabase setup
import { useRouter } from 'next/router';

export default function InvoiceDashboard() {
  const { push } = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [filter, setFilter] = useState('');
  const [newInvoice, setNewInvoice] = useState({
    invoice_no: '',
    create_date: '',
    due_date: '',
    payment_status: '',
    total_amount: '',
  });

  useEffect(() => {
    fetchInvoices();
  }, [filter]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      let query = supabase.from('invoices').select('*');
      if (filter) {
        query = query.ilike('payment_status', `%${filter}%`);
      }
      const { data, error } = await query;
      if (error) throw error;
      setInvoices(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const { error } = await supabase.from('invoices').insert([newInvoice]);
      if (error) throw error;
      fetchInvoices();
      setNewInvoice({
        invoice_no: '',
        create_date: '',
        due_date: '',
        payment_status: '',
        total_amount: '',
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (id, updatedInvoice) => {
    try {
      const { error } = await supabase.from('invoices').update(updatedInvoice).eq('id', id);
      if (error) throw error;
      fetchInvoices();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('invoices').delete().eq('id', id);
      if (error) throw error;
      fetchInvoices();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleMassDelete = async () => {
    try {
      const { error } = await supabase.from('invoices').delete().in('id', selectedInvoices);
      if (error) throw error;
      fetchInvoices();
      setSelectedInvoices([]);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleSelectInvoice = (id) => {
    setSelectedInvoices((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((invoiceId) => invoiceId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filter by status"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border p-2 mr-2"
            />
            <button
              onClick={handleMassDelete}
              className="bg-red-500 text-white p-2 rounded"
              disabled={!selectedInvoices.length}
            >
              Delete Selected
            </button>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Create New Invoice</h2>
            <div className="grid grid-cols-6 gap-2">
              <input
                type="text"
                placeholder="Invoice No"
                value={newInvoice.invoice_no}
                onChange={(e) => setNewInvoice({ ...newInvoice, invoice_no: e.target.value })}
                className="border p-2 col-span-1"
              />
              <input
                type="date"
                placeholder="Create Date"
                value={newInvoice.create_date}
                onChange={(e) => setNewInvoice({ ...newInvoice, create_date: e.target.value })}
                className="border p-2 col-span-1"
              />
              <input
                type="date"
                placeholder="Due Date"
                value={newInvoice.due_date}
                onChange={(e) => setNewInvoice({ ...newInvoice, due_date: e.target.value })}
                className="border p-2 col-span-1"
              />
              <input
                type="text"
                placeholder="Payment Status"
                value={newInvoice.payment_status}
                onChange={(e) => setNewInvoice({ ...newInvoice, payment_status: e.target.value })}
                className="border p-2 col-span-1"
              />
              <input
                type="number"
                placeholder="Total Amount"
                value={newInvoice.total_amount}
                onChange={(e) => setNewInvoice({ ...newInvoice, total_amount: e.target.value })}
                className="border p-2 col-span-1"
              />
              <button
                onClick={handleCreate}
                className="bg-blue-500 text-white p-2 rounded col-span-1"
              >
                Create
              </button>
            </div>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Select</th>
                <th className="py-2 px-4 border-b">Invoice No</th>
                <th className="py-2 px-4 border-b">Create Date</th>
                <th className="py-2 px-4 border-b">Due Date</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Total Amount</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => toggleSelectInvoice(invoice.id)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{invoice.invoice_no}</td>
                  <td className="py-2 px-4 border-b">{invoice.create_date}</td>
                  <td className="py-2 px-4 border-b">{invoice.due_date}</td>
                  <td className="py-2 px-4 border-b">{invoice.payment_status}</td>
                  <td className="py-2 px-4 border-b">{invoice.total_amount}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleUpdate(invoice.id, invoice)}
                      className="bg-yellow-500 text-white p-1 rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(invoice.id)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}