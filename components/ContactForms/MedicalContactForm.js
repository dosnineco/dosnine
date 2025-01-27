import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

// 3. Healthcare/Medical Form
export default function MedicalContactForm() {
    const [state, handleSubmit] = useForm("xgeggljb");
    const [selectedTime, setSelectedTime] = useState('');
  
    if (state.succeeded) {
      return (
        <div className="text-center p-8 bg-green-50 rounded-2xl">
          <h2 className="text-3xl font-bold text-green-800 mb-2">Appointment Booked!</h2>
          <p className="text-green-600">Check your email for confirmation</p>
        </div>
      );
    }
  
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-green-800 mb-3">
                Book Your Appointment
              </h2>
              <p className="text-green-600">Same-day appointments available</p>
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Insurance <span className="text-red-500">*</span>
                </label>
                <select 
                  name="insurance"
                  required
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-xl"
                >
                  <option value="">Select Provider</option>
                  <option>Blue Cross</option>
                  <option>Aetna</option>
                  <option>United Healthcare</option>
                  <option>Medicare</option>
                </select>
              </div>
  
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Preferred Time <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  {['Morning', 'Afternoon', 'Evening'].map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`flex-1 py-2 rounded-lg transition-all ${
                        selectedTime === time 
                          ? 'bg-green-600 text-white' 
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="preferred_time" value={selectedTime} />
              </div>
            </div>
  
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Services Needed <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Checkup', 'Vaccination', 'Specialist Consult', 'Lab Work'].map((service) => (
                  <label key={service} className="flex items-center bg-green-50 p-3 rounded-lg">
                    <input 
                      type="checkbox" 
                      name="services" 
                      value={service} 
                      className="mr-2" 
                      required
                    />
                    {service}
                  </label>
                ))}
              </div>
            </div>
  
            <button
              disabled={state.submitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-200 transition-all"
            >
              {state.submitting ? 'Booking...' : 'Confirm Appointment 🩺'}
            </button>
          </form>
        </div>
      </div>
    );
  }