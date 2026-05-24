import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, BedDouble, Bath, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PropertyCard({ property, index = 0 }) {
  const { t, localField } = useLanguage();

  const mainImage = property.image_urls?.[0] || 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-card rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* 1. Clicking the house picture routes to the Residences Showcase tab */}
      <Link to={`/residences?house=${property.id}`} className="group block relative aspect-[4/3] overflow-hidden">
        <img
          src={mainImage}
          alt={localField(property, 'name')}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-white/90 text-foreground backdrop-blur-sm text-xs font-body font-medium shadow-sm">
            {localField(property, 'property_type') || 'Holiday Home'}
          </Badge>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-lg font-heading font-bold text-foreground">€{property.base_price_per_night}</span>
            <span className="text-xs text-muted-foreground font-body"> {t('perNight')}</span>
          </div>
        </div>
      </Link>

      <div className="p-5 sm:p-6">
        {/* Title link also targets the residences page for cohesion */}
        <Link to={`/residences?house=${property.id}`} className="group block">
          <h3 className="font-heading text-xl font-semibold text-foreground mb-1 hover:text-primary transition-colors">
            {localField(property, 'name')}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground font-body mb-4">{property.location}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground font-body mb-5">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{t('sleepsUpTo')} {property.max_guests || 6}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BedDouble className="w-4 h-4" />
            <span>{property.bedrooms || 2}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms || 1}</span>
          </div>
        </div>

        {/* 2. Clicking the "Book Directly" button routes straight to the Checkout calendar */}
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-medium gap-2 group/btn">
          <Link to={`/book?house=${property.id}`}>
            {t('bookDirectly')}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
