// RetrieveBanks.js
import { useEffect, useState } from 'react';

export default function RetrieveBanks() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      const response = await fetch('/api/banks');
      const data = await response.json();
      setBanks(data.banks);
    };

    fetchBanks();
  }, []);

  return (
    <ul>
      {banks.map(bank => (
        <li key={bank.BankID}>{bank.BankName}</li>
      ))}
    </ul>
  );
}