// CreateLoan.js
import { useState } from 'react';

export default function CreateLoan() {
  const [formData, setFormData] = useState({
    bankId: '',
    agencyId: '',
    loanType: '',
    interestRate: '',
    maxAmount: '',
    minAmount: '',
    termLength: '',
    eligibilityCriteria: '',
    additionalInfo: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="bankId" onChange={handleChange} placeholder="Bank ID" />
      <input type="text" name="agencyId" onChange={handleChange} placeholder="Agency ID" />
      <input type="text" name="loanType" onChange={handleChange} placeholder="Loan Type" />
      <input type="number" name="interestRate" onChange={handleChange} placeholder="Interest Rate" />
      <input type="number" name="maxAmount" onChange={handleChange} placeholder="Max Amount" />
      <input type="number" name="minAmount" onChange={handleChange} placeholder="Min Amount" />
      <input type="number" name="termLength" onChange={handleChange} placeholder="Term Length (months)" />
      <input type="text" name="eligibilityCriteria" onChange={handleChange} placeholder="Eligibility Criteria" />
      <input type="text" name="additionalInfo" onChange={handleChange} placeholder="Additional Info" />
      <button type="submit">Create Loan</button>
    </form>
  );
}
