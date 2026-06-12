const LOCAL_PROPERTIES = [
  {
    id: "traditional-stonehouse",
    name: "Traditional Stonehouse in Gavathas",
    name_en: "Traditional Stonehouse in Gavathas",
    name_el: "Παραδοσιακό Πέτρινο Σπίτι στον Γαββαθά",
    location: "Gavathas, Lesvos",
    location_en: "Gavathas, Lesvos",
    location_el: "Γαββαθάς, Λέσβος",
    property_type: "Stonehouse",
    property_type_en: "Traditional Stonehouse",
    property_type_el: "Παραδοσιακό Πέτρινο Σπίτι",
    max_guests: 8,
    bedrooms: 3,
    bathrooms: 2,
    base_price_per_night: 180,
    amenities: ["WiFi", "Parking", "Air Conditioning", "Kitchen", "Garden"],
    description: "This unique house is situated at Gavathas, 200 m distance from the sea, surrounded by a splendid farm of 9000 sq.m full of trees and vineyards. The house comprises of a spacious and sunny living room with fire-place, dining area and fully equipped kitchen, four bedrooms and two bathrooms. Ideal for big families or groups of friends. What makes this house unique, is not only it's tastesfully designed interior, but the promise of wonderful hours spent in the outdoor sitting areas.",
    description_en: "This unique house is situated at Gavathas, 200 m distance from the sea, surrounded by a splendid farm of 9000 sq.m full of trees and vineyards. The house comprises of a spacious and sunny living room with fire-place, dining area and fully equipped kitchen, four bedrooms and two bathrooms. Ideal for big families or groups of friends. What makes this house unique, is not only it's tastesfully designed interior, but the promise of wonderful hours spent in the outdoor sitting areas.",
    description_el: "Αυτό το μοναδικό σπίτι βρίσκεται στον Γαββαθά, σε απόσταση 200 μέτρων από τη θάλασσα, περιβαλλόμενο από ένα υπέροχο κτήμα 9 στρεμμάτων γεμάτο δέντρα και αμπελώνες. Διαθέτει ευρύχωρο σαλόνι με τζάκι, μεγάλη κουζίνα, ξύλινα πατώματα και τεράστιο κήπο. Ιδανικό για μεγάλες οικογένειες ή παρέες που αναζητούν την απόλυτη ιδιωτικότητα.",
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
    location_en: "Vareia, Mytilene",
    location_el: "Βαρειά, Μυτιλήνη",
    property_type: "Villa",
    property_type_en: "Close to beach Villa",
    property_type_el: "Παραθαλάσσια Βίλα",
    max_guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    base_price_per_night: 140,
    amenities: ["WiFi", "Parking", "Air Conditioning", "Kitchen", "Garden"],
    description: "Villa Hermes is a wonderful and unique place with a rich history and character. Located just 10 minutes from Mytilene city center and a 5-minute walk from the sea, it features a beautiful garden, private parking, and a premium, fully-equipped design that feels like a true home.",
    description_en: "Villa Hermes is a wonderful and unique place with a rich history and character. Located just 10 minutes from Mytilene city center and a 5-minute walk from the sea, it features a beautiful garden, private parking, and a premium, fully-equipped design that feels like a true home.",
    description_el: "Η Βίλα Ερμής βρίσκεται σε εξαιρετική τοποθεσία στη Βαρειά Μυτιλήνης, μόλις 10 λεπτά με το αυτοκίνητο από το κέντρο της πόλης και 5 λεπτά με τα πόδια από τη θάλασσα. Μια πραγματική, ευρύχωρη κατοικία με 3 υπνοδωμάτια, 2 μπάνια, ιδιωτικό πάρκινγκ και πανέμορφο κήπο.",
    image_urls: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-963513247135914909/original/00dd30e2-d61c-445e-a95c-cd0cdd835316.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTYzNTEzMjQ3MTM1OTE0OTA5/original/a981a56a-faa5-413a-af4a-d0c08fda1350.jpeg?im_w=720"
    ],
    ical_url: "https://www.airbnb.gr/calendar/ical/963513247135914909.ics?t=5f8b189366714472a934afdcd8e211fe",
    blocked_dates: []
  }
];

const LOCAL_MAP_LOCATIONS = [
  // Καταλύματα
  { id: "pin-house-1", category: "residence", property_id: "traditional-stonehouse", title_en: "Traditional Stonehouse in Gavathas", title_el: "Παραδοσιακό Πέτρινο Σπίτι", desc_en: "Luxury stone house in rural Gavathas.", desc_el: "Πολυτελές πέτρινο σπίτι στον παραθαλάσσιο Γαββαθά.", latitude: 39.2744, longitude: 25.9763, image_url: "https://a0.muscache.com/im/pictures/911a0e00-b2c7-47fc-820f-1c346f1a4f91.jpg?im_w=480" },
  { id: "pin-house-2", category: "residence", property_id: "Villa Hermes", title_en: "Villa Hermes", title_el: "Βίλα Ερμής", desc_en: "Beautiful residence in Vareia, Mytilene.", desc_el: "Υπέροχη κατοικία στη Βαρειά Μυτιλήνης.", latitude: 39.0820, longitude: 26.5714, image_url: "https://a0.muscache.com/im/pictures/hosting/Hosting-963513247135914909/original/00dd30e2-d61c-445e-a95c-cd0cdd835316.jpeg?im_w=720" },
  
  // Παραλίες & Τοποθεσίες
  { id: "pin-gavathas", category: "beach", title_en: "Gavathas Beach", title_el: "Παραλία Γαββαθά", desc_en: "A serene, shallow sandy beach perfect for families.", desc_el: "Ήσυχη αμμώδης παραλία με ρηχά νερά, ιδανική για οικογένειες.", latitude: 39.2840, longitude: 25.9730, image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
  { id: "pin-eressos", category: "beach", title_en: "Skala Eressos Beach", title_el: "Παραλία Ερεσσού", desc_en: "A vibrant, famous sandy beach with clear waters and bars.", desc_el: "Διάσημη παραλία με χρυσή άμμο, κρυστάλλινα νερά και ζωντάνια.", latitude: 39.1360, longitude: 25.9320, image_url: "https://images.unsplash.com/photo-1580227184234-8b650fc33827?w=800&q=80" },
  { id: "pin-faneromeni", category: "beach", title_en: "Faneromeni Beach", title_el: "Παραλία Φανερωμένη", desc_en: "A peaceful, wide sandy beach near Sigri.", desc_el: "Μια ήσυχη και μεγάλη αμμώδης παραλία κοντά στο Σίγρι.", latitude: 39.2310, longitude: 25.8360, image_url: "https://images.unsplash.com/photo-1621275470125-97e3c1a2e7c4?w=800&q=80" },
  { id: "pin-sigri", category: "landmark", title_en: "Sigri Village", title_el: "Σίγρι", desc_en: "Picturesque fishing village known for its castle and Petrified Forest.", desc_el: "Γραφικό ψαροχώρι, γνωστό για το Κάστρο του και το Απολιθωμένο Δάσος.", latitude: 39.2110, longitude: 25.8520, image_url: "https://images.unsplash.com/photo-1563814882194-e0c25a0a3b3a?w=800&q=80" },
  { id: "pin-molyvos", category: "landmark", title_en: "Molyvos (Mithymna)", title_el: "Μόλυβος", desc_en: "One of the most beautiful medieval villages in Greece.", desc_el: "Ενας από τους πιο όμορφους μεσαιωνικούς οικισμούς της Ελλάδας.", latitude: 39.3670, longitude: 26.1740, image_url: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed2a?w=800&q=80" },
  { id: "pin-petra", category: "landmark", title_en: "Petra", title_el: "Πέτρα", desc_en: "Charming coastal village famous for the church on the rock.", desc_el: "Όμορφο παραθαλάσσιο χωριό, διάσημο για την εκκλησία πάνω στον βράχο.", latitude: 39.3270, longitude: 26.1760, image_url: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=800&q=80" },
  { id: "pin-charamida", category: "beach", title_en: "Charamida / Figokentros", title_el: "Χαραμίδα & Φυγόκεντρος", desc_en: "Popular beach destination near Mytilene with crystal waters.", desc_el: "Αγαπημένος προορισμός κοντά στη Μυτιλήνη με καθαρά νερά και beach bars.", latitude: 39.0280, longitude: 26.5940, image_url: "https://images.unsplash.com/photo-1544644181-1484b3f8c8b1?w=800&q=80" },
  { id: "pin-mytilene", category: "landmark", title_en: "Mytilene City", title_el: "Πόλη Μυτιλήνης", desc_en: "The vibrant capital of Lesvos with neoclassical architecture.", desc_el: "Η ζωντανή πρωτεύουσα της Λέσβου με την εντυπωσιακή νεοκλασική αρχιτεκτονική.", latitude: 39.1060, longitude: 26.5540, image_url: "https://images.unsplash.com/photo-1574880529528-93666bba7216?w=800&q=80" },
  { id: "pin-castle", category: "landmark", title_en: "Mytilene Castle", title_el: "Κάστρο Μυτιλήνης", desc_en: "One of the largest castles in the Mediterranean.", desc_el: "Ένα από τα μεγαλύτερα και πιο εντυπωσιακά κάστρα της Μεσογείου.", latitude: 39.1110, longitude: 26.5590, image_url: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?w=800&q=80" },
  { id: "pin-plomari", category: "landmark", title_en: "Plomari", title_el: "Πλωμάρι", desc_en: "The global capital of Ouzo with authentic Aegean charm.", desc_el: "Η παγκόσμια πρωτεύουσα του Ούζου, με αυθεντική Αιγαιοπελαγίτικη γοητεία.", latitude: 38.9750, longitude: 26.3680, image_url: "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=800&q=80" },
  { id: "pin-agios", category: "beach", title_en: "Agios Isidoros Beach", title_el: "Παραλία Άγιος Ισίδωρος", desc_en: "Award-winning pebble beach near Plomari.", desc_el: "Βραβευμένη παραλία με βότσαλο κοντά στο Πλωμάρι, αγαπημένη των επισκεπτών.", latitude: 38.9710, longitude: 26.3880, image_url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80" },
  { id: "pin-vatera", category: "beach", title_en: "Vatera Beach", title_el: "Παραλία Βατερών", desc_en: "An impressive 8km long sandy beach, the longest on the island.", desc_el: "Η μεγαλύτερη αμμώδης παραλία του νησιού, μήκους 8 χιλιομέτρων.", latitude: 39.0140, longitude: 26.1960, image_url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80" }
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
      list: async () => [
        { id: "c1", code: "WELCOME10", discount_percentage: 10, active: true, usage_count: 3 }
      ],
      filter: async ({ code, active }) => {
        const coupons = [
          { id: "c1", code: "WELCOME10", discount_percentage: 10, active: true }
        ];
        return coupons.filter(c => c.code === code && c.active === active);
      }
    }
  }
};
