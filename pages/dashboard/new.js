import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; // Ensure Supabase client is correctly initialized
import { useUser } from '@clerk/nextjs';

export default function AddTemplatePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [userId, setUserId] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [templateContent, setTemplateContent] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setUserId(user.id);
      setError(null);
    } else {
      setError('User is not signed in');
    }
  }, [isLoaded, isSignedIn, user]);

  const handleTemplateNameChange = (e) => {
    setTemplateName(e.target.value);
  };

  const handleTemplateContentChange = (e) => {
    setTemplateContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!templateName || !templateContent) {
      setError('Template name and content are required');
      return;
    }

    if (!userId) {
      setError('User is not signed in');
      return;
    }

    try {
      // Insert data directly as fields
      const { data, error } = await supabase
        .from('email_templates')
        .insert([{ user_id: userId, template_name: templateName, template_content: templateContent }]);

      if (error) throw new Error(error.message);

      setSuccess('Template added successfully!');
      setError(null);
      setTemplateName('');
      setTemplateContent('');
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen mt-10 mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Add New Template</h1>

      {user?.fullName && <p className="text-center mb-4">Welcome, {user.fullName}!</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="template_name" className="block text-sm font-medium text-gray-700">
            Template Name
          </label>
          <input
            type="text"
            id="template_name"
            name="template_name"
            value={templateName}
            onChange={handleTemplateNameChange}
            required
            aria-required="true"
            placeholder="Enter template name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="template_content" className="block text-sm font-medium text-gray-700">
            Template Content
          </label>
          <textarea
            id="template_content"
            name="template_content"
            value={templateContent}
            onChange={handleTemplateContentChange}
            required
            aria-required="true"
            placeholder="Enter template content"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
        >
          Add Template
        </button>

        {error && <div className="text-red-500 mt-4">{error}</div>}
        {success && <div className="text-green-500 mt-4">{success}</div>}
      </form>
    </div>
  );
}