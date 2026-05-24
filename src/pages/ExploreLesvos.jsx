import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Map, LayoutGrid, Home, Landmark, Waves, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LesvosMap from '@/components/LesvosMap';

const categoryConfig = {
  residence: { icon: Home, color: 'bg-primary/10 text-primary border-primary/20', label: 'ourProperties' },
  beach: { icon: Waves, color: 'bg-amber-50 text-amber-700 border-amber-200', label: 'beaches' },
  landmark: { icon: Landmark, color: 'bg-stone-100 text-stone-700 border-stone-200', label: 'landmarks' },
};

export default function ExploreLesvos() {
  const { t, localField } = useLanguage();
  const [view, setView] = useState('map');
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: locations = [], isLoading } = useQuery({
    queryKey: ['map-locations'],
    queryFn: () => base44.entities.MapLocation.list(),
    initialData: [],
  });

  const filtered = activeCategory === 'all' ? locations : locations.filter(e => e.category === activeCategory);

  const categories = [
    { key: 'all', label: t('allCategories') },
    { key: 'residence', label: t('ourProperties') },
    { key: 'beach', label: t('beaches') },
    { key: 'landmark', label: t('landmarks') },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/20 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-body font-medium text-primary">Lesvos Island</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">{t('exploreTitle')}</h1>
            <p className="font-body text-muted-foreground leading-relaxed">{t('exploreSubtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <div className="border-b border-border/50 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <Button
                key={c.key}
                variant={activeCategory === c.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(c.key)}
                className={`font-body text-xs sm:text-sm ${activeCategory === c.key ? 'bg-primary text-primary-foreground' : ''}`}
              >
                {c.label}
              </Button>
            ))}
          </div>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setView('map')}
              className={`px-3 py-1.5 text-sm font-body flex items-center gap-1.5 transition-colors ${view === 'map' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
            >
              <Map className="w-3.5 h-3.5" /> {t('mapView')}
            </button>
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 text-sm font-body flex items-center gap-1.5 transition-colors ${view === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> {t('gridView')}
            </button>
          </div>
        </div>
      </div>

      {/* Map View */}
      {view === 'map' && (
        <div className="flex-1" style={{ minHeight: '600px' }}>
          <LesvosMap locations={filtered} isLoading={isLoading} />
        </div>
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 w-full">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-muted rounded-xl mb-3" />
                  <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((entry, i) => {
                  const config = categoryConfig[entry.category] || categoryConfig.landmark;
                  const CategoryIcon = config.icon;
                  const isResidence = entry.category === 'residence' && entry.property_id;

                  const card = (
                    <motion.div
                      key={entry.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="group bg-card rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={entry.image_url || 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&q=80'}
                          alt={localField(entry, 'title')}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className={`${config.color} border font-body text-xs gap-1`}>
                            <CategoryIcon className="w-3 h-3" />
                            {t(entry.category)}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                          {localField(entry, 'title')}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {localField(entry, 'desc')}
                        </p>
                        {isResidence && (
                          <div className="mt-3 flex items-center gap-1 text-primary font-body text-sm font-medium">
                            {t('viewAndBook')} <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );

                  return isResidence
                    ? <Link key={entry.id} to={`/property/${entry.property_id}`}>{card}</Link>
                    : <React.Fragment key={entry.id}>{card}</React.Fragment>;
                })}
              </AnimatePresence>
            </div>
          )}
          {!isLoading && filtered.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-body text-muted-foreground">{t('noResults')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}