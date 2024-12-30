// pages/template/[id].jsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function TemplatePage() {
  const router = useRouter();
  const { id } = router.query;
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTemplate();
    }
  }, [id]);

  const fetchTemplate = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setTemplate(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      {template ? (
        <>
          <h1 className="text-3xl font-bold text-gray-900">{template.template_name}</h1>
          <div className="mt-4">
            <div dangerouslySetInnerHTML={{ __html: template.template_content }} />
          </div>
        </>
      ) : (
        <p>Template not found.</p>
      )}
    </div>
  );
}