import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import Modal from 'react-modal'; // Import Modal from react-modal
import { FaEdit, FaTrash, FaThumbtack, FaThumbtackSlash, FaCopy, FaEye } from 'react-icons/fa';

// Dynamically import QuillEditor to avoid SSR issues
const QuillEditor = dynamic(() => import('../components/QuillEditor'), { ssr: false });

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date_created');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
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
        .eq('user_id', user.id)
        .order(sortBy, { ascending: sortBy !== 'usage_count' });

      if (error) throw error;

      setTemplates(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePin = async (id, isPinned) => {
    try {
      const { error } = await supabase
        .from('email_templates')
        .update({ is_pinned: !isPinned })
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

  const handleCopy = (templateContent) => {
    navigator.clipboard.writeText(templateContent);
    setNotification('Template copied to clipboard!');
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchTemplates();
      setNotification('Template deleted successfully!');
    } catch (error) {
      setError(error.message);
      setNotification('Failed to delete template.');
    }
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
          className="bg-green-400 text-black py-1 px-2  hover:bg-green-500"
        >
          + Template
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {notification && <div className="text-green-500 mb-4">{notification}</div>}

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-12 bg-white mx-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
        >
          <option value="all">All</option>
          <option value="pinned">Pinned</option>
          <option value="unpinned">Unpinned</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-12  px-3 bg-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="date_created">Date Created</option>
          <option value="usage_count">Most Used</option>
        </select>
      </div>

      {filteredTemplates.length === 0 ? (
        <p>No templates found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead className=" border border-gray-300">
            <tr className=" border border-gray-300">
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-gray-700">Template Name</th>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-gray-700">Template Content</th>
              <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTemplates.map((template) => (
              
              <tr key={template.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-gray-700">
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
                    className="h-12 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-gray-700">
                  <textarea
                    value={template.template_content}
                    readOnly
                    onChange={(e) =>
                      setTemplates((prevTemplates) =>
                        prevTemplates.map((t) =>
                          t.id === template.id ? { ...t, template_content: e.target.value } : t
                        )
                      )
                    }
                    className="h-12 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
                  />
                </td>
                <td className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center justify-center px-6 py-6  whitespace-nowrap dark:text-white ">
                  <button
                    onClick={() => handlePin(template.id, template.is_pinned)}
                    className={`py-1 px-2  ${
                      template.is_pinned ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                  >
                    <FaThumbtack /> 
                               </button>
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="py-1 px-2 bg-blue-500 text-white "
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="py-1 px-2 bg-red-500 text-white "
                  >
                   <FaTrash />
                  </button>
                  <button
                    onClick={() => router.push(`/template/${template.id}`)}
                    className="py-1 px-2 bg-purple-500 text-white "
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedTemplate && (
        <QuillEditor
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}