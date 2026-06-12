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
      "https://a0.muscache.com/im/pictures/911a0e00-b2c7-47fc-820f-1c346f1a4f91.jpg?im_w=480&im_q=medq",
      "https://a0.muscache.com/im/pictures/f99819c4-4325-47b3-b991-d8ce6dbaa220.jpg?im_w=720"
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
      "https://a0.muscache.com/im/pictures/hosting/Hosting-963513247135914909/original/00dd30e2-d61c-445e-a95c-cd0cdd835316.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTYzNTEzMjQ3MTM1OTE0OTA5/original/a981a56a-faa5-413a-af4a-d0c08fda1350.jpeg?im_w=720"
    ],
    ical_url: "https://www.airbnb.gr/calendar/ical/963513247135914909.ics?t=5f8b189366714472a934afdcd8e211fe",
    blocked_dates: []
  }
];

const LOCAL_MAP_LOCATIONS = [
  // Καταλύματα (με τις δικές σου φωτογραφίες)
  { id: "p1", category: "residence", property_id: "traditional-stonehouse", title_en: "Traditional Stonehouse", title_el: "Παραδοσιακό Πέτρινο Σπίτι", latitude: 39.2840, longitude: 25.9730, image_url: "https://a0.muscache.com/im/pictures/911a0e00-b2c7-47fc-820f-1c346f1a4f91.jpg?im_w=480&im_q=medq" },
  { id: "p2", category: "residence", property_id: "Villa Hermes", title_en: "Villa Hermes", title_el: "Βίλα Ερμής", latitude: 39.0820, longitude: 26.5714, image_url: "https://a0.muscache.com/im/pictures/hosting/Hosting-963513247135914909/original/00dd30e2-d61c-445e-a95c-cd0cdd835316.jpeg?im_w=720" },
  
  // Τοποθεσίες
  { id: "vatera", category: "beach", title_en: "Vatera Beach", title_el: "Παραλία Βατερών", latitude: 39.0142, longitude: 26.1963, image_url: "https://www.visitlesvos.gr/wp-content/uploads/2020/05/vatera-lesvos.jpg" },
  { id: "ermogenis", category: "beach", title_en: "Agios Ermogenis", title_el: "Άγιος Ερμογένης", latitude: 39.0435, longitude: 26.5682, image_url: "https://www.visitlesvos.gr/wp-content/uploads/2020/05/agios-ermogenis.jpg" },
  { id: "skala-eresou", category: "beach", title_en: "Skala Eressos", title_el: "Σκάλα Ερεσσού", latitude: 39.1360, longitude: 25.9320, image_url: "https://www.visitlesvos.gr/wp-content/uploads/2020/05/skala-eresou.jpg" },
  { id: "faneromeni", category: "beach", title_en: "Faneromeni Beach", title_el: "Παραλία Φανερωμένη", latitude: 39.2312, longitude: 25.8358, image_url: "https://www.visitlesvos.gr/wp-content/uploads/2020/05/faneromeni-beach.jpg" },
  { id: "agios-isidoros", category: "beach", title_en: "Agios Isidoros", title_el: "Άγιος Ισίδωρος", latitude: 38.9710, longitude: 26.3880, image_url: "https://www.visitlesvos.gr/wp-content/uploads/2020/05/agios-isidoros.jpg" },
  { id: "gavathas", category: "beach", title_en: "Gavathas Beach", title_el: "Παραλία Γαββαθά", latitude: 39.2842, longitude: 25.9733, image_url: "https://www.visitlesvos.gr/wp-content/uploads/2020/05/gavathas.jpg" },
  { id: "molyvos", category: "landmark", title_en: "Molyvos", title_el: "Μόλυβος", latitude: 39.3667, longitude: 26.1739, image_url: "https://www.visitlesvos.gr/wp-content/uploads/2020/05/molyvos.jpg" },
  { id: "petra", category: "landmark", title_en: "Petra", title_el: "Πέτρα", latitude: 39.3274, longitude: 26.1755, image_url: "https://www.visitlesvos.gr/wp-content/uploads/2020/05/petra-lesvos.jpg" },
  { id: "mytilene", category: "landmark", title_en: "Mytilene City", title_el: "Πόλη Μυτιλήνης", latitude: 39.1065, longitude: 26.5543, image_url: "https://www.visitlesvos.gr/wp-content/uploads/2020/05/mytilene-city.jpg" },
  { id: "castle", category: "landmark", title_en: "Mytilene Castle", title_el: "Κάστρο Μυτιλήνης", latitude: 39.1114, longitude: 26.5593, image_url: "https://www.visitlesvos.gr/wp-content/uploads/2020/05/mytilene-castle.jpg" },
  { id: "plomari", category: "landmark", title_en: "Plomari", title_el: "Πλωμάρι", latitude: 38.9754, longitude: 26.3683, image_url: "https://www.visitlesvos.gr/wp-content/uploads/2020/05/plomari.jpg" }
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
