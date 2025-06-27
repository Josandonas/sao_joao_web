import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaExternalLinkAlt, FaPhone, FaClock, FaInfoCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  CardWrapper,
  CardImageContainer,
  CardImage,
  CardIframe,
  IframeLoader,
  CardCategory,
  CardContent,
  CardTitle,
  CardDescription,
  CardInfoList,
  CardInfoItem,
  CardInfoText,
  CardFooter,
  CardLink,
  CardLocation
} from './BibliotecaCard.styles';

/**
 * Componente de card para exibição de itens da biblioteca
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.item - Dados do item a ser exibido
 * @returns {JSX.Element} - Componente renderizado
 */
const BibliotecaCard = ({ item }) => {
  const { t } = useTranslation();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  
  return (
    <CardWrapper>
      <CardImageContainer>
        {item.iframeUrl ? (
          <>
            {!iframeLoaded && <IframeLoader />}
            <CardIframe 
              src={item.iframeUrl} 
              title={item.title} 
              frameBorder="0" 
              loading="lazy" 
              onLoad={() => setIframeLoaded(true)}
              style={{ opacity: iframeLoaded ? 1 : 0 }}
              allowFullScreen
            />
          </>
        ) : (
          <CardImage src={`${PUBLIC_URL}/${item.imageUrl || '/assets/images/biblioteca/placeholder.jpg'}`} alt={item.title} loading="lazy" />
        )}
        <CardCategory>{t(`biblioteca.categories.${item.category}`, item.category)}</CardCategory>
      </CardImageContainer>
      
      <CardContent>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
        
        <CardInfoList>
          {item.address && (
            <CardInfoItem>
              <FaMapMarkerAlt size={16} />
              <CardInfoText>{item.address}</CardInfoText>
            </CardInfoItem>
          )}
          
          {item.phone && (
            <CardInfoItem>
              <FaPhone size={16} />
              <CardInfoText>{item.phone}</CardInfoText>
            </CardInfoItem>
          )}
          
          {item.hours && (
            <CardInfoItem>
              <FaClock size={16} />
              <CardInfoText>{item.hours}</CardInfoText>
            </CardInfoItem>
          )}
          
          {item.additionalInfo && (
            <CardInfoItem>
              <FaInfoCircle size={16} />
              <CardInfoText>{item.additionalInfo}</CardInfoText>
            </CardInfoItem>
          )}
        </CardInfoList>
        
        <CardFooter>
          {item.website && (
            <CardLink href={item.website} target="_blank" rel="noopener noreferrer">
              {t('biblioteca.visitWebsite', 'Visitar website')}
              <FaExternalLinkAlt size={12} />
            </CardLink>
          )}
          
          {item.location && (
            <CardLocation>
              <FaMapMarkerAlt size={14} />
              {item.location}
            </CardLocation>
          )}
        </CardFooter>
      </CardContent>
    </CardWrapper>
  );
};

BibliotecaCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    iframeUrl: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    hours: PropTypes.string,
    additionalInfo: PropTypes.string,
    website: PropTypes.string,
    location: PropTypes.string
  }).isRequired
};

export default BibliotecaCard;
