// CreateLoanAgency.js
import { useState } from 'react';

export default function CreateLoanAgency() {
  const [formData, setFormData] = useState({
    agencyName: '',
    country: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/loanAgencies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="agencyName" onChange={handleChange} placeholder="Agency Name" />
      <input type="text" name="country" onChange={handleChange} placeholder="Country" />
      <button type="submit">Create Loan Agency</button>
    </form>
  );
}