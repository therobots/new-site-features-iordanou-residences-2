// src/pages/BookingPage.jsx
import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import BookingCalendar from '@/components/BookingCalendar';
import PriceSummary from '@/components/PriceSummary';
import { calculatePricing, MIN_NIGHTS } from '@/lib/pricing';  // ← από το νέο αρχείο
import { format, differenceInDays } from 'date-fns';
import { MessageCircle, Minus, Plus, ArrowLeft } from 'lucide-react';

const WHATSAPP_NUMBER = '306988011845';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, lang, localField } = useLanguage();

  const propertyId = searchParams.get('house');

  const [checkIn, setCheckIn]     = useState(null);
  const [checkOut, setCheckOut]   = useState(null);
  const [guests, setGuests]       = useState(2);
  const [couponData, setCouponData] = useState(null);

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: async () => {
      if (!propertyId) return null;
      const list = await base44.entities.Property.filter({ id: propertyId });
      return list[0] || null;
    },
    enabled: !!propertyId,
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ['property-bookings', propertyId],
    queryFn: () => base44.entities.Booking.filter({ property_id: propertyId }),
    initialData: [],
    enabled: !!propertyId,
  });

  const handleDateSelect = (ci, co) => {
    setCheckIn(ci);
    setCheckOut(co);
    setCouponData(null);
  };

  const handleWhatsApp = () => {
    if (!checkIn || !checkOut || !property) return;
    const pricing = calculatePricing(property, checkIn, checkOut, couponData, guests);
    const propertyName = localField(property, 'name');
    const ciStr = format(checkIn, 'dd/MM/yyyy');
    const coStr = format(checkOut, 'dd/MM/yyyy');
    const coupon = couponData?.code || (lang === 'el' ? 'Καμία' : 'None');
    const msg = t('whatsappMsg')
      .replace('{property}', propertyName)
      .replace('{checkIn}', ciStr)
      .replace('{checkOut}', coStr)
      .replace('{nights}', pricing.nights)
      .replace('{coupon}', coupon)
      .replace('{total}', pricing.total.toFixed(2));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!propertyId) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="mb-4 text-muted-foreground font-body">
          {lang === 'el' ? 'Δεν επιλέχθηκε κατάλυμα.' : 'No property selected.'}
        </p>
        <Button onClick={() => navigate('/residences')}>{t('residences')}</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="mb-4 text-muted-foreground font-body">
          {lang === 'el' ? 'Το κατάλυμα δεν βρέθηκε.' : 'Property not found.'}
        </p>
        <Button asChild variant="outline"><Link to="/">{t('backHome')}</Link></Button>
      </div>
    );
  }

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const canBook = checkIn && checkOut && nights >= MIN_NIGHTS;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Link to={`/property/${property.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> {localField(property, 'name')}
      </Link>

      <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-6">
        {lang === 'el' ? 'Κράτηση' : 'Book'}: {localField(property, 'name')}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
          <BookingCalendar
            blockedDates={property.blocked_dates || []}
            bookings={bookings}
            icalUrl={property.ical_url}
            onDateSelect={handleDateSelect}
            checkIn={checkIn}
            checkOut={checkOut}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Guest counter */}
          <div className="flex items-center justify-between p-4 bg-muted/60 border border-border/50 rounded-xl">
            <div className="text-sm font-body font-semibold">
              {lang === 'el' ? 'Επισκέπτες' : 'Guests'}
              <span className="block font-normal text-muted-foreground text-xs mt-0.5">
                {guests} {lang === 'el' ? 'άτομα' : 'people'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setGuests(g => Math.max(1, g - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border bg-white hover:bg-slate-50 transition-all shadow-sm">
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-heading font-bold text-lg w-4 text-center">{guests}</span>
              <button onClick={() => setGuests(g => Math.min(property.max_guests || 6, g + 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border bg-white hover:bg-slate-50 transition-all shadow-sm">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {canBook ? (
            <>
              <PriceSummary
                property={property}
                checkIn={checkIn}
                checkOut={checkOut}
                couponData={couponData}
                onCouponApplied={setCouponData}
                guests={guests}
              />
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-body font-semibold text-base h-14 gap-2 shadow-lg"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="w-5 h-5" />
                {t('whatsappCTA')}
              </Button>
              <p className="text-xs text-center text-muted-foreground font-body">
                {lang === 'el' ? 'Δεν απαιτείται πιστωτική κάρτα' : 'No credit card required'}
              </p>
            </>
          ) : (
            <div className="bg-muted/50 rounded-xl p-5 text-center">
              <p className="font-body text-sm text-muted-foreground">
                {lang === 'el' ? 'Επιλέξτε ημερομηνίες (min. 2 βράδια)' : 'Select dates (min. 2 nights)'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
