// components/Search.js
import { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/search?query=${query}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      {results && (
        <div>
          <h2>Search Results</h2>
          <div>
            <h3>Users</h3>
            <ul>
              {results.users.map(user => (
                <li key={user.UserID}>{user.Name} ({user.Email}) - {user.Location}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Banks</h3>
            <ul>
              {results.banks.map(bank => (
                <li key={bank.BankID}>{bank.BankName} - {bank.Country}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Loan Agencies</h3>
            <ul>
              {results.loanAgencies.map(agency => (
                <li key={agency.AgencyID}>{agency.AgencyName} - {agency.Country}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Loans</h3>
            <ul>
              {results.loans.map(loan => (
                <li key={loan.LoanID}>{loan.LoanType} - ${loan.MinAmount} to ${loan.MaxAmount}, {loan.InterestRate}% interest</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Reviews</h3>
            <ul>
              {results.reviews.map(review => (
                <li key={review.ReviewID}>{review.Comment} (Rating: {review.Rating})</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>User Preferences</h3>
            <ul>
              {results.userPreferences.map(pref => (
                <li key={pref.PreferenceID}>Preferred Banks: {pref.PreferredBanks}, Preferred Agencies: {pref.PreferredAgencies}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
