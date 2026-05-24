import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import StatsCards from '@/components/admin/StatsCards';
import BookingsTable from '@/components/admin/BookingsTable';
import CouponManager from '@/components/admin/CouponManager';
import GuideManager from '@/components/admin/GuideManager';
import CalendarSync from '@/components/admin/CalendarSync';
import MapPointManager from '@/components/admin/MapPointManager';
import { CalendarCheck, Tag, Map, Calendar, MapPin } from 'lucide-react';

export default function AdminDashboard() {
  const { t } = useLanguage();

  const { data: bookings = [], isLoading: loadingBookings } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: () => base44.entities.Booking.list('-created_date', 100),
    initialData: [],
  });

  const { data: properties = [], isLoading: loadingProperties } = useQuery({
    queryKey: ['properties'],
    queryFn: () => base44.entities.Property.list(),
    initialData: [],
  });

  if (loadingBookings || loadingProperties) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Skeleton className="h-10 w-64" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
      </div>
      <Skeleton className="h-96 rounded-xl" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">{t('dashboard')}</h1>
        <p className="font-body text-sm text-muted-foreground mt-1">Iordanou Residences — Host Operations</p>
      </div>

      <StatsCards bookings={bookings} />

      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="bg-muted/80 p-1 flex-wrap h-auto gap-1">
          <TabsTrigger value="bookings" className="font-body text-xs sm:text-sm gap-1.5 data-[state=active]:bg-card">
            <CalendarCheck className="w-3.5 h-3.5" /> {t('reservations')}
          </TabsTrigger>
          <TabsTrigger value="calendar" className="font-body text-xs sm:text-sm gap-1.5 data-[state=active]:bg-card">
            <Calendar className="w-3.5 h-3.5" /> {t('calendarSync')}
          </TabsTrigger>
          <TabsTrigger value="coupons" className="font-body text-xs sm:text-sm gap-1.5 data-[state=active]:bg-card">
            <Tag className="w-3.5 h-3.5" /> {t('coupons')}
          </TabsTrigger>
          <TabsTrigger value="guide" className="font-body text-xs sm:text-sm gap-1.5 data-[state=active]:bg-card">
            <Map className="w-3.5 h-3.5" /> {t('guideManager')}
          </TabsTrigger>
          <TabsTrigger value="map" className="font-body text-xs sm:text-sm gap-1.5 data-[state=active]:bg-card">
            <MapPin className="w-3.5 h-3.5" /> {t('mapManager')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="mt-4">
          <BookingsTable bookings={bookings} />
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <CalendarSync properties={properties} />
        </TabsContent>

        <TabsContent value="coupons" className="mt-4">
          <CouponManager />
        </TabsContent>

        <TabsContent value="guide" className="mt-4">
          <GuideManager />
        </TabsContent>

        <TabsContent value="map" className="mt-4">
          <MapPointManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}