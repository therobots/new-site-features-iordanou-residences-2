import React, { useState } from 'react';
import { Minus, Plus, Users } from 'lucide-react';

export default function BookingCalculator({ basePriceFromCalendar, maxGuests = 6 }) {
  const [guests, setGuests] = useState(2); // Starts at a base of 2 people

  // 15 Euros per extra person after the first 2 people
  const EXTRA_GUEST_FEE = 15; 
  const BASE_GUEST_LIMIT = 2;

  // Calculation Logic
  const calculateExtraFees = () => {
    if (guests > BASE_GUEST_LIMIT) {
      return (guests - BASE_GUEST_LIMIT) * EXTRA_GUEST_FEE;
    }
    return 0;
  };

  const extraFeesPerNight = calculateExtraFees();
  const totalPricePerNight = basePriceFromCalendar + extraFeesPerNight;

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-6 font-body text-slate-900">
      <h3 className="text-xl font-heading font-bold mb-4">Reservation Details</h3>
      
      {/* Visitor Counter Interface */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-sky-600" />
          <div>
            <p className="font-semibold text-sm">Guests</p>
            <p className="text-xs text-slate-500">€15/night after 2 guests</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Minus Button */}
          <button 
            onClick={() => setGuests(prev => Math.max(1, prev - 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 active:scale-95 transition"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="font-heading font-bold text-lg w-4 text-center">{guests}</span>
          
          {/* Plus Button */}
          <button 
            onClick={() => setGuests(prev => Math.min(maxGuests, prev + 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 active:scale-95 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pricing Breakdown Display */}
      <div className="space-y-2 text-sm text-slate-600 mb-6">
        <div className="flex justify-between">
          <span>Base Price (2 guests)</span>
          <span>€{basePriceFromCalendar} / night</span>
        </div>
        
        {guests > BASE_GUEST_LIMIT && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Extra Guest Fee ({guests - BASE_GUEST_LIMIT} x €15)</span>
            <span>+€{extraFeesPerNight} / night</span>
          </div>
        )}
      </div>

      {/* Total Display */}
      <div className="flex justify-between items-center border-t border-slate-200 pt-4">
        <span className="font-heading font-bold text-lg">Total / Night</span>
        <span className="font-heading font-extrabold text-2xl text-sky-900">
          €{totalPricePerNight}
        </span>
      </div>
    </div>
  );
}
