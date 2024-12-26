import supabase from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, industry, businessName, description, color } = req.body;

    const { error } = await supabase
      .from('client_websites')
      .insert([{ name, email, phone, industry, business_name: businessName, description, color }]);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.status(200).json({ message: 'Client information saved successfully.' });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
