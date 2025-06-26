import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import RegisterCommunityModal from '../RegisterCommunityModal';
import { communitiesService } from '../../../../services';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import { sanitizeObject } from '../../../../utils/textUtils';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainerStyled, MapDescription, MapTitle, MapTitleContainer, RegisterButton } from './styles';
import { communitiesData as defaultCommunitiesData } from '../../data/communitiesData';

// Corrigir problemas com ícones do Leaflet em ambientes React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Função para criar ícones personalizados para os marcadores
const createIcon = (color, size) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: size ? [30, 46] : [25, 41],
    iconAnchor: size ? [15, 46] : [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// Componente para centralizar o mapa na comunidade selecionada
function FlyToSelected({ selectedCommunity }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedCommunity && selectedCommunity.coordinates) {
      const position = [selectedCommunity.coordinates.lat, selectedCommunity.coordinates.lng];
      map.flyTo(position, 15, {
        animate: true,
        duration: 1.5
      });
    }
  }, [map, selectedCommunity]);
  
  return null;
}

/**
 * Componente que exibe o mapa de comunidades com marcadores e tooltips
 * @param {Function} onSelectCommunity - Função a ser chamada quando uma comunidade é selecionada no mapa
 * @param {Object} selectedCommunity - A comunidade atualmente selecionada (se houver)
 */
const CommunityMap = ({ onSelectCommunity, selectedCommunity }) => {
  const { t, i18n } = useTranslation();
  const mapRef = useRef(null);
  
  // Combine default and user-submitted communities
  const [mergedCommunitiesData, setMergedCommunitiesData] = useState([]);
  
  // Fetch and merge communities on component mount and when modal closes
  const loadCommunities = useCallback(async () => {
    try {
      // Busca comunidades da API e mescla com as estáticas e locais
      const allCommunities = await communitiesService.fetchAllCommunities(defaultCommunitiesData);
      setMergedCommunitiesData(allCommunities);
    } catch (error) {
      console.error('Erro ao carregar comunidades:', error);
      // Em caso de falha na API, usa apenas as comunidades estáticas e locais
      const fallbackCommunities = communitiesService.mergeCommunities(defaultCommunitiesData);
      setMergedCommunitiesData(fallbackCommunities);
    }
  }, []);
  
  useEffect(() => {
    loadCommunities();
  }, [loadCommunities]);
  
  // Sanitize all communities data to handle special characters
  const sanitizedCommunities = useMemo(() => 
    mergedCommunitiesData.map(community => sanitizeObject(community)), 
    [mergedCommunitiesData]
  );
  
  // Sanitize selected community if exists
  const sanitizedSelectedCommunity = useMemo(() => 
    selectedCommunity ? sanitizeObject(selectedCommunity) : null, 
    [selectedCommunity]
  );
  
  const currentLang = i18n.language.split('-')[0] || 'pt';
  const [hoveredCommunity, setHoveredCommunity] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
  };
  
  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
    // Recarregar as comunidades para mostrar as recém-cadastradas
    loadCommunities();
  };
  
  // Coordenadas do centro de Corumbá - MS
  const corumbaCoordinates = [-19.0095, -57.6511];
  
  return (
    <>
      <MapTitleContainer>
        <MapTitle>{t('communities.mapTitle') || 'Mapa das Comunidades'}</MapTitle>
        <RegisterButton onClick={handleOpenRegisterModal}>
          {t('communities.registerButton') || 'Cadastrar Comunidade'}
        </RegisterButton>
      </MapTitleContainer>
      
      {/* Modal de cadastro de comunidades */}
      <RegisterCommunityModal 
        isOpen={showRegisterModal} 
        onClose={handleCloseRegisterModal}
      />
      <MapContainerStyled>
        <MapContainer 
          center={corumbaCoordinates}
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={true}
          doubleClickZoom={true}
          dragging={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Componente que centraliza o mapa na comunidade selecionada */}
          {sanitizedSelectedCommunity && <FlyToSelected selectedCommunity={sanitizedSelectedCommunity} />}
          
          {/* Renderize os marcadores primeiro para evitar problemas de sincronização */}
          {sanitizedCommunities.map(community =>
            community.coordinates ? (
              <Marker
                key={community.id}
                position={[community.coordinates.lat, community.coordinates.lng]}
                icon={sanitizedSelectedCommunity && sanitizedSelectedCommunity.id === community.id ? 
                  createIcon('red', true) : createIcon('blue', false)}
                eventHandlers={{
                  click: () => onSelectCommunity && onSelectCommunity(community),
                  mouseover: () => setHoveredCommunity(community.id),
                  mouseout: () => setHoveredCommunity(null)
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                  <div>
                    <strong>{community.name[currentLang] || community.name['pt']}</strong>
                    {hoveredCommunity === community.id && (
                      <small> - {t('communities.clickForDetails')}</small>
                    )}
                  </div>
                </Tooltip>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </MapContainerStyled>
      
      <MapDescription>
        <p>{t('communities.mapDescription') || 'Os pontos no mapa representam comunidades que preservam e celebram as tradições do Banho de São João. Clique em um marcador para conhecer mais.'}</p>
      </MapDescription>
      
      {/* Componente auxiliar separado para evitar problemas de renderização */}
    </>
  );
};

export default CommunityMap;
