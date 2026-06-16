import { differenceInDays, eachDayOfInterval, subDays } from 'date-fns';

const EXTRA_GUEST_FEE = 15;
const BASE_GUEST_LIMIT = 2;
const WEEKLY_DISCOUNT_PCT = 0.10;
const MIN_NIGHTS = 2;

export { MIN_NIGHTS, EXTRA_GUEST_FEE, BASE_GUEST_LIMIT, WEEKLY_DISCOUNT_PCT };

export function getNightlyRate(property, date) {
  if (!property) return 0;
  const month = date.getMonth() + 1; // 1-12
  if (property.seasonal_pricing && property.seasonal_pricing[month]) {
    return property.seasonal_pricing[month];
  }
  return property.base_price_per_night || 0;
}

export function calculatePricing(property, checkIn, checkOut, couponData = null, guests = 2) {
  if (!checkIn || !checkOut || !property) {
    return { nights: 0, subtotal: 0, extraGuestFeeTotal: 0, weeklyDiscountAmount: 0, couponDiscountAmount: 0, total: 0, hasWeeklyDiscount: false };
  }
  
  const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
  if (nights <= 0) return { nights: 0, subtotal: 0, extraGuestFeeTotal: 0, weeklyDiscountAmount: 0, couponDiscountAmount: 0, total: 0, hasWeeklyDiscount: false };
  
  const stayDays = eachDayOfInterval({
    start: new Date(checkIn),
    end: subDays(new Date(checkOut), 1),
  });

  let subtotal = 0;
  stayDays.forEach(day => {
    subtotal += getNightlyRate(property, day);
  });

  const extraGuests = Math.max(0, guests - BASE_GUEST_LIMIT);
  const extraGuestFeeTotal = extraGuests * EXTRA_GUEST_FEE * nights;
  const totalBeforeDiscounts = subtotal + extraGuestFeeTotal;

  const hasWeeklyDiscount = nights >= 7;
  const weeklyDiscountAmount = hasWeeklyDiscount ? totalBeforeDiscounts * WEEKLY_DISCOUNT_PCT : 0;
  const afterWeekly = totalBeforeDiscounts - weeklyDiscountAmount;

  const couponDiscountPct = couponData?.discount_percentage || 0;
  const couponDiscountAmount = afterWeekly * (couponDiscountPct / 100);
  
  const total = afterWeekly - couponDiscountAmount;

  return { nights, subtotal, extraGuestFeeTotal, weeklyDiscountAmount, couponDiscountAmount, total, hasWeeklyDiscount };
}
