import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
import { communitiesData } from './data/communitiesData';

// Corrige o ícone padrão do Leaflet para funcionar com Webpack/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Centro de Corumbá
const corumbaCenter = [-19.00926, -57.65279];
const mapZoom = 13;

const CommunitiesMap = ({ onSelectCommunity }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0] || 'pt';

  return (
    <MapContainer
      center={corumbaCenter}
      zoom={mapZoom}
      style={{ width: '100%', height: 600, borderRadius: 8, margin: '0 auto', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
      scrollWheelZoom={true}
      zoomControl={true}
      doubleClickZoom={true}
      dragging={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {communitiesData.map(community =>
        community.coordinates ? (
          <Marker
            key={community.id}
            position={[community.coordinates.lat, community.coordinates.lng]}
            eventHandlers={{
              click: () => onSelectCommunity && onSelectCommunity(community)
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
              {community.name[currentLang] || community.name['pt']}
            </Tooltip>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
};

export default CommunitiesMap;
