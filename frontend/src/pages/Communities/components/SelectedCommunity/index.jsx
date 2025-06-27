import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { decodeSpecialChars, sanitizeObject } from '../../../../utils/textUtils';
import {
  SelectedCommunitySection,
  SelectedCommunityTitle,
  SelectedCommunityCard,
  SelectedCommunityImage,
  SelectedCommunityContent,
  SelectedCommunityDescription,
  SelectedCommunityLocation,
  LocationIcon,
  DetailsButton
} from './styles';

/**
 * Componente que exibe o card da comunidade selecionada no mapa
 * @param {Object} community - A comunidade selecionada
 * @param {Function} onViewDetails - Função a ser chamada quando o botão "Ver detalhes" é clicado
 */
const SelectedCommunity = ({ community, onViewDetails }) => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language.split('-')[0] || 'pt';
  
  if (!community) return null;
  
  // Sanitize community data to handle special characters
  const sanitizedCommunity = useMemo(() => sanitizeObject(community), [community]);
  
  return (
    <SelectedCommunitySection id="selected-community-card">
      <SelectedCommunityTitle>
        {sanitizedCommunity.name[currentLang] || sanitizedCommunity.name['pt']}
      </SelectedCommunityTitle>
      
      <SelectedCommunityCard>
        <SelectedCommunityImage 
          src={typeof sanitizedCommunity.image === 'string' ? sanitizedCommunity.image : '/images/community-placeholder.jpg'} 
          alt={sanitizedCommunity.name[currentLang] || sanitizedCommunity.name['pt']} />
        <SelectedCommunityContent>
          <SelectedCommunityDescription>
            {(sanitizedCommunity.description && (sanitizedCommunity.description[currentLang] || sanitizedCommunity.description['pt'])) ? 
              (sanitizedCommunity.description[currentLang] || sanitizedCommunity.description['pt']) : 
              t('communities.noDescription')}
          </SelectedCommunityDescription>
          
          <SelectedCommunityLocation>
            <LocationIcon />
            {(sanitizedCommunity.location && (sanitizedCommunity.location[currentLang] || sanitizedCommunity.location['pt'])) || 
             t('communities.location')}
          </SelectedCommunityLocation>
          
          <DetailsButton onClick={() => onViewDetails(sanitizedCommunity)}>
            {t('communities.viewDetails') || 'Ver detalhes'}
          </DetailsButton>
        </SelectedCommunityContent>
      </SelectedCommunityCard>
    </SelectedCommunitySection>
  );
};

export default SelectedCommunity;
