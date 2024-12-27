import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    business_name: '',
    industry: '',
    description: '',  // Added description field for new clients
    created_at: '',
    updated_at: '',
    user_id: '',
  });
  const [editingClient, setEditingClient] = useState(null);

  // Fetch all clients
  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_onboarding_info')  // Updated table name
        .select('id, name, business_name, industry, description, created_at, updated_at, user_id');  // Adjusted field selection

      if (error) throw error;
      setClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Add a new client
  const handleAddClient = async () => {
    try {
      const { data, error } = await supabase
        .from('user_onboarding_info')  // Adjusted table name
        .insert([newClient]);

      if (error) throw error;
      setClients([...clients, ...data]);
      setNewClient({
        name: '',
        business_name: '',
        industry: '',
        description: '',  // Reset the description field
        created_at: '',
        updated_at: '',
        user_id: '',
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit an existing client
  const handleEditClient = async () => {
    try {
      const { data, error } = await supabase
        .from('user_onboarding_info')  // Adjusted table name
        .update(editingClient)
        .eq('id', editingClient.id);

      if (error) throw error;
      setClients(
        clients.map((client) => (client.id === editingClient.id ? data[0] : client))
      );
      setEditingClient(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a client
  const handleDeleteClient = async (id) => {
    try {
      const { error } = await supabase
        .from('user_onboarding_info')  // Adjusted table name
        .delete()
        .eq('id', id);

      if (error) throw error;
      setClients(clients.filter((client) => client.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSendReminder = async (clientId) => {
    alert(`Reminder sent to client ID: ${clientId}`);
  };

  

  return (
    
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Client</h2>
        <div className="grid gap-4 grid-cols-2">
          {Object.keys(newClient).map((key) => (
            <input
              key={key}
              type={key === 'created_at' || key === 'updated_at' ? 'date' : 'text'}
              placeholder={key}
              value={newClient[key]}
              onChange={(e) => setNewClient({ ...newClient, [key]: e.target.value })}
              className="p-2 border rounded"
            />
          ))}
        </div>
        <button
          onClick={handleAddClient}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Client
        </button>
      </div>

      {!loading && clients.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 text-left font-medium text-gray-700">Business Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Industry</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Description</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Created At</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-t">
                  <td className="px-6 py-4">{client.business_name}</td>
                  <td className="px-6 py-4">{client.industry}</td>
                  <td className="px-6 py-4">{client.description}</td>
                  <td className="px-6 py-4">{new Date(client.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => setEditingClient(client)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleSendReminder(client.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Send Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && clients.length === 0 && <p className="text-gray-500">No clients found.</p>}

      {editingClient && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Client</h2>
          <div className="grid gap-4 grid-cols-2">
            {Object.keys(editingClient).map((key) => (
              <input
                key={key}
                type={key === 'created_at' || key === 'updated_at' ? 'date' : 'text'}
                placeholder={key}
                value={editingClient[key]}
                onChange={(e) =>
                  setEditingClient({ ...editingClient, [key]: e.target.value })
                }
                className="p-2 border rounded"
              />
            ))}
          </div>
          <button
            onClick={handleEditClient}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
