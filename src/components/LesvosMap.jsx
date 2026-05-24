import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { useLanguage } from '@/lib/LanguageContext';
import 'leaflet/dist/leaflet.css';


// Fix default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function makeIcon(bgColor, borderColor, svgContent) {
  const html = `
    <div style="
      width:38px;height:38px;border-radius:50% 50% 50% 0;
      background:${bgColor};border:2.5px solid ${borderColor};
      transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 8px rgba(0,0,0,0.18);
    ">
      <div style="transform:rotate(45deg);display:flex;align-items:center;justify-content:center;">
        ${svgContent}
      </div>
    </div>`;
  return L.divIcon({ html, className: '', iconSize: [38, 38], iconAnchor: [19, 38], popupAnchor: [0, -40] });
}

const residenceIcon = makeIcon('#2e7fc2', '#1a5fa0',
  `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
);
const beachIcon = makeIcon('#d4a017', '#b8880f',
  `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"/><path d="M2 12c0-5.5 4-10 10-10s10 4.5 10 10"/><path d="M12 2v20"/><path d="M18 20c-1-1-3-2-6-2s-5 1-6 2"/></svg>`
);
const landmarkIcon = makeIcon('#7c7c7c', '#5c5c5c',
  `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
);

const iconMap = { residence: residenceIcon, beach: beachIcon, landmark: landmarkIcon };

export default function LesvosMap({ locations = [], isLoading }) {
  const { localField, t, lang } = useLanguage();
  const LESVOS_CENTER = [39.18, 26.25];
  const LESVOS_BOUNDS = [[38.85, 25.65], [39.55, 26.85]];

  if (isLoading) return (
    <div className="w-full h-full flex items-center justify-center bg-muted/30" style={{ minHeight: 600 }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <span className="text-sm font-body text-muted-foreground">Loading map…</span>
      </div>
    </div>
  );

  return (
    <MapContainer
      center={LESVOS_CENTER}
      zoom={10}
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
      scrollWheelZoom={true}
      preferCanvas={true}
      zoomAnimation={false}
      maxBounds={LESVOS_BOUNDS}
      maxBoundsViscosity={1.0}
      minZoom={10}
      maxZoom={16}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {locations.map(loc => {
        if (!loc.latitude || !loc.longitude) return null;
        const icon = iconMap[loc.category] || landmarkIcon;
        const title = localField(loc, 'title');
        const desc = localField(loc, 'desc');
        const isResidence = loc.category === 'residence' && loc.property_id;

        return (
          <Marker key={loc.id} position={[loc.latitude, loc.longitude]} icon={icon}>
            <Popup maxWidth={260} className="leaflet-popup-custom">
              <div className="font-body" style={{ minWidth: 220 }}>
                {loc.image_url && (
                  <img
                    src={loc.image_url}
                    alt={title}
                    style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
                  />
                )}
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a2744', marginBottom: 4, fontFamily: 'Playfair Display, serif' }}>
                  {title}
                </div>
                {desc && (
                  <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5, marginBottom: 8 }}>
                    {desc.length > 120 ? desc.slice(0, 117) + '…' : desc}
                  </div>
                )}
                {isResidence && (
                  <a
                    href={`/property/${loc.property_id}`}
                    style={{
                      display: 'inline-block', background: '#2e7fc2', color: 'white',
                      padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                      textDecoration: 'none', marginTop: 2,
                    }}
                  >
                    {lang === 'el' ? 'Δείτε & Κράτηση →' : 'View Property & Book →'}
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
