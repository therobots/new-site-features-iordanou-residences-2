// src/components/PriceSummary.jsx
import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tag, Check, AlertCircle } from 'lucide-react';
import { calculatePricing } from '@/lib/pricing';  // ← κεντρικό αρχείο

// Εξάγουμε calculatePricing για χρήση στο PropertyDetails & BookingPage
export { calculatePricing };

export default function PriceSummary({ property, checkIn, checkOut, couponData, onCouponApplied, guests = 2 }) {
  const { t, lang } = useLanguage();
  const [couponCode, setCouponCode]   = useState('');
  const [couponError, setCouponError] = useState('');
  const [applying, setApplying]       = useState(false);

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
      setCouponError(lang === 'el' ? 'Άκυρος ή ληγμένος κωδικός' : 'Invalid or expired coupon code');
      onCouponApplied(null);
    }
    setApplying(false);
  };

  // Labels που αλλάζουν γλώσσα
  const stayLabel  = lang === 'el' ? `Διαμονή (${nights} ${nights > 1 ? 'βράδια' : 'βράδυ'})` : `Stay (${nights} ${nights > 1 ? 'nights' : 'night'})`;
  const extraLabel = lang === 'el'
    ? `Επιπλέον Επισκέπτες (${guests - 2} × €15 × ${nights} βράδια)`
    : `Extra guests (${guests - 2} × €15 × ${nights} nights)`;

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      <h3 className="font-heading text-lg font-semibold text-foreground">{t('priceSummary')}</h3>

      <div className="space-y-2.5 text-sm font-body">
        <div className="flex justify-between text-muted-foreground">
          <span>{stayLabel}</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>

        {guests > 2 && (
          <div className="flex justify-between text-muted-foreground">
            <span>{extraLabel}</span>
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
            onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
          />
          <Button variant="outline" size="sm" onClick={handleApplyCoupon} disabled={applying} className="font-body whitespace-nowrap">
            {t('apply')}
          </Button>
        </div>
      )}

      {couponData && (
        <Badge className="bg-green-50 text-green-700 border-green-200 font-body gap-1">
          <Check className="w-3 h-3" /> {couponData.code} {lang === 'el' ? 'εφαρμόστηκε' : 'applied'}
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
