import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Ensure Supabase client is correctly initialized
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetchTemplates();
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      setTemplates(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, field, value) => {
    try {
      const { error } = await supabase
        .from('email_templates')
        .update({ [field]: value })
        .eq('id', id);

      if (error) throw error;
      fetchTemplates();
      setNotification('Template updated successfully!');
    } catch (error) {
      setError(error.message);
      setNotification('Failed to update template.');
    }
  };

  const handleSave = async (template) => {
    try {
      const { error } = await supabase
        .from('email_templates')
        .update({
          template_name: template.template_name,
          template_content: template.template_content,
        })
        .eq('id', template.id);

      if (error) throw error;
      fetchTemplates();
      setNotification('Template saved successfully!');
    } catch (error) {
      setError(error.message);
      setNotification('Failed to save template.');
    }
  };

  const handlePin = async (id, isPinned) => {
    handleUpdate(id, 'is_pinned', !isPinned);
  };

  const filteredTemplates = templates
    .filter((template) => {
      if (filter === 'pinned') {
        return template.is_pinned;
      } else if (filter === 'unpinned') {
        return !template.is_pinned;
      }
      return true;
    })
    .filter((template) =>
      template.template_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={() => router.push('/dashboard/new')}
          className="bg-green-400 text-black py-1 px-2 rounded-md hover:bg-green-500"
        >
          + Template
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {notification && <div className="text-green-500 mb-4">{notification}</div>}

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border px-2 py-1 mr-4"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="all">All</option>
          <option value="pinned">Pinned</option>
          <option value="unpinned">Unpinned</option>
        </select>
      </div>

      {filteredTemplates.length === 0 ? (
        <p>No templates found.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Template Name</th>
              <th className="py-2 px-4 border-b">Template Content</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTemplates.map((template) => (
              <tr key={template.id}>
                <td className="py-2 px-4 border-b">
                  <input
                    type="text"
                    value={template.template_name}
                    onChange={(e) =>
                      setTemplates((prevTemplates) =>
                        prevTemplates.map((t) =>
                          t.id === template.id ? { ...t, template_name: e.target.value } : t
                        )
                      )
                    }
                    className="w-full border px-2 py-1"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <textarea
                    value={template.template_content}
                    onChange={(e) =>
                      setTemplates((prevTemplates) =>
                        prevTemplates.map((t) =>
                          t.id === template.id ? { ...t, template_content: e.target.value } : t
                        )
                      )
                    }
                    className="w-full border px-2 py-1"
                  />
                </td>
                <td className="py-2 px-4 border-b flex items-center">
                  <button
                    onClick={() => handlePin(template.id, template.is_pinned)}
                    className={`py-1 px-2 rounded-md ${
                      template.is_pinned ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                  >
                    {template.is_pinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button
                    onClick={() => handleSave(template)}
                    className="ml-2 py-1 px-2 bg-blue-500 text-white rounded-md"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}