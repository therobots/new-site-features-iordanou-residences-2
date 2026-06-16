import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import BookingCalendar from '@/components/BookingCalendar';
import PropertyCard from '@/components/PropertyCard';
import { calculatePricing } from '@/lib/pricing';
import { base44 } from '@/api/base44Client';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  
  const houseId = searchParams.get('house');
  const [property, setProperty] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(2);

  // Φορτώνει όλα τα σπίτια και επιλέγει το σωστό αν υπάρχει houseId στο URL
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const props = await base44.entities.Property.list();
      setAllProperties(props);

      if (houseId) {
        const selectedProp = props.find(p => p.id === houseId);
        setProperty(selectedProp || null);
      } else {
        setProperty(null);
      }
      setLoading(false);
    }
    fetchData();
  }, [houseId]);

  // 1. Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 2. Η ΝΕΑ ΟΘΟΝΗ ΕΠΙΛΟΓΗΣ (Όταν δεν έχει επιλεγεί σπίτι, δείχνει τις κατοικίες)
  if (!property) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mb-4">
            {lang === 'en' ? 'Our Accommodations' : 'Τα Καταλύματά μας'}
          </h1>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            {lang === 'en' 
              ? 'Select a residence below to check availability and proceed with your direct booking.' 
              : 'Επιλέξτε μια κατοικία παρακάτω για να δείτε τη διαθεσιμότητα και να προχωρήσετε σε κράτηση.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {allProperties.map((prop, i) => (
            <PropertyCard key={prop.id} property={prop} index={i} />
          ))}
        </div>
      </div>
    );
  }

  // 3. Normal Booking Flow (Όταν έχει επιλεγεί σπίτι)
  const { total, nights } = calculatePricing(property, checkIn, checkOut, null, guests);

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
