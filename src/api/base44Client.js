const LOCAL_PROPERTIES = [
  {
    id: "traditional-stonehouse",
    name: "Traditional Stonehouse in Gavathas",
    name_en: "Traditional Stonehouse in Gavathas",
    name_el: "Παραδοσιακό Πέτρινο Σπίτι στον Γαββαθά",
    location: "Gavathas, Lesvos",
    property_type: "Stonehouse",
    max_guests: 8,
    bedrooms: 3,
    bathrooms: 2,
    base_price_per_night: 180,
    amenities: ["WiFi", "Parking", "Air Conditioning", "Kitchen", "Garden"],
    description: "Traditional stone house in Gavathas, 200m from the sea.",
    image_urls: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
    ],
    ical_url: "https://www.airbnb.gr/calendar/ical/49432465.ics?t=812af2806dee48ba8e753ac298c3c4b2",
    blocked_dates: []
  },
  {
    id: "Villa Hermes",
    name: "Villa Hermes",
    name_en: "Villa Hermes",
    name_el: "Βίλα Ερμής",
    location: "Vareia, Mytilene",
    property_type: "Villa",
    max_guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    base_price_per_night: 140,
    amenities: ["WiFi", "Parking", "Air Conditioning", "Kitchen", "Garden"],
    description: "Beautiful residence in Vareia, Mytilene.",
    image_urls: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
    ],
    ical_url: "https://www.airbnb.gr/calendar/ical/963513247135914909.ics?t=5f8b189366714472a934afdcd8e211fe",
    blocked_dates: []
  }
];

const LOCAL_MAP_LOCATIONS = [
  // Καταλύματα
  { id: "p1", category: "residence", property_id: "traditional-stonehouse", title_en: "Traditional Stonehouse", title_el: "Παραδοσιακό Πέτρινο Σπίτι", latitude: 39.2840, longitude: 25.9730, image_url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=400" },
  { id: "p2", category: "residence", property_id: "Villa Hermes", title_en: "Villa Hermes", title_el: "Βίλα Ερμής", latitude: 39.0820, longitude: 26.5714, image_url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400" },
  
  // Τοποθεσίες (Επαληθευμένες Συντεταγμένες)
  { id: "vatera", category: "beach", title_en: "Vatera Beach", title_el: "Παραλία Βατερών", latitude: 39.0142, longitude: 26.1963, image_url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=400" },
  { id: "ermogenis", category: "beach", title_en: "Agios Ermogenis", title_el: "Άγιος Ερμογένης", latitude: 39.0435, longitude: 26.5682, image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400" },
  { id: "skala-eresou", category: "beach", title_en: "Skala Eressos", title_el: "Σκάλα Ερεσσού", latitude: 39.1360, longitude: 25.9320, image_url: "https://images.unsplash.com/photo-1580227184234-8b650fc33827?auto=format&fit=crop&q=80&w=400" },
  { id: "faneromeni", category: "beach", title_en: "Faneromeni Beach", title_el: "Παραλία Φανερωμένη", latitude: 39.2312, longitude: 25.8358, image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400" },
  { id: "agios-isidoros", category: "beach", title_en: "Agios Isidoros", title_el: "Άγιος Ισίδωρος", latitude: 38.9710, longitude: 26.3880, image_url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=400" },
  { id: "gavathas", category: "beach", title_en: "Gavathas Beach", title_el: "Παραλία Γαββαθά", latitude: 39.2842, longitude: 25.9733, image_url: "https://images.unsplash.com/photo-1621275470125-97e3c1a2e7c4?auto=format&fit=crop&q=80&w=400" },
  { id: "molyvos", category: "landmark", title_en: "Molyvos", title_el: "Μόλυβος", latitude: 39.3667, longitude: 26.1739, image_url: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed2a?auto=format&fit=crop&q=80&w=400" },
  { id: "petra", category: "landmark", title_en: "Petra", title_el: "Πέτρα", latitude: 39.3274, longitude: 26.1755, image_url: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&q=80&w=400" },
  { id: "mytilene", category: "landmark", title_en: "Mytilene City", title_el: "Πόλη Μυτιλήνης", latitude: 39.1065, longitude: 26.5543, image_url: "https://images.unsplash.com/photo-1574880529528-93666bba7216?auto=format&fit=crop&q=80&w=400" },
  { id: "castle", category: "landmark", title_en: "Mytilene Castle", title_el: "Κάστρο Μυτιλήνης", latitude: 39.1114, longitude: 26.5593, image_url: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=400" },
  { id: "plomari", category: "landmark", title_en: "Plomari", title_el: "Πλωμάρι", latitude: 38.9754, longitude: 26.3683, image_url: "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&q=80&w=400" }
];

export const base44 = {
  entities: {
    Property: {
      list: async () => LOCAL_PROPERTIES,
      filter: async ({ id }) => LOCAL_PROPERTIES.filter(p => p.id === id || p.property_id === id)
    },
    Booking: {
      list: async () => [],
      filter: async () => []
    },
    MapLocation: {
      list: async () => LOCAL_MAP_LOCATIONS,
      filter: async () => LOCAL_MAP_LOCATIONS
    },
    Coupon: {
      list: async () => [{ id: "c1", code: "WELCOME10", discount_percentage: 10, active: true }],
      filter: async ({ code, active }) => {
        const coupons = [{ id: "c1", code: "WELCOME10", discount_percentage: 10, active: true }];
        return coupons.filter(c => c.code === code && c.active === active);
      }
    }
  }
};
