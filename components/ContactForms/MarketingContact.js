import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';



export default function MarketingContact() {
  const [state, handleSubmit] = useForm("xgeggljb");
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleFormSubmit = async (event) => {
    await handleSubmit(event);
    if (state.succeeded) {
      setIsFormVisible(false);
    }
  };
  
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-blue-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-3">
                Free Marketing Audit
              </h2>
              <p className="text-lg text-gray-600">
                Get your custom growth strategy in 48 hours
              </p>
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Current Monthly Ad Spend ($)
                </label>
                <select 
                  name="budget"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="<1000">&lt; $1,000</option>
                  <option value="1k-5k">$1k - $5k</option>
                  <option value="5k-20k">$5k - $20k</option>
                  <option value="20k+">&gt; $20k</option>
                </select>
              </div>
  
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Main Marketing Channels
                </label>
                <div className="flex flex-wrap gap-3">
                  {['Google Ads', 'Facebook', 'Instagram', 'LinkedIn', 'Other'].map((channel) => (
                    <label key={channel} className="flex items-center">
                      <input type="checkbox" name="channels" value={channel} className="mr-2" />
                      <span className="text-sm">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
  
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Biggest Marketing Challenge
              </label>
              <textarea
                name="challenge"
                placeholder="e.g., Low conversion rates, high CAC..."
                rows="3"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
              />
            </div>
  
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-orange-200">
              Get Free Strategy Session →
            </button>
          </form>
        </div>
      </div>
    );
  }