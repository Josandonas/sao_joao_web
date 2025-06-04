import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ImageGallery from 'react-image-gallery';
import { 
  Container, 
  Title, 
  Introduction, 
  MapSection,
  MapDescription,
  MapContainerStyled,
  CommunityList,
  CommunityCard,
  CardImage,
  CardContent,
  CardTitle,
  CardLocation,
  CardDescription,
  CommunityModal,
  ModalContent,
  ModalHeader,
  CloseButton,
  ModalBody,
  ModalTitle,
  ModalImage,
  ModalDescriptionText,
  ModalDetailsContainer,
  ModalDetail,
  ModalDetailTitle,
  ModalText,
  GalleryContainer,
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

import { communitiesData } from './data/communitiesData';
import CommunitiesMap from './CommunitiesMap';

const Communities = () => {
  const { i18n, t } = useTranslation();
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mapSelectedCommunity, setMapSelectedCommunity] = useState(null);
  const currentLang = i18n.language.split('-')[0] || 'pt';
  
  // Efeito para garantir que o overflow seja restaurado, mesmo em caso de erro
  useEffect(() => {
    // Quando o modal é aberto
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup para garantir que o overflow seja restaurado quando o componente é desmontado
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);


  // Seleciona uma comunidade no mapa e exibe seu card
  const selectCommunityOnMap = (community) => {
    setMapSelectedCommunity(community);
    // Rolar suavemente até o card
    setTimeout(() => {
      document.getElementById('selected-community-card')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  // Abre o modal com a comunidade selecionada
  const openCommunityModal = (community) => {
    setSelectedCommunity(community);
    setShowModal(true);
  };
  
  // Fecha o modal
  const closeCommunityModal = () => {
    setSelectedCommunity(null);
    setShowModal(false);
  };

  return (
    <Container>
      <Title>{t('communities.title')}</Title>
      
      <Introduction>
        <p>{t('communities.introduction')}</p>
      </Introduction>
      
      <MapSection>
        <h2>{t('communities.mapTitle')}</h2>
        <MapDescription>
          <p>{t('communities.mapDescription') || 'Selecione um ponto no mapa para visualizar informações da comunidade.'}</p>
        </MapDescription>
        <MapContainerStyled>
          <CommunitiesMap onSelectCommunity={selectCommunityOnMap} />
        </MapContainerStyled>
      </MapSection>
      
      {/* Card da comunidade selecionada no mapa */}
      {mapSelectedCommunity && (
        <SelectedCommunitySection id="selected-community-card">
          <SelectedCommunityTitle>
            {mapSelectedCommunity.name[currentLang] || mapSelectedCommunity.name['pt']}
          </SelectedCommunityTitle>
          
          <SelectedCommunityCard>
            <SelectedCommunityImage src={mapSelectedCommunity.image} alt={mapSelectedCommunity.name} />
            <SelectedCommunityContent>
              <SelectedCommunityDescription>
                {mapSelectedCommunity.description[currentLang] || mapSelectedCommunity.description['pt'] || 
                  t('communities.noDescription') || 'Clique para ver mais informações sobre esta comunidade.'}
              </SelectedCommunityDescription>
              
              <SelectedCommunityLocation>
                <LocationIcon />
                {mapSelectedCommunity.location[currentLang] || mapSelectedCommunity.location['pt']}
              </SelectedCommunityLocation>
              
              <DetailsButton onClick={() => openCommunityModal(mapSelectedCommunity)}>
                {t('communities.viewDetails') || 'Ver detalhes'}
              </DetailsButton>
            </SelectedCommunityContent>
          </SelectedCommunityCard>
        </SelectedCommunitySection>
      )}
      
      {/* Modal para exibir os detalhes completos da comunidade */}
      {showModal && selectedCommunity && (
        <CommunityModal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{selectedCommunity.name[currentLang] || selectedCommunity.name['pt']}</ModalTitle>
              <CloseButton onClick={closeCommunityModal}>&times;</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              {/* Exibe a imagem principal quando não há galeria */}
              {(!selectedCommunity.gallery || selectedCommunity.gallery.length === 0) ? (
                <ModalImage src={selectedCommunity.image} alt={selectedCommunity.name} />
              ) : (
                <GalleryContainer>
                  <ImageGallery
                    items={[
                      // Adiciona a imagem de capa como a primeira da galeria
                      {
                        original: selectedCommunity.image,
                        thumbnail: selectedCommunity.image
                      },
                      // Adiciona as outras imagens da galeria
                      ...selectedCommunity.gallery.map(image => ({
                        original: image,
                        thumbnail: image
                      }))
                    ]}
                    showPlayButton={false}
                    showFullscreenButton={true}
                    slideInterval={3000}
                    slideOnThumbnailOver={true}
                    showIndex={true}
                  />
                </GalleryContainer>
              )}
              
              <div dangerouslySetInnerHTML={{ __html: selectedCommunity.fullDescription[currentLang] || selectedCommunity.fullDescription['pt'] }} />
              
              <ModalDetailsContainer>
                <ModalDetail>
                  <ModalDetailTitle>{t('communities.locationLabel') || 'Local'}</ModalDetailTitle>
                  <ModalText>{selectedCommunity.location[currentLang] || selectedCommunity.location['pt']}</ModalText>
                </ModalDetail>
                
                <ModalDetail>
                  <ModalDetailTitle>{t('communities.traditionsLabel') || 'Tradições'}</ModalDetailTitle>
                  <ModalText>{selectedCommunity.traditions[currentLang] || selectedCommunity.traditions['pt']}</ModalText>
                </ModalDetail>
                
                <ModalDetail>
                  <ModalDetailTitle>{t('communities.festivalDateLabel') || 'Período Festivo'}</ModalDetailTitle>
                  <ModalText>{selectedCommunity.festival_date[currentLang] || selectedCommunity.festival_date['pt']}</ModalText>
                </ModalDetail>
                
                {selectedCommunity.religion && (
                  <ModalDetail>
                    <ModalDetailTitle>{t('communities.religionLabel') || 'Religião'}</ModalDetailTitle>
                    <ModalText>{selectedCommunity.religion[currentLang] || selectedCommunity.religion['pt']}</ModalText>
                  </ModalDetail>
                )}

                {selectedCommunity.startYear && (
                  <ModalDetail>
                    <ModalDetailTitle>{t('communities.startYearLabel') || 'Início'}</ModalDetailTitle>
                    <ModalText>{selectedCommunity.startYear}</ModalText>
                  </ModalDetail>
                )}

                {selectedCommunity.grace && (
                  <ModalDetail>
                    <ModalDetailTitle>{t('communities.graceLabel') || 'Graça'}</ModalDetailTitle>
                    <ModalText>{selectedCommunity.grace[currentLang] || selectedCommunity.grace['pt']}</ModalText>
                  </ModalDetail>
                )}
              </ModalDetailsContainer>
            </ModalBody>
          </ModalContent>
        </CommunityModal>
      )}
    </Container>
  );
};

export default Communities;
