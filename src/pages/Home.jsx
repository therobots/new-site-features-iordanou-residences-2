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
      {/* 1. HERO SECTION WITH IMAGE BACKGROUND */}
      <section className="relative overflow-hidden bg-slate-900 text-white min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.visitgreece.gr/images/1743x752/jpg/files/i_1162556431_lesvos_1743x752.jpg" 
            alt="Iordanou Residences Background" 
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-body font-medium text-sky-300 tracking-wide">Lesvos, Greece</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {t('heroTitle')}
            </h1>
            <p className="font-body text-lg text-white/90 mb-8 max-w-lg leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold gap-2 text-base px-6" asChild>
                <a href="#properties">
                  {t('bookDirectly')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="font-body font-medium text-base px-6 border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                <Link to="/explore">{t('exploreLesvos')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PROPERTIES SHOWCASE (CENTERED FOR 2 ITEMS) */}
      <section id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">{t('ourResidences')}</h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">{t('tagline')}</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto justify-center">
            {[1, 2].map(i => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto justify-center">
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
            
            {/* Κάρτα 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t('reason1Title')}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{t('reason1Desc')}</p>
            </motion.div>

            {/* Κάρτα 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t('reason2Title')}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{t('reason2Desc')}</p>
            </motion.div>

            {/* Κάρτα 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t('reason3Title')}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{t('reason3Desc')}</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. MEET YOUR HOST SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-muted/30 border border-border/40 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-md border border-border/20 bg-muted">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzcyYGjg8X8FBcAX12eUK7fxYEwzad7CW5og&s" 
              alt="Our Family" 
              className="w-full h-full object-cover"
            />
          </div>
          
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
