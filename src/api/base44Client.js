import { createClient } from "@base44/client"

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
    blocked_dates: []
  }
];

const LOCAL_MAP_LOCATIONS = [
  {
    id: "pin-1",
    category: "residence",
    property_id: "traditional-stonehouse",
    title_en: "Traditional Stonehouse in Gavathas",
    title_el: "Παραδοσιακό Πέτρινο Σπίτι",
    desc_en: "Luxury stone house in rural Gavathas.",
    desc_el: "Πολυτελές πέτρινο σπίτι στον παραθαλάσσιο Γαββαθά.",
    latitude: 39.2830,
    longitude: 25.9730,
    image_url: "https://a0.muscache.com/im/pictures/911a0e00-b2c7-47fc-820f-1c346f1a4f91.jpg?im_w=480"
  },
  {
    id: "pin-2",
    category: "residence",
    property_id: "Villa Hermes",
    title_en: "Villa Hermes",
    title_el: "Βίλα Ερμής",
    desc_en: "Beautiful residence in Vareia, Mytilene.",
    desc_el: "Υπέροχη κατοικία στη Βαρειά Μυτιλήνης.",
    latitude: 39.0800,
    longitude: 26.5780,
    image_url: "https://a0.muscache.com/im/pictures/hosting/Hosting-963513247135914909/original/00dd30e2-d61c-445e-a95c-cd0cdd835316.jpeg?im_w=720"
  }
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
