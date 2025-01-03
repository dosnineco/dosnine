// pages/invoices.js
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

export default function Invoices() {
  const { user } = useUser();
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({
    client_name: '',
    client_email: '',
    content: '',
  });

  useEffect(() => {
    if (user) {
      fetch('/api/invoices')
        .then((res) => res.json())
        .then((data) => setInvoices(data));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const newInvoice = await res.json();
    setInvoices([...invoices, newInvoice]);
    setForm({ client_name: '', client_email: '', content: '' });
  };

  return (
    <div>
      <h1>Invoices</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="client_name"
          value={form.client_name}
          onChange={handleChange}
          placeholder="Client Name"
          required
        />
        <input
          type="email"
          name="client_email"
          value={form.client_email}
          onChange={handleChange}
          placeholder="Client Email"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Invoice Content"
          required
        ></textarea>
        <button type="submit">Create Invoice</button>
      </form>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            {invoice.client_name} - {invoice.client_email} - {invoice.content}
          </li>
        ))}
      </ul>
    </div>
  );
}