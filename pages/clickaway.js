'use client';

import { useEffect, useState } from 'react';
import { supabase } from 'lib/supabase';

const MATCH_START_DATE = new Date('2025-01-30T23:12:00Z'); // Set the match start date here

export default function ClickBattle() {
  const [countdown, setCountdown] = useState(null);
  const [clicks, setClicks] = useState(0);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [tier, setTier] = useState(1);
  const [isClicking, setIsClicking] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('clickUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setShowForm(false);
        calculateCountdown();
        fetchClicks(parsedUser.id);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareMessage(`I'm at ${clicks} clicks! Help me win $10k and a free website! ${window.location.href}`);
    }
  }, [clicks]);

  const calculateCountdown = () => {
    const now = new Date();
    const diff = MATCH_START_DATE - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    setCountdown(days > 0 ? days : 0);
  };

  const fetchClicks = async (userId) => {
    const { count } = await supabase
      .from('clicks')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);
    setClicks(count || 0);
    updateTier(count || 0);
  };

  const updateTier = (count) => {
    setTier(count >= 10000 ? 3 : count >= 100 ? 2 : 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      id: crypto.randomUUID(),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };

    const { error } = await supabase.from('users').insert([userData]);
    if (!error) {
      setUser(userData);
      localStorage.setItem('clickUser', JSON.stringify(userData));
      setShowForm(false);
      calculateCountdown();
    }
  };

  const handleClick = async () => {
    if (countdown > 0 || isClicking) return;
    
    setIsClicking(true);
    try {
      const newClicks = clicks + 1;
      const currentTier = newClicks >= 1000 ? 3 : newClicks >= 500 ? 2 : 1;
      
      const { error } = await supabase.from('clicks').insert([
        {
          user_id: user.id,
          timestamp: new Date().toISOString(),
          tier: currentTier,
        },
      ]);

      if (!error) {
        setClicks(newClicks);
        updateTier(newClicks);
      }
    } finally {
      setIsClicking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 w-full relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="animate-pulse-slow absolute top-20 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-screen" />
        <div className="animate-pulse-slow-delayed absolute top-40 right-1/3 w-24 h-24 bg-indigo-500 rounded-full mix-blend-screen" />
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🏆 7-Day Click Challenge
          </h1>
          <p className="text-center text-gray-200 mb-8">Join the fun! Compete fairly with players worldwide</p>
          
          <div className="space-y-4">
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
              className="w-full p-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300" 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              className="w-full p-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300" 
            />
            <input 
              type="tel" 
              name="phone" 
              placeholder="Phone" 
              required 
              className="w-full p-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300" 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl font-bold text-purple-900 
                      hover:from-yellow-300 hover:to-orange-400 transition-all transform hover:scale-[1.02] active:scale-95
                      shadow-lg hover:shadow-xl shadow-yellow-400/20"
          >
            Start Challenge 🚀
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto relative">
          {/* Progress indicator */}
          <div className="w-full bg-white/10 rounded-full h-4 mb-8">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min((clicks / 1000) * 100, 100)}%` }}
            />
          </div>

          <div className="space-y-6 w-full">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <p className="text-gray-300 mb-4">Current Tier</p>
              <div className={`inline-flex items-center px-6 py-2 rounded-full text-lg font-bold ${
                tier === 1 ? 'bg-blue-500/20 text-blue-400' : 
                tier === 2 ? 'bg-purple-500/20 text-purple-400' : 
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {['⭐ Rookie', '✨ Pro', '💎 Legend'][tier - 1]}
              </div>
              
              <h2 className="text-7xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent my-6">
                {clicks}
              </h2>
              
              <button
                onClick={handleClick}
                disabled={countdown > 0}
                className={`w-full py-6 text-2xl font-bold rounded-xl transition-all transform ${
                  countdown > 0 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-700 hover:to-emerald-400 hover:scale-[1.02]'
                } active:scale-95 shadow-lg ${!countdown && ''}`}
              >
                {countdown > 0 ? (
                  <span className="flex items-center justify-center space-x-2">
                    <span className="animate-pulse">⏳</span>
                    <span>{countdown} Days Remaining</span>
                  </span>
                ) : (
                  'CLICK TO WIN! 🎯'
                )}
              </button>
            </div>

            {/* Rules & Info */}
            <div className="bg-white/5 p-6 rounded-xl text-left space-y-4">
              <h3 className="text-xl font-bold text-yellow-400">How to Win</h3>
              <ul className="space-y-2 text-gray-200">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Most clicks in 7 days wins 100 USD</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>Winner get a custom Service Website for free.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>No bots allowed - fair play only</span>
                </li>
              </ul>
            </div>

            {/* Share Section */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Invite Friends</h3>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`)}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-full transition-all"
                >
                  <span className="text-blue-400">🐦</span>
                  <span>Twitter</span>
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`)}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 rounded-full transition-all"
                >
                  <span className="text-green-400">💬</span>
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}