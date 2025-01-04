import { useState } from 'react';

const QuoteForm = () => {
  const [service, setService] = useState('');
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('');
  const [quote, setQuote] = useState(null);

  const handleCalculateQuote = () => {
    const total = hours * rate;
    setQuote(total);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Service Quoting Tool</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Service</label>
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Hours</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Rate per Hour ($)</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <button
        onClick={handleCalculateQuote}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Calculate Quote
      </button>
      {quote !== null && (
        <div className="mt-5 text-center">
          <h3 className="text-xl font-bold">Quote: ${quote}</h3>
        </div>
      )}
    </div>
  );
};

export default QuoteForm;