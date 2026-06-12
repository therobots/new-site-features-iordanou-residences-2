import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    brand: "Iordanou Residences",
    tagline: "Traditional holiday homes on the island of Lesvos",
    lesvosGreece: "Lesvos, Greece",
    chatWithUs: "Chat with us",
    waInterest: "Hello! I'm interested in booking at Iordanou Residences.",
    home: "Home",
    residences: "Residences",
    explore: "Explore Lesvos",
    dashboard: "Host Dashboard",
    bookDirectly: "Book Directly",
    sleepsUpTo: "Sleeps up to",
    guests: "guests",
    perNight: "/ night",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    aboutSpace: "About the space",
    checkAvailability: "Check Availability",
    amenities: "Amenities",
    checkIn: "Check-in",
    checkOut: "Check-out",
    selectDates: "Select your dates",
    nights: "nights",
    night: "night",
    subtotal: "Subtotal",
    weeklyDiscount: "Weekly stay discount (10%)",
    couponDiscount: "Coupon discount",
    total: "Total",
    applyCoupon: "Promo Code",
    couponPlaceholder: "Enter promo code",
    apply: "Apply",
    minStay: "Minimum stay: 2 nights",
    bookNow: "Request via WhatsApp",
    priceSummary: "Price Summary",
    whatsappCTA: "Request Booking via WhatsApp",
    whatsappMsg: "Hello! I would like to request a direct booking at Iordanou Residences for {property}.\n\n• Guests: {guests}\n• Dates: {checkIn} to {checkOut} ({nights} nights)\n• Promo Code: {coupon}\n\nTotal Estimated Price: €{total}",
    backHome: "Back to Home",
    ourResidences: "Our Residences",
    landmarks: "Local Landmarks",
    hiddenLocations: "Beaches & Places",
    allCategories: "All",
    exploreTitle: "Explore Lesvos",
    exploreSubtitle: "Discover the hidden gems and timeless beauty of our island",
    mapView: "Map View",
    gridView: "Grid View",
    reservations: "Reservations",
    calendarSync: "Calendar Sync",
    heroTitle: "Your Greek Island Escape",
    heroSubtitle: "Two hand-picked traditional homes, nestled in the heart of Lesvos",
    whyBook: "Why Book Direct?",
    reason1Title: "Best Price Guaranteed",
    reason1Desc: "No middleman fees. The price you see is the best available.",
    reason2Title: "Flexible Cancellation",
    reason2Desc: "Plans change — we understand. Cancel up to 7 days before for a full refund.",
    reason3Title: "Local Host Support",
    reason3Desc: "Direct line to your host for personalized tips and assistance.",
    exploreLesvos: "Explore Lesvos",
    noResults: "No entries found",
    ourProperties: "Our Residences",
    beaches: "Beaches",
  },
  el: {
    brand: "Iordanou Residences",
    tagline: "Παραδοσιακά σπίτια διακοπών στο νησί της Λέσβου",
    lesvosGreece: "Λέσβος, Ελλάδα",
    chatWithUs: "Μιλήστε μας",
    waInterest: "Γεια σας! Ενδιαφέρομαι για κράτηση στα Ιορδάνου Residences.",
    home: "Αρχική",
    residences: "Κατοικίες",
    explore: "Εξερεύνησε τη Λέσβο",
    dashboard: "Πίνακας Ελέγχου",
    bookDirectly: "Κράτηση",
    sleepsUpTo: "Χωρητικότητα έως",
    guests: "επισκέπτες",
    perNight: "/ βράδυ",
    bedrooms: "Υπνοδωμάτια",
    bathrooms: "Μπάνια",
    aboutSpace: "Πληροφορίες Χώρου",
    checkAvailability: "Έλεγχος Διαθεσιμότητας",
    amenities: "Παροχές",
    checkIn: "Άφιξη",
    checkOut: "Αναχώρηση",
    selectDates: "Επιλέξτε ημερομηνίες",
    nights: "βράδια",
    night: "βράδυ",
    subtotal: "Μερικό σύνολο",
    weeklyDiscount: "Έκπτωση εβδομαδιαίας διαμονής (10%)",
    couponDiscount: "Έκπτωση κουπονιού",
    total: "Σύνολο",
    applyCoupon: "Κωδικός Προσφοράς",
    couponPlaceholder: "Εισάγετε κωδικό προσφοράς",
    apply: "Εφαρμογή",
    minStay: "Ελάχ. διαμονή: 2 βράδια",
    bookNow: "Αίτηση μέσω WhatsApp",
    priceSummary: "Σύνοψη Τιμής",
    whatsappCTA: "Αίτηση Κράτησης (WhatsApp)",
    whatsappMsg: "Γεια σας! Θα ήθελα να κάνω απευθείας κράτηση στα Ιορδάνου Residences για: {property}.\n\n• Επισκέπτες: {guests}\n• Ημερομηνίες: {checkIn} έως {checkOut} ({nights} βράδια)\n• Κωδικός: {coupon}\n\nΕκτιμώμενο Σύνολο: €{total}",
    backHome: "Επιστροφή στην Αρχική",
    ourResidences: "Τα Σπίτια μας",
    landmarks: "Τοπικά Αξιοθέατα",
    hiddenLocations: "Παραλίες & Τοποθεσίες",
    allCategories: "Όλα",
    exploreTitle: "Εξερεύνησε τη Λέσβο",
    exploreSubtitle: "Ανακαλύψτε τα κρυφά διαμάντια και την αιώνια ομορφιά του νησιού μας",
    mapView: "Χάρτης",
    gridView: "Πλέγμα",
    reservations: "Κρατήσεις",
    calendarSync: "Συγχρονισμός",
    heroTitle: "Η Ελληνική σας Απόδραση",
    heroSubtitle: "Δύο επιλεγμένα παραδοσιακά σπίτια, στην καρδιά της Λέσβου",
    whyBook: "Γιατί Απευθείας Κράτηση;",
    reason1Title: "Εγγύηση Καλύτερης Τιμής",
    reason1Desc: "Χωρίς μεσάζοντες. Η τιμή που βλέπετε είναι η καλύτερη διαθέσιμη.",
    reason2Title: "Ευέλικτη Ακύρωση",
    reason2Desc: "Τα σχέδια αλλάζουν — το καταλαβαίνουμε. Ακυρώστε έως 7 μέρες πριν.",
    reason3Title: "Τοπική Υποστήριξη",
    reason3Desc: "Απευθείας επικοινωνία με τον οικοδεσπότη σας.",
    exploreLesvos: "Εξερεύνησε τη Λέσβο",
    noResults: "Δεν βρέθηκαν εγγραφές",
    ourProperties: "Τα Καταλύματά μας",
    beaches: "Παραλίες",
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('iordanou_lang') || 'en');

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('iordanou_lang', newLang);
  };

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;
  const localField = (obj, field) => {
    if (!obj) return '';
    return obj[`${field}_${lang}`] || obj[`${field}_en`] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t, localField }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
