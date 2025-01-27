import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';


// 2. Legal Services Form
export default function LegalContactForm() {
    const [state, handleSubmit] = useForm("xgeggljb");
  
    if (state.succeeded) {
      return (
        <div className="text-center p-8 bg-blue-900 text-white rounded-2xl">
          <h2 className="text-3xl font-bold mb-2">Case Received!</h2>
          <p>A legal expert will contact you within 2 hours</p>
        </div>
      );
    }
  
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6 text-white">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-yellow-400 mb-3">
                Free Case Evaluation
              </h2>
              <p className="text-blue-200">97% success rate • 24/7 availability</p>
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Case Type <span className="text-yellow-400">*</span>
                </label>
                <select 
                  name="case_type"
                  required
                  className="w-full px-4 py-3 bg-blue-800 border-2 border-blue-700 rounded-lg"
                >
                  <option value="">Select...</option>
                  <option>Personal Injury</option>
                  <option>Family Law</option>
                  <option>Criminal Defense</option>
                  <option>Employment Law</option>
                </select>
              </div>
  
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Incident Date <span className="text-yellow-400">*</span>
                </label>
                <input
                  type="date"
                  name="incident_date"
                  required
                  className="w-full px-4 py-3 bg-blue-800 border-2 border-blue-700 rounded-lg"
                />
              </div>
            </div>
  
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Case Details <span className="text-yellow-400">*</span>
              </label>
              <textarea
                name="case_details"
                required
                rows="3"
                className="w-full px-4 py-3 bg-blue-800 border-2 border-blue-700 rounded-lg"
                placeholder="Describe your legal situation..."
              />
            </div>
  
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="urgent" 
                className="w-4 h-4 text-yellow-500" 
              />
              <label htmlFor="urgent" className="text-sm">
                Requires immediate attention
              </label>
            </div>
  
            <button
              disabled={state.submitting}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-4 rounded-lg transition-all"
            >
              {state.submitting ? 'Submitting...' : 'Get Free Consultation 🏛️'}
            </button>
          </form>
        </div>
      </div>
    );
  }