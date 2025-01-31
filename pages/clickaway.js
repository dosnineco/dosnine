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
    <div className="min-h-screen bg-gray-900 text-white p-6 w-full">
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <h1 className="text-4xl font-extrabold text-center">🏆 7-DAY CLICK CHALLENGE 🚀</h1>
          <input type="text" name="name" placeholder="Your Name" required className="w-full p-4" />
          <input type="email" name="email" placeholder="Email" required className="w-full p-4" />
          <input type="tel" name="phone" placeholder="Phone" required className="w-full p-4" />
          <button type="submit" className="w-full py-4 bg-yellow-500">START CLICKING! 🎯</button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center  mx-auto text-center ">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-5xl font-black">{clicks}</h2>
          <p className="text-lg">TIER {tier} {['⭐', '✨', '💎'][tier - 1]}</p>
          <button
            onClick={handleClick}
            disabled={countdown > 0}
            className="w-full p-4 bg-green-400  transition transform hover:scale-105 active:scale-95 rounded-lg"
          >
            {countdown > 0 ? `${countdown} DAYS LEFT` : 'SMASH IT!'}
          </button>
        </div>
      
        {/* Share Buttons */}
        <div className="flex absolute bottom-0 justify-center space-x-4 pb-20">
          <button
            onClick={() => typeof window !== 'undefined' && window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`)}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
          >
            🐦 Twitter
          </button>
          <button
            onClick={() => typeof window !== 'undefined' && window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`)}
            className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
          >
            💬 WhatsApp
          </button>
        </div>
      </div>
      
      )}
    </div>
  );
}
