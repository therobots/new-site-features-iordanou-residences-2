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
          {allProperties.map((
