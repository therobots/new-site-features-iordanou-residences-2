import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import BookingCalendar from '@/components/BookingCalendar';
import { calculateTotal } from '@/lib/pricing';
import { base44 } from '@/api/base44Client';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  
  const houseId = searchParams.get('house');
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(2);

  // Φορτώνει το σπίτι από το ID του URL
  useEffect(() => {
    async function fetchProp() {
      if (!houseId) {
        setLoading(false);
        return;
      }
      const props = await base44.entities.Property.filter({ id: houseId });
      if (props.length > 0) setProperty(props[0]);
      setLoading(false);
    }
    fetchProp();
  }, [houseId]);

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 2. Empty State (No Property Selected) - This is the FIX
  if (!property) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-muted/20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-card p-8 rounded-2xl shadow-sm border border-border/50 text-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-3">
            {lang === 'en' ? 'Select a Residence' : 'Επιλέξτε Κατοικία'}
          </h2>
          <p className="text-muted-foreground font-body mb-8">
            {lang === 'en' 
              ? 'Please select one of our traditional homes to check availability and proceed with your booking.' 
              : 'Παρακαλούμε επιλέξτε μία από τις κατοικίες μας για να δείτε τη διαθεσιμότητα και να κάνετε κράτηση.'}
          </p>
          <div className="flex flex-col gap-3">
            <Button asChild className="w-full" size="lg">
              <Link to="/residences">
                {lang === 'en' ? 'View Our Residences' : 'Δείτε τις Κατοικίες μας'}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full text-muted-foreground">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('backHome')}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 3. Normal Booking Flow (Property exists)
  const { total, nights } = calculateTotal(property, checkIn, checkOut, guests);

  const handleDateSelect = (inDate, outDate) => {
    setCheckIn(inDate);
    setCheckOut(outDate);
  };

  const handleBook = () => {
    if (nights < 2) return;
    alert(`Booking request sent for ${guests} guests! Total: ${total}€`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {lang === 'en' ? 'Back' : 'Πίσω'}
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-2">
          {property.name}
        </h1>
        <p className="text-muted-foreground flex items-center gap-2">
          <Home className="w-4 h-4" />
          {lang === 'en' ? 'Booking & Availability' : 'Κράτηση & Διαθεσιμότητα'}
        </p>
      </div>
      
      {/* UI: Guests Counter */}
      <div className="mb-6 bg-card p-4 rounded-xl border border-border/50 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-foreground">{t('guests')}</h3>
          <p className="text-sm text-muted-foreground">
            {lang === 'en' ? 'Who is coming?' : 'Πόσα άτομα θα μείνουν;'}
          </p>
        </div>
        <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-lg">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setGuests(g => Math.max(1, g - 1))}
          >
            -
          </Button>
          <span className="w-8 text-center font-bold text-lg">{guests}</span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setGuests(g => Math.min(property.max_guests || 8, g + 1))}
          >
            +
          </Button>
        </div>
      </div>

      <div className="bg-card p-4 sm:p-6 rounded-xl shadow-sm border border-border/50">
        <h3 className="font-semibold text-foreground mb-4">{t('selectDates')}</h3>
        <BookingCalendar 
          blockedDates={property.blocked_dates || []} 
          icalUrl={property.ical_url}
          onDateSelect={handleDateSelect}
          checkIn={checkIn}
          checkOut={checkOut}
        />
      </div>

      {checkIn && checkOut && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 sm:p-8 bg-primary/5 rounded-2xl border border-primary/20"
        >
          {nights >= 2 ? (
            <>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{nights} {t('nights')} × {guests} {t('guests')}</span>
                  <span>{property.base_price_per_night}€ / {t('night')} (avg)</span>
                </div>
                <div className="flex justify-between items-center text-xl sm:text-2xl font-bold text-foreground pt-4 border-t border-primary/10">
                  <span>{t('total')}</span>
                  <span className="text-primary">{total}€</span>
                </div>
              </div>
              <Button className="w-full h-12 text-lg font-semibold shadow-md hover:shadow-lg transition-all" onClick={handleBook}>
                {t('whatsappCTA')}
              </Button>
            </>
          ) : (
            <div className="text-center p-4 bg-destructive/10 rounded-lg text-destructive font-semibold">
              {t('minStay')}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
