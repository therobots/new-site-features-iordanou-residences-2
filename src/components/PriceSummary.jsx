import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tag, Check, AlertCircle, Info } from 'lucide-react';
import { differenceInDays, eachDayOfInterval, subDays } from 'date-fns';

export function calculatePricing(property, checkIn, checkOut, couponData, guests = 2) {
  if (!checkIn || !checkOut || !property) {
    return { nights: 0, subtotal: 0, extraGuestFeeTotal: 0, weeklyDiscountAmount: 0, couponDiscountAmount: 0, total: 0 };
  }

  const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
  if (nights <= 0) {
    return { nights: 0, subtotal: 0, extraGuestFeeTotal: 0, weeklyDiscountAmount: 0, couponDiscountAmount: 0, total: 0 };
  }

  // 1. Υπολογισμός βασικής τιμής νύχτα-προς-νύχτα με βάση τον μήνα
  const stayDays = eachDayOfInterval({ start: new Date(checkIn), end: subDays(new Date(checkOut), 1) });
  let subtotal = 0;
  
  stayDays.forEach(day => {
    const month = day.getMonth(); // 4 = Μάιος, 5 = Ιούνιος, 6 = Ιούλιος, 7 = Αύγουστος, 8 = Σεπτέμβριος, 9 = Οκτώβριος
    
    if (property.id === 'Villa Hermes') {
      if (month === 4 || month === 9) subtotal += 140;      // Low Season (€140)
      else if (month === 5 || month === 8) subtotal += 210; // Mid Season (€210)
      else if (month === 6 || month === 7) subtotal += 320; // Peak Season (€320)
      else subtotal += 140;
    } else {
      // traditional-stonehouse (Γαββαθάς)
      if (month === 4 || month === 9) subtotal += 170;      // Low Season (€170)
      else if (month === 5 || month === 8) subtotal += 255; // Mid Season (€255)
      else if (month === 6 || month === 7) subtotal += 415; // Peak Season (€415)
      else subtotal += 180;
    }
  });

  // 2. Υπολογισμός Extra Guest Fee (+€15 ανά άτομο μετά τα 2 άτομα για κάθε νύχτα)
  const BASE_GUEST_LIMIT = 2;
  const EXTRA_GUEST_FEE_PER_NIGHT = 15;
  let extraGuestFeeTotal = 0;

  if (guests > BASE_GUEST_LIMIT) {
    extraGuestFeeTotal = (guests - BASE_GUEST_LIMIT) * EXTRA_GUEST_FEE_PER_NIGHT * nights;
  }

  const totalBeforeDiscounts = subtotal + extraGuestFeeTotal;

  // 3. Εκπτώσεις
  const hasWeeklyDiscount = nights >= 7;
  const weeklyDiscountAmount = hasWeeklyDiscount ? totalBeforeDiscounts * 0.1 : 0;
  const afterWeekly = totalBeforeDiscounts - weeklyDiscountAmount;

  const couponDiscountPct = couponData?.discount_percentage || 0;
  const couponDiscountAmount = afterWeekly * (couponDiscountPct / 100);
  const total = afterWeekly - couponDiscountAmount;

  return { nights, subtotal, extraGuestFeeTotal, weeklyDiscountAmount, couponDiscountAmount, total, hasWeeklyDiscount };
}

export default function PriceSummary({ property, checkIn, checkOut, couponData, onCouponApplied, guests = 2 }) {
  const { t } = useLanguage();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [applying, setApplying] = useState(false);

  if (!checkIn || !checkOut || !property) return null;

  const {
    nights,
    subtotal,
    extraGuestFeeTotal,
    weeklyDiscountAmount,
    couponDiscountAmount,
    total,
    hasWeeklyDiscount
  } = calculatePricing(property, checkIn, checkOut, couponData, guests);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplying(true);
    setCouponError('');
    const coupons = await base44.entities.Coupon.filter({ code: couponCode.trim().toUpperCase(), active: true });
    if (coupons.length > 0) {
      onCouponApplied(coupons[0]);
    } else {
      setCouponError('Invalid or expired coupon code');
      onCouponApplied(null);
    }
    setApplying(false);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      <h3 className="font-heading text-lg font-semibold text-foreground">{t('priceSummary')}</h3>

      <div className="space-y-2.5 text-sm font-body">
        <div className="flex justify-between text-muted-foreground">
          <span>Διαμονή ({nights} {nights > 1 ? t('nights') : t('night')})</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>

        {guests > 2 && (
          <div className="flex justify-between text-muted-foreground">
            <span>Επιπλέον Επισκέπτες ({guests - 2} × €15 × {nights} νύχτες)</span>
            <span className="text-emerald-600 font-medium">+€{extraGuestFeeTotal.toFixed(2)}</span>
          </div>
        )}

        {hasWeeklyDiscount && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              {t('weeklyDiscount')}
            </span>
            <span>-€{weeklyDiscountAmount.toFixed(2)}</span>
          </div>
        )}

        {couponData && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              {t('couponDiscount')} ({couponData.discount_percentage}%)
            </span>
            <span>-€{couponDiscountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="border-t border-border pt-2.5 flex justify-between font-semibold text-foreground text-base">
          <span>{t('total')}</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>

      {!couponData && (
        <div className="flex gap-2">
          <Input
            placeholder={t('couponPlaceholder')}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            className="font-body text-sm"
          />
          <Button variant="outline" size="sm" onClick={handleApplyCoupon} disabled={applying} className="font-body whitespace-nowrap">
            {t('apply')}
          </Button>
        </div>
      )}

      {couponData && (
        <Badge className="bg-green-50 text-green-700 border-green-200 font-body gap-1">
          <Check className="w-3 h-3" /> {couponData.code} applied
        </Badge>
      )}

      {couponError && (
        <p className="text-xs text-destructive font-body flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {couponError}
        </p>
      )}
    </div>
  );
}
