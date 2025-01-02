import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import Notification from 'components/Notification';
import TemplateTable from '../components/TemplateTable';
import Pagination from '../components/Pagination';
import SearchFilterSort from '../components/SearchFilterSort';

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
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetchTemplates();
    }
  }, [isLoaded, isSignedIn, user, page, sortBy, filter, searchQuery]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const { data, error, count } = await supabase
        .from('email_templates')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .order(sortBy, { ascending: sortBy !== 'usage_count' })
        .ilike('subject', `%${searchQuery}%`)
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);
      if (error) throw error;

      setTemplates(data);
      setTotalItems(count);
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
          subject: template.subject,
          recipient: template.recipient,
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
      if (filter === 'pinned') return template.is_pinned;
      if (filter === 'unpinned') return !template.is_pinned;
      return true;
    })
    .filter((template) => template.subject.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={() => router.push('/dashboard/new')}
          className="bg-green-400 text-black py-1 px-2 hover:bg-green-500"
        >
          + Template
        </button>
      </div>
      <Notification error={error} notification={notification} />
      <SearchFilterSort
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {loading ? (
        <p>Loading...</p>
      ) : filteredTemplates.length === 0 ? (
        <p>No templates found.</p>
      ) : (
        <TemplateTable
          templates={filteredTemplates}
          handlePin={handlePin}
          handleDelete={handleDelete}
          setSelectedTemplate={setSelectedTemplate}
        />
      )}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
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