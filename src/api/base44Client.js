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
    description_en: "Τhis unique house is situated at  Gavathas, 200 m distance from the sea,surrounded  by a splendid  farm of 9000 sq.m full of trees and vineyards.The house comprises of a spacious and sunny living room with fire-place,dining area and fully equipped kitchen,four bedrooms and two bathrooms. Ideal for big families or groups of friends.What makes this house unique, is not only it's tastefully designed interior,but the promise of wonderful hours spent in the outdoor sitting areas.",
    description_el: "Ζήστε την αυθεντική φιλοξενία της Λέσβου σε αυτή την υπέροχη, χειροποίητη πέτρινη κατοικία. Βρίσκεται στον ιστορικό Μόλυβο, συνδυάζοντας την παραδοσιακή αρχιτεκτονική με τις σύγχρονες ανέσεις, προσφέροντας πανοραμική θέα στο Αιγαίο.",
    image_urls: [
      "https://a0.muscache.com/im/pictures/911a0e00-b2c7-47fc-820f-1c346f1a4f91.jpg?im_w=480&im_q=medq",
      "https://a0.muscache.com/im/pictures/f99819c4-4325-47b3-b991-d8ce6dbaa220.jpg?im_w=720"
    ],
    blocked_dates: []
  },
  {
    id: "Villa Hermes",
    name: "Villa Hermes",
    name_en: "Villa Hermes",
    name_el: "Βίλα Ερμής",
    location: "Mytilene, Lesvos",
    property_type: "Villa",
    property_type_en: "Close to beach Villa",
    property_type_el: "Παραθαλάσσια Βίλα",
    max_guests: 7,
    bedrooms: 3,
    bathrooms: 2,
    base_price_per_night: 140,
    amenities: ["WiFi", "Parking", "Air Conditioning", "Kitchen", "Sea View",],
    description: "Villa Hermes is a wonderful and unique place with a rich history and character. Its transformation from a warehouse to an office and finally into a beautifully renovated house adds to its charm. The combination of modern materials and vintage furniture giving the house a distinctive atmosphere. The layout of the house, with its open spaces and architectural elements, adds to the overall appeal.",
    description_en: "Villa Hermes is a wonderful and unique place with a rich history and character. Its transformation from a warehouse to an office and finally into a beautifully renovated house adds to its charm. The combination of modern materials and vintage furniture giving the house a distinctive atmosphere. The layout of the house, with its open spaces and architectural elements, adds to the overall appeal.",
    description_el: "Μια υπέροχη, ηλιόλουστη βίλα που οδηγεί απευθείας στην ήσυχη ακτή κοντά στην θάλασσα αλλά και στο κέντρο της Μυτιλήνης. Διαθέτει ευρύχωρη αυλή και μεγάλο σαλόνι για τις τέλειες οικογενειακές διακοπές.",
    image_urls: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-963513247135914909/original/00dd30e2-d61c-445e-a95c-cd0cdd835316.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTYzNTEzMjQ3MTM1OTE0OTA5/original/a981a56a-faa5-413a-af4a-d0c08fda1350.jpeg?im_w=720"
    ],
    blocked_dates: []
  },

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
