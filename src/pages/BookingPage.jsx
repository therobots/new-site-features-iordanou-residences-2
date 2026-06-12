import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import BookingCalendar from '@/components/BookingCalendar';
import PriceSummary, { calculatePricing } from '@/components/PriceSummary';
import { ArrowLeft, MessageCircle, Calendar, Home, Info, MapPin, Users, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageCircle, Calendar, Home, Info, MapPin, Users } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '306988011845'; // Make sure this matches your phone number

export default function BookingPage() {
  const { t, localField, lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State variables for checkout
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [couponData, setCouponData] = useState(null);
  const [guests, setGuests] = useState(2); // Αρχικοποίηση στα 2 άτομα

  const { data: properties = [] } = useQuery({
    queryKey: ['properties-list'],
    queryFn: () => base44.entities.Property.list(),
    initialData: [],
  });

  useEffect(() => {
    const houseParam = searchParams.get('house');
    if (houseParam) {
      setSelectedPropertyId(houseParam);
    } else if (properties.length > 0 && !selectedPropertyId) {
      setSelectedPropertyId(properties[0].id);
    }
  }, [searchParams, properties]);

  const handlePropertyChange = (e) => {
    const newId = e.target.value;
    setSelectedPropertyId(newId);
    setSearchParams({ house: newId });
    setCheckIn(null);
    setCheckOut(null);
    setCouponData(null);
    setGuests(2); // Reset στους 2 επισκέπτες
  };

  const activeProperty = properties.find(p => p.id === selectedPropertyId);
  const maxAllowedGuests = activeProperty?.max_guests || 6;

  const handleDateSelect = (ci, co) => {
    setCheckIn(ci);
    setCheckOut(co);
    setCouponData(null);
  };

  const handleWhatsAppSubmit = () => {
    if (!activeProperty || !checkIn || !checkOut) return;
    const pricing = calculatePricing(activeProperty, checkIn, checkOut, couponData, guests);
    const propertyName = localField(activeProperty, 'name');
    const ciStr = format(checkIn, 'dd/MM/yyyy');
    const coStr = format(checkOut, 'dd/MM/yyyy');
    const coupon = couponData?.code || (lang === 'el' ? 'Καμία' : 'None');
    
    const msg = `Hello! I would like to request a direct booking at Iordanou Residences.\n\n` +
                `• Κατάλυμα: ${propertyName}\n` +
                `• Επισκέπτες: ${guests} άτομα\n` +
                `• Check-In: ${ciStr}\n` +
                `• Check-Out: ${coStr}\n` +
                `• Διαμονή: ${pricing.nights} νύχτες\n` +
                `• Κωδικός Προσφοράς: ${coupon}\n` +
                `• Συνολικό Ποσό: €${pricing.total.toFixed(2)}`;

    // Χρήση του σωστού αριθμού κινητού σου από το context
    const url = `https://wa.me/306988011845?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const canBook = checkIn && checkOut && nights >= 2;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> {t('backHome')}
      </Link>

      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
          {lang === 'el' ? 'Κράτηση Κατοικίας' : 'Book Your Island Stay'}
        </h1>
        <p className="font-body text-muted-foreground">
          {lang === 'el' ? 'Επιλέξτε κατάλυμα και ημερομηνίες για να ξεκινήσετε' : 'Select a residence and your check-in timeline.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6 bg-card border border-border/60 rounded-xl p-5 sm:p-6 shadow-sm">
          
          {/* House Selector */}
          <div>
            <label className="block text-sm font-body font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Home className="w-4 h-4 text-primary" />
              {lang === 'el' ? 'Επιλέξτε Κατοικία' : 'Select Your Accommodation'}
            </label>
            <select
              value={selectedPropertyId}
              onChange={handlePropertyChange}
              className="w-full h-12 px-3 border border-border rounded-lg bg-background font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer"
            >
              {properties.map(p => (
                <option key={p.id} value={p.id}>{localField(p, 'name')}</option>
              ))}
            </select>
          </div>

          {/* 👥 ΝΕΟ: UI Μετρητής Επισκεπτών */}
          {activeProperty && (
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/40">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-body font-semibold text-foreground">
                    {lang === 'el' ? 'Αριθμός Επισκεπτών' : 'Number of Guests'}
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    {lang === 'el' ? 'επιπλέον χρέωση +€15/νύχτα μετά τα 2 άτομα' : '€15/night fee after 2 guests'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-white hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                >
                  <Minus className="w-4 h-4 text-foreground" />
                </button>
                <span className="font-heading font-bold text-lg w-4 text-center">{guests}</span>
                <button 
                  onClick={() => setGuests(prev => Math.min(maxAllowedGuests, prev + 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-white hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>
          )}

          {activeProperty && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex gap-4 p-3 bg-muted/40 rounded-lg items-center border border-border/30">
                <img src={activeProperty.image_urls?.[0]} alt="" className="w-24 h-16 object-cover rounded-md" />
                <div>
                  <div className="font-heading font-bold text-base text-foreground">{localField(activeProperty, 'name')}</div>
                  <div className="text-xs font-body text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-primary" /> {activeProperty.location}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-body font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  {t('selectDates')}
                </label>
                <p className="text-xs text-muted-foreground font-body mb-3 flex items-center gap-1">
                  <Info className="w-3 h-3" /> {t('minStay')}
                </p>
                <BookingCalendar
                  blockedDates={activeProperty.blocked_dates || []}
                  bookings={[]}
                  onDateSelect={handleDateSelect}
                  checkIn={checkIn}
                  checkOut={checkOut}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar Pricing Layout */}
        <div className="space-y-4 lg:sticky lg:top-6">
          {activeProperty && (
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              {canBook ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <PriceSummary
                    property={activeProperty}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    couponData={couponData}
                    onCouponApplied={setCouponData}
                    guests={guests} // Πέρασμα των επισκεπτών στο summary
                  />
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-body font-semibold h-12 mt-4 gap-2 shadow-sm transition-all"
                    onClick={handleWhatsAppSubmit}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t('whatsappCTA')}
                  </Button>
                </motion.div>
              ) : (
                <div className="text-center py-6 text-sm font-body text-muted-foreground bg-muted/30 rounded-lg border border-dashed border-border">
                  {checkIn && checkOut && nights < 2 
                    ? (lang === 'el' ? 'Ελάχιστη διαμονή: 2 νύχτες' : 'Stay must be at least 2 nights')
                    : (lang === 'el' ? 'Επιλέξτε ημερομηνίες στο ημερολόγιο' : 'Choose open calendar slots to configure billing')}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
