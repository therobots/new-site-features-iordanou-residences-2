import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import BookingCalendar from '@/components/BookingCalendar';
import { differenceInDays, addDays } from 'date-fns';

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const property = location.state?.property;

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(2);

  if (!property) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4">Property not found.</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  // --- Η ΣΥΝΑΡΤΗΣΗ ΥΠΟΛΟΓΙΣΜΟΥ (Calculator) ---
  const calculateTotal = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const nights = differenceInDays(checkOut, checkIn);
    let total = 0;

    for (let i = 0; i < nights; i++) {
      const date = addDays(checkIn, i);
      const month = date.getMonth() + 1; // 6=Ιούνιος, 7=Ιούλιος, 8=Αύγουστος

      let dailyPrice = property.base_price_per_night || 0;

      // Εφαρμογή των τιμών που ζήτησες
      if (property.id === "Villa Hermes") {
        if (month === 6) dailyPrice = 160;
        else if (month === 7) dailyPrice = 165;
        else if (month === 8) dailyPrice = 175;
      } else if (property.id === "traditional-stonehouse") {
        if (month === 6) dailyPrice = 250;
        else if (month === 7) dailyPrice = 260;
        else if (month === 8) dailyPrice = 280;
      }
      
      total += dailyPrice;
    }
    return total;
  };

  const totalPrice = calculateTotal(checkIn, checkOut);

  const handleDateSelect = (inDate, outDate) => {
    setCheckIn(inDate);
    setCheckOut(outDate);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 font-heading">{property.name}</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <BookingCalendar 
          blockedDates={property.blocked_dates || []} 
          icalUrl={property.ical_url}
          onDateSelect={handleDateSelect}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      </div>

      {checkIn && checkOut && (
        <div className="mt-6 p-6 bg-primary/5 rounded-xl border border-primary/20">
          <div className="flex justify-between items-center text-lg font-semibold text-foreground">
            <span>Συνολικό Κόστος:</span>
            <span>{totalPrice}€</span>
          </div>
          <Button className="w-full mt-4 bg-primary" onClick={() => alert("Booking request sent!")}>
            Κράτηση
          </Button>
        </div>
      )}
    </div>
  );
}
