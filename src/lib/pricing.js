// src/lib/pricing.js
// ============================================================
// ΚΕΝΤΡΙΚΗ ΛΟΓΙΚΗ ΤΙΜΟΛΟΓΗΣΗΣ - Αλλαγές μόνο εδώ
// ============================================================

import { differenceInDays, eachDayOfInterval, subDays } from 'date-fns';

// Τιμές ανά ιδιοκτησία και μήνα (0=Ιαν, 4=Μάιος, 5=Ιούν, 6=Ιούλ, 7=Αύγ, 8=Σεπτ, 9=Οκτ)
const SEASONAL_RATES = {
  'traditional-stonehouse': {
    4: 220, 5: 250, 6: 260, 7: 280, 8: 220, 9: 220,
    default: 220,
  },
  'Villa Hermes': {
    4: 150, 5: 160, 6: 165, 7: 175, 8: 160, 9: 150,
    default: 150,
  },
};

const EXTRA_GUEST_FEE = 15;
const BASE_GUEST_LIMIT = 2;
const WEEKLY_DISCOUNT_PCT = 0.10;
const MIN_NIGHTS = 2;

export { MIN_NIGHTS, EXTRA_GUEST_FEE, BASE_GUEST_LIMIT, WEEKLY_DISCOUNT_PCT };

/**
 * Επιστρέφει την τιμή/νύχτα για συγκεκριμένη ημερομηνία και ιδιοκτησία.
 */
export function getNightlyRate(propertyId, date) {
  const rates = SEASONAL_RATES[propertyId];
  if (!rates) return 100; // fallback
  const month = date.getMonth(); // 0-based, σωστά
  return rates[month] ?? rates.default;
}

/**
 * Κεντρικός υπολογισμός τιμής.
 * Επιστρέφει { nights, subtotal, extraGuestFeeTotal, weeklyDiscountAmount, couponDiscountAmount, total, hasWeeklyDiscount }
 */
export function calculatePricing(property, checkIn, checkOut, couponData = null, guests = 2) {
  if (!checkIn || !checkOut || !property) {
    return { nights: 0, subtotal: 0, extraGuestFeeTotal: 0, weeklyDiscountAmount: 0, couponDiscountAmount: 0, total: 0, hasWeeklyDiscount: false };
  }

  const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
  if (nights <= 0) {
    return { nights: 0, subtotal: 0, extraGuestFeeTotal: 0, weeklyDiscountAmount: 0, couponDiscountAmount: 0, total: 0, hasWeeklyDiscount: false };
  }

  // Υπολογισμός subtotal ανά νύχτα με βάση τον μήνα
  const stayDays = eachDayOfInterval({
    start: new Date(checkIn),
    end: subDays(new Date(checkOut), 1),
  });

  let subtotal = 0;
  stayDays.forEach(day => {
    subtotal += getNightlyRate(property.id, day);
  });

  // Extra guest fee
  const extraGuests = Math.max(0, guests - BASE_GUEST_LIMIT);
  const extraGuestFeeTotal = extraGuests * EXTRA_GUEST_FEE * nights;

  const totalBeforeDiscounts = subtotal + extraGuestFeeTotal;

  // Εβδομαδιαία έκπτωση
  const hasWeeklyDiscount = nights >= 7;
  const weeklyDiscountAmount = hasWeeklyDiscount ? totalBeforeDiscounts * WEEKLY_DISCOUNT_PCT : 0;
  const afterWeekly = totalBeforeDiscounts - weeklyDiscountAmount;

  // Coupon
  const couponDiscountPct = couponData?.discount_percentage || 0;
  const couponDiscountAmount = afterWeekly * (couponDiscountPct / 100);
  const total = afterWeekly - couponDiscountAmount;

  return { nights, subtotal, extraGuestFeeTotal, weeklyDiscountAmount, couponDiscountAmount, total, hasWeeklyDiscount };
}
