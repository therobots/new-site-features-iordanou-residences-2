// Local database fallback structure to remove external server dependency
const LOCAL_PROPERTIES = [
  {
    id: "traditional-stonehouse",
    name: "Traditional Stonehouse in Gavathas",
    name_en: "Traditional Stonehouse in Gavathas",
    name_el: "Παραδοσιακό Πέτρινο Σπίτι στον Γαββαθά",
    location: "Gavathas, Lesvos",
    property_type: "Stonehouse",
    property_type_en: "Traditional Stonehouse",
    property_type_el: "Παραδοσιακό Πέτρινο Σπίτι",
    max_guests: 8,
    bedrooms: 3,
    bathrooms: 2,
    base_price_per_night: 180,
    amenities: ["WiFi", "Parking", "Air Conditioning", "Kitchen", "Garden"],
    description: "Τhis unique house is situated at  Gavathas, 200 m distance from the sea,surrounded  by a splendid  farm of 9000 sq.m full of trees and vineyards.The house comprises of a spacious and sunny living room with fire-place,dining area and fully equipped kitchen,four bedrooms and two bathrooms. Ideal for big families or groups of friends.What makes this house unique, is not only it's tastefully designed interior,but the promise of wonderful hours spent in the outdoor sitting areas.",
    description_en: "Τhis unique house is situated at  Gavathas, 200 m distance from the sea,surrounded  by a splendid  farm of 9000 sq.m full of trees and vineyards.The house comprises of a spacious and sunny living room with fire-place,dining area and fully equipped kitchen,four bedrooms and two bathrooms. Ideal for big families or groups of friends.What makes this house unique, is not only it's tastefully designed interior,but the promise of wonderful hours spent in the outdoor sitting areas." 
    description_el: "Ζήστε την αυθεντική φιλοξενία της Λέσβου σε αυτή την υπέροχη, χειροποίητη πέτρινη κατοικία. Βρίσκεται στον ιστορικό Μόλυβο, συνδυάζοντας την παραδοσιακή αρχιτεκτονική με τις σύγχρονες ανέσεις, προσφέροντας πανοραμική θέα στο Αιγαίο.",
    image_urls: [
      "https://a0.muscache.com/im/pictures/911a0e00-b2c7-47fc-820f-1c346f1a4f91.jpg?im_w=12000",
      "https://a0.muscache.com/im/pictures/f99819c4-4325-47b3-b991-d8ce6dbaa220.jpg?im_w=720"
    ],
    blocked_dates: []
  },
  {
    id: "aegean-horizon-villa",
    name: "Aegean Horizon Retreat",
    name_en: "Aegean Horizon Retreat",
    name_el: "Καταφύγιο Ορίζοντας Αιγαίου",
    location: "Petra, Lesvos",
    property_type: "Villa",
    property_type_en: "Beachfront Villa",
    property_type_el: "Παραθαλάσσια Βίλα",
    max_guests: 7,
    bedrooms: 3,
    bathrooms: 2,
    base_price_per_night: 140,
    amenities: ["WiFi", "Parking", "Air Conditioning", "Kitchen", "Sea View", "Pool"],
    description: "A gorgeous, sun-drenched villa stepping directly out onto the peaceful coastal shores near Petra. Features expansive veranda layouts, private spaces, and modern interior finishings designed for premium family vacation dynamics.",
    description_en: "A gorgeous, sun-drenched villa stepping directly out onto the peaceful coastal shores near Petra. Features expansive veranda layouts, private spaces, and modern interior finishings designed for premium family vacation dynamics.",
    description_el: "Μια υπέροχη, ηλιόλουστη βίλα που οδηγεί απευθείας στην ήσυχη ακτή κοντά στην Πέτρα. Διαθέτει ευρύχωρες βεράντες και μοντέρνους εσωτερικούς χώρους σχεδιασμένους για τις τέλειες οικογενειακές διακοπές.",
    image_urls: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80"
    ],
    blocked_dates: []
  },
  {
    id: "olive-grove-cottage",
    name: "Olive Grove Hideaway",
    name_en: "Olive Grove Hideaway",
    name_el: "Κρυψώνα στον Ελαιώνα",
    location: "Plomari, Lesvos",
    property_type: "Cottage",
    property_type_en: "Rural Cottage",
    property_type_el: "Εξοχική Κατοικία",
    max_guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    base_price_per_night: 85,
    amenities: ["WiFi", "Parking", "Air Conditioning", "Kitchen", "Garden"],
    description: "Nestled among centuries-old silver olive trees, this charming cottage provides ultimate privacy and isolation while remaining just a short drive from the famous beaches of Plomari.",
    description_en: "Nestled among centuries-old silver olive trees, this charming cottage provides ultimate privacy and isolation while remaining just a short drive from the famous beaches of Plomari.",
    description_el: "Φωλιασμένο ανάμεσα σε αιωνόβιους ελαιώνες, αυτό το γοητευτικό εξοχικό σπίτι προσφέρει απόλυτη ιδιωτικότητα, ενώ απέχει ελάχιστα λεπτά με το αυτοκίνητο από τις διάσημες παραλίες του Πλωμαρίου.",
    image_urls: [
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=1200&q=80"
    ],
    blocked_dates: []
  }
];

const LOCAL_MAP_LOCATIONS = [
  // The Residences Coordinates
  { id: "pin-1", category: "residence", property_id: "traditional-stonehouse", title_en: "Iordanou Traditional Stonehouse", title_el: "Παραδοσιακό Πέτρινο Σπίτι", desc_en: "Our traditional home in Molyvos.", desc_el: "Το παραδοσιακό μας σπίτι στον Μόλυβο.", latitude: 39.3665, longitude: 26.1745, image_url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80" },
  { id: "pin-2", category: "residence", property_id: "aegean-horizon-villa", title_en: "Aegean Horizon Retreat", title_el: "Καταφύγιο Ορίζοντας Αιγαίου", desc_en: "Our beachfront villa near Petra.", desc_el: "Η παραθαλάσσια βίλα μας κοντά στην Πέτρα.", latitude: 39.3280, longitude: 26.1820, image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" },
  { id: "pin-3", category: "residence", property_id: "olive-grove-cottage", title_en: "Olive Grove Hideaway", title_el: "Κρυψώνα στον Ελαιώνα", desc_en: "Our quiet cottage in Plomari.", desc_el: "Το ήσυχο εξοχικό μας στο Πλωμάρι.", latitude: 38.9750, longitude: 26.3680, image_url: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=400&q=80" },
  
  // Handpicked Local Landmarks & Beaches
  { id: "beach-1", category: "beach", title_en: "Vatera Beach", title_el: "Παραλία Βατερά", desc_en: "An endless 8km stretch of crystal clear golden sand.", desc_el: "Μια απέραντη χρυσή αμμουδιά 8 χιλιομέτρων με πεντακάθαρα νερά.", latitude: 39.0190, longitude: 26.2240, image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
  { id: "beach-2", category: "beach", title_en: "Eresos Beach", title_el: "Παραλία Ερεσού", desc_en: "Famous sandy beach with beautiful bohemian seaside cafes.", desc_el: "Διάσημη αμμουδιά με υπέροχα παραθαλάσσια καφέ.", latitude: 39.1680, longitude: 25.9320, image_url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80" },
  { id: "landmark-1", category: "landmark", title_en: "Castle of Molyvos", title_el: "Κάστρο Μολύβου", desc_en: "A historic Byzantine fortress overlooking the entire northern bay.", desc_el: "Ιστορικό βυζαντινό φρούριο με θέα σε όλο τον βόρειο κόλπο.", latitude: 39.3685, longitude: 26.1760, image_url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80" }
];

// Mocking the SDK architecture exactly so your components don't crash
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
    }
  }
};
