import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Users, BedDouble, Bath, Wifi, Car, Wind, 
  Utensils, Waves, TreePine, Check, ArrowRight, CalendarDays 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const amenityIcons = {
  'WiFi': Wifi, 'Parking': Car, 'Air Conditioning': Wind, 'Kitchen': Utensils,
  'Sea View': Waves, 'Garden': TreePine, 'Pool': Waves,
};

export default function ResidencesPage() {
  const { t, localField, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  // Load the properties database from the offline client hub
  const { data: properties = [] } = useQuery({
    queryKey: ['residences-showcase'],
    queryFn: async () => {
      const list = await base44.entities.Property.list();
      if (list.length > 0 && !activeTab) {
        setActiveTab(list[0].id);
      }
      return list;
    },
    initialData: [],
  });

  // Handle house tab switches and reset gallery pointer
  const handleTabChange = (id) => {
    setActiveTab(id);
    setSelectedImage(0);
  };

  const currentHouse = properties.find(p => p.id === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Intro Header */}
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
          {lang === 'en' ? 'Our Accommodations' : 'Οι Κατοικίες Μας'}
        </h1>
        <p className="font-body text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
          {lang === 'en' 
            ? 'Explore full details, local layouts, and premiums offered across our collection.' 
            : 'Εξερευνήστε τις ανέσεις, τις φωτογραφίες και τις λεπτομέρειες των καταλυμάτων μας.'}
        </p>
      </div>

      {/* Modern Top Horizontal Tab Selector Switching Panel */}
      {properties.length > 0 && (
        <div className="flex justify-center border-b border-border/60 mb-8 overflow-x-auto pb-px scrollbar-none">
          <div className="flex gap-2 sm:gap-6 px-2">
            {properties.map(p => (
              <button
                key={p.id}
                onClick={() => handleTabChange(p.id)}
                className={`pb-3 text-sm sm:text-base font-heading font-semibold transition-all relative whitespace-nowrap px-1 ${
                  activeTab === p.id 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {localField(p, 'name')}
                {activeTab === p.id && (
                  <motion.div 
                    layoutId="activeIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Listing Layout Content Body */}
      <AnimatePresence mode="wait">
        {currentHouse ? (
          <motion.div
            key={currentHouse.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {/* Left: Photo Gallery Column */}
            <div className="lg:col-span-2 space-y-3">
              <div className="aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden shadow-sm border border-border/30 bg-muted">
                <img 
                  src={currentHouse.image_urls?.[selectedImage] || 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80'} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>
              {currentHouse.image_urls?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 pt-0.5">
                  {currentHouse.image_urls.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === selectedImage 
                          ? 'border-primary scale-95 shadow-sm' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Rich Informational Details Sidebar Card */}
            <div className="space-y-6 bg-card border border-border/60 rounded-xl p-5 sm:p-6 shadow-sm">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h2 className="font-heading text-2xl font-bold text-foreground leading-tight">
                    {localField(currentHouse, 'name')}
                  </h2>
                  <Badge className="bg-primary/10 text-primary border-primary/20 font-body text-xs whitespace-nowrap">
                    {localField(currentHouse, 'property_type') || 'Holiday Home'}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-body text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{currentHouse.location}</span>
                </div>
              </div>

              {/* Capacities Badges Grid */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50 text-center bg-muted/30 rounded-lg">
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center text-muted-foreground"><Users className="w-4 h-4" /></div>
                  <div className="text-xs font-body text-muted-foreground">{t('sleepsUpTo')}</div>
                  <div className="text-sm font-heading font-bold text-foreground">{currentHouse.max_guests || 6}</div>
                </div>
                <div className="space-y-0.5 border-x border-border/60">
                  <div className="flex items-center justify-center text-muted-foreground"><BedDouble className="w-4 h-4" /></div>
                  <div className="text-xs font-body text-muted-foreground">{lang === 'en' ? 'Bedrooms' : 'Δωμάτια'}</div>
                  <div className="text-sm font-heading font-bold text-foreground">{currentHouse.bedrooms || 2}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center text-muted-foreground"><Bath className="w-4 h-4" /></div>
                  <div className="text-xs font-body text-muted-foreground">{lang === 'en' ? 'Baths' : 'Μπάνια'}</div>
                  <div className="text-sm font-heading font-bold text-foreground">{currentHouse.bathrooms || 1}</div>
                </div>
              </div>

              {/* Full Core Copy Text Block */}
              <div>
                <h3 className="text-xs font-body font-semibold uppercase text-muted-foreground tracking-wider mb-2">
                  {lang === 'en' ? 'About the space' : 'Πληροφορίες Χώρου'}
                </h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                  {localField(currentHouse, 'description')}
                </p>
              </div>

              {/* Structured Custom Amenities Array List Layout */}
              {currentHouse.amenities?.length > 0 && (
                <div>
                  <h3 className="text-xs font-body font-semibold uppercase text-muted-foreground tracking-wider mb-2.5">
                    {t('amenities') || 'Amenities'}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {currentHouse.amenities.map(item => {
                      const IconComponent = amenityIcons[item] || Check;
                      return (
                        <div key={item} className="flex items-center gap-2 p-2 bg-muted/40 rounded-md text-xs font-body text-foreground/90 border border-border/20">
                          <IconComponent className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Quick-Action Target Button Passing ID Parameters */}
              <div className="pt-4 border-t border-border/50 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-muted-foreground font-body uppercase tracking-wide">{t('perNight') || 'From'}</div>
                  <div className="font-heading text-xl font-bold text-foreground">€{currentHouse.base_price_per_night}</div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold gap-2 shadow-sm px-5 h-11" asChild>
                  <Link to={`/book?house=${currentHouse.id}`}>
                    {lang === 'en' ? 'Check Availability' : 'Έλεγχος Διαθεσιμότητας'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12 text-muted-foreground font-body">Loading house configurations...</div>
        )}
      </AnimatePresence>
    </div>
  );
}
