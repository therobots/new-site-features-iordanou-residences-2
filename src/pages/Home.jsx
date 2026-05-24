import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import PropertyCard from '@/components/PropertyCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, CalendarCheck, Headphones, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { t, lang } = useLanguage();

  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: () => base44.entities.Property.list(),
    initialData: [],
  });

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/30">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-body font-medium text-primary tracking-wide">Lesvos, Greece</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
              {t('heroTitle')}
            </h1>
            <p className="font-body text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90 font-body font-semibold gap-2 text-base px-6" asChild>
                <a href="#properties">
                  {t('bookDirectly')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="font-body font-medium text-base px-6" asChild>
                <Link to="/explore">{t('exploreLesvos')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PROPERTIES SHOWCASE (MOVED UP) */}
      <section id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">{t('ourResidences')}</h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">{t('tagline')}</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {properties.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* 3. WHY BOOK DIRECT */}
      <section className="bg-card border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">{t('whyBook')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: Shield, titleKey: 'reason1Title', descKey: 'reason1Desc' },
              { icon: CalendarCheck, titleKey: 'reason2Title', descKey: 'reason2Desc' },
              { icon: Headphones, titleKey: 'reason3Title', descKey: 'reason3Desc' },
            ].map(({ icon: Icon, titleKey, descKey }, i) => (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t(titleKey)}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{t(descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEW: MEET YOUR HOST SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-muted/30 border border-border/40 rounded-2xl p-6 sm:p-10 shadow-sm">
          {/* Host Image Block */}
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-border/20 bg-muted">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzcyYGjg8X8FBcAX12eUK7fxYEwzad7CW5og&s" 
              alt="Our Family" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Letter Description Block */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-primary text-xs font-body font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-current" />
              {lang === 'en' ? 'Authentic Hospitality' : 'Αυθεντική Φιλοξενία'}
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              {lang === 'en' ? 'Meet the Owner' : 'Γνωρίστε τον Οικοδεσπότη'}
            </h2>
            <p className="font-body text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {lang === 'en' 
                ? "Welcome to Iordanou Residences. We lovingly care for these holiday homes to preserve traditional Aegean architecture while offering a modern, peaceful escape on Lesvos.\n\nWhen you book directly with us, you aren't dealing with automated management systems or hidden agency split-fees—you are staying with a real local family dedicated to making your Greek summer unforgettable."
                : "Καλώς ήρθατε στις Κατοικίες Ιορδάνου. Φροντίζουμε με αγάπη αυτά τα εξοχικά σπίτια για να διατηρήσουμε την παραδοσιακή αρχιτεκτονική του Αιγαίου, προσφέροντας παράλληλα μια σύγχρονη, ήσυχη απόδραση στη Λέσβο.\n\nΌταν κάνετε κράτηση απευθείας μαζί μας, επικοινωνείτε απευθείας με την οικογένειά μας, εξασφαλίζοντας την καλύτερη τιμή χωρίς κρυφές προμήθειες πλατφορμών."}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
