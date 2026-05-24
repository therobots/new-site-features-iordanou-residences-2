import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import BookingCalendar from '@/components/BookingCalendar';
import PriceSummary, { calculatePricing } from '@/components/PriceSummary';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, MapPin, Users, BedDouble, Bath, Wifi, Car, Wind, Utensils, Waves, TreePine, Check, Info, MessageCircle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = '306988011845';

const amenityIcons = {
  'WiFi': Wifi, 'Parking': Car, 'Air Conditioning': Wind, 'Kitchen': Utensils,
  'Sea View': Waves, 'Garden': TreePine, 'Pool': Waves,
};

export default function PropertyDetails() {
  const { t, localField, lang } = useLanguage();
  const propertyId = window.location.pathname.split('/').pop();

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [couponData, setCouponData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: async () => {
      const list = await base44.entities.Property.filter({ id: propertyId });
      return list[0];
    },
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ['property-bookings', propertyId],
    queryFn: () => base44.entities.Booking.filter({ property_id: propertyId }),
    initialData: [],
  });

  const handleDateSelect = (ci, co) => {
    setCheckIn(ci);
    setCheckOut(co);
    setCouponData(null);
  };

  const handleWhatsApp = () => {
    if (!checkIn || !checkOut) return;
    const pricing = calculatePricing(property, checkIn, checkOut, couponData);
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
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-8 w-48 mb-6" />
      <Skeleton className="aspect-[16/9] rounded-xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    </div>
  );

  if (!property) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p className="text-muted-foreground font-body">Property not found</p>
      <Button asChild variant="outline" className="mt-4"><Link to="/">{t('backHome')}</Link></Button>
    </div>
  );

  const images = property.image_urls?.length > 0
    ? property.image_urls
    : ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80'];

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const canBook = checkIn && checkOut && nights >= 2;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> {t('backHome')}
      </Link>

      {/* Image Gallery */}
      <div className="mb-8">
        <div className="aspect-[16/9] sm:aspect-[2/1] rounded-xl overflow-hidden mb-2">
          <img src={images[selectedImage]} alt="" className="w-full h-full object-cover" />
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)}
                className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === selectedImage ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">{localField(property, 'name')}</h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-body text-muted-foreground">{property.location}</span>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20 font-body text-sm whitespace-nowrap">
                {localField(property, 'property_type') || 'Holiday Home'}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm font-body text-muted-foreground py-4 border-y border-border/50">
              <div className="flex items-center gap-1.5"><Users className="w-4 h-4" />{t('sleepsUpTo')} {property.max_guests || 6}</div>
              <div className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" />{property.bedrooms || 2} {t('bedrooms')}</div>
              <div className="flex items-center gap-1.5"><Bath className="w-4 h-4" />{property.bathrooms || 1} {t('bathrooms')}</div>
            </div>
            <p className="font-body text-foreground/80 leading-relaxed mt-5 whitespace-pre-line">
              {localField(property, 'description')}
            </p>
          </div>

          {/* Amenities */}
          {property.amenities?.length > 0 && (
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">{t('amenities')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map(a => {
                  const AIcon = amenityIcons[a] || Check;
                  return (
                    <div key={a} className="flex items-center gap-2.5 p-3 bg-muted/50 rounded-lg text-sm font-body">
                      <AIcon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{a}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Calendar */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-1">{t('selectDates')}</h2>
            <p className="text-xs text-muted-foreground font-body mb-4 flex items-center gap-1">
              <Info className="w-3 h-3" /> {t('minStay')}
            </p>
            <BookingCalendar
              blockedDates={property.blocked_dates || []}
              bookings={bookings}
              onDateSelect={handleDateSelect}
              checkIn={checkIn}
              checkOut={checkOut}
            />
            {checkIn && checkOut && (
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-body">
                <Badge variant="outline" className="font-body">{t('checkIn')}: {format(checkIn, 'MMM d, yyyy')}</Badge>
                <span className="text-muted-foreground">→</span>
                <Badge variant="outline" className="font-body">{t('checkOut')}: {format(checkOut, 'MMM d, yyyy')}</Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20 font-body">{nights} {nights > 1 ? t('nights') : t('night')}</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="text-center mb-3">
              <span className="font-heading text-3xl font-bold text-foreground">€{property.base_price_per_night}</span>
              <span className="text-muted-foreground font-body text-sm"> {t('perNight')}</span>
            </div>
            <p className="text-xs text-center text-green-700 font-body bg-green-50 rounded-lg py-1.5">{t('weeklyDiscountNote')}</p>
          </div>

          {canBook && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <PriceSummary
                property={property}
                checkIn={checkIn}
                checkOut={checkOut}
                couponData={couponData}
                onCouponApplied={setCouponData}
              />
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-body font-semibold text-base h-14 mt-4 gap-2 shadow-lg"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="w-5 h-5" />
                {t('whatsappCTA')}
              </Button>
              <p className="text-xs text-center text-muted-foreground font-body mt-2">
                {lang === 'el' ? 'Δεν απαιτείται πιστωτική κάρτα' : 'No credit card required'}
              </p>
            </motion.div>
          )}

          {!canBook && !checkIn && (
            <div className="bg-muted/50 rounded-xl p-5 text-center">
              <p className="font-body text-sm text-muted-foreground">
                {lang === 'el' ? 'Επιλέξτε ημερομηνίες για να δείτε την τιμή' : 'Select dates to see pricing'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
