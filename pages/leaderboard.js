'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ClickAwayDashboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase.from('leaderboard').select('*');
    if (!error) {
      setLeaderboard(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-4">ClickAway Leaderboard</h1>
      <div className="mt-6 max-w-lg mx-auto bg-gray-800 p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-3">Top Clickers</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2">Rank</th>
              <th className="p-2">Name</th>
              <th className="p-2">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.total_clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
