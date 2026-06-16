// src/lib/amenityIcons.js
import { Wifi, Car, Wind, Utensils, Waves, TreePine, Check } from 'lucide-react';

export const amenityIcons = {
  'WiFi': Wifi,
  'Parking': Car,
  'Air Conditioning': Wind,
  'Kitchen': Utensils,
  'Sea View': Waves,
  'Garden': TreePine,
  'Pool': Waves,
};

export function getAmenityIcon(amenity) {
  return amenityIcons[amenity] || Check;
}
