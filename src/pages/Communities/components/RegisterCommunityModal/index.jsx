import React, { useState, useRef, useCallback } from 'react';
import communityService from '../../services/communityService';
import communitiesApi from '../../services/communitiesApi';

// Desestruturação das funções do serviço
const { processImage, saveCommunity, communityExists, fetchAllCommunities } = communityService;
const { createCommunity } = communitiesApi;
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  RegisterModal, 
  ModalContent, 
  ModalHeader, 
  ModalTitle, 
  CloseButton,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  ImageUploadArea,
  ImagePreview,
  SubmitButton,
  MapSelectorContainer,
  TabsContainer,
  Tab,
  FieldGroup,
  LanguageTabs,
  LanguageTab,
  CoordinatesDisplay,
  FormActions
} from './styles';

// Componente que permite clicar no mapa para selecionar uma localização
const LocationSelector = ({ onSelectLocation, initialPosition }) => {
  const [marker, setMarker] = useState(initialPosition);
  
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setMarker({ lat, lng });
      onSelectLocation({ lat, lng });
    }
  });
  
  return marker ? (
    <Marker
      position={[marker.lat, marker.lng]}
      icon={new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })}
    />
  ) : null;
};

// Componente removido - não usaremos mais abas de idioma

const RegisterCommunityModal = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  
  // Removida função auxiliar para renderizar abas de idioma
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const currentLang = i18n.language.split('-')[0] || 'pt';
  
  const [activeTab, setActiveTab] = useState('info');
  const [coordinates, setCoordinates] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    fullDescription: '',
    traditions: '',
    religion: '',
    festival_date: ''
  });
  
  // Coordenadas do centro de Corumbá - MS
  const corumbaCoordinates = [-19.0095, -57.6511];
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [];
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push(e.target.result);
          if (newImages.length === files.length) {
            setGalleryImages(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Verifica se os campos obrigatórios estão preenchidos
      if (!formData.name || !formData.description || !coordinates || !coverImage) {
        const missingFields = [];
        if (!formData.name) missingFields.push('Nome');
        if (!formData.description) missingFields.push('Descrição');
        if (!coordinates) missingFields.push('Coordenadas no mapa');
        if (!coverImage) missingFields.push('Imagem de capa');
        
        console.error('Erro de validação: Campos obrigatórios não preenchidos', {
          missingFields,
          formData: JSON.stringify(formData)
        });
        throw new Error(t('communities.requiredFieldsError'));
      }
      
      console.log('Processando imagem de capa...');
      // Processa a imagem de capa para otimização
      const optimizedCoverImage = await processImage(coverImage);
      
      console.log('Processando imagens da galeria...');
      // Processa imagens da galeria
      const optimizedGalleryImages = [];
      for (const image of galleryImages) {
        const optimizedImage = await processImage(image);
        optimizedGalleryImages.push(optimizedImage);
      }
      
      // Obtendo o idioma atual
      const currentLang = i18n.language.split('-')[0] || 'pt';
      
      // Criando o objeto da nova comunidade com estrutura multilíngue
      const newCommunity = {
        name: { [currentLang]: formData.name },
        location: { [currentLang]: formData.location },
        description: { [currentLang]: formData.description },
        fullDescription: { [currentLang]: formData.fullDescription },
        traditions: { [currentLang]: formData.traditions },
        religion: { [currentLang]: formData.religion },
        festival_date: { [currentLang]: formData.festival_date },
        coordinates: coordinates,
        image: optimizedCoverImage,
        gallery: optimizedGalleryImages
      };
      
      console.log('Verificando existência de comunidades similares...');
      // Verifica se a comunidade já existe
      const existingCommunities = await fetchAllCommunities([]);
      if (communityExists(newCommunity, existingCommunities)) {
        console.error('Erro de duplicidade: Comunidade similar já existe', {
          newCommunity: {
            name: newCommunity.name,
            coordinates: newCommunity.coordinates
          },
          existingCount: existingCommunities.length
        });
        throw new Error(t('communities.duplicateCommunityError') || 'Uma comunidade similar já existe no mapa.');
      }
      
      console.log('Salvando nova comunidade...');
      // Salva a comunidade usando o serviço de comunidades
      // Este serviço tenta salvar na API primeiro e, se falhar, salva localmente
      await saveCommunity(newCommunity);
      
      console.log('Comunidade cadastrada com sucesso!');
      alert(t('communities.registerSuccess'));
      
      // Fecha o modal após o envio
      onClose();
    } catch (error) {
      // Log detalhado no console para desenvolvedores
      console.error('Erro ao cadastrar comunidade:', {
        message: error.message,
        stack: error.stack,
        formState: {
          activeTab,
          hasCoordinates: !!coordinates,
          hasCoverImage: !!coverImage,
          galleryImagesCount: galleryImages.length
        }
      });
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const removeGalleryImage = (index) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };
  
  if (!isOpen) return null;
  
  const tabs = [
    { id: 'info', label: t('communities.basicInfoTab') },
    { id: 'location', label: t('communities.locationTab') },
    { id: 'images', label: t('communities.imagesTab') },
    { id: 'details', label: t('communities.detailsTab') },
  ];

  return (
    <RegisterModal>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            {t('communities.registerTitle')}
          </ModalTitle>
          <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        </ModalHeader>
        
        <TabsContainer>
          {tabs.map(tab => (
            <Tab 
              key={tab.id}
              active={activeTab === tab.id} 
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Tab>
          ))}
        </TabsContainer>
        
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            {activeTab === 'info' && (
              <>
                <FieldGroup>
                  <FormGroup>
                    <label>{t('communities.nameLabel')}</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={t('communities.namePlaceholder')}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>{t('communities.locationLabel')}</label>
                    <Input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder={t('communities.locationPlaceholder')}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>{t('communities.shortDescLabel')}</label>
                    <TextArea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder={t('communities.shortDescPlaceholder')}
                      rows={3}
                      required
                    />
                  </FormGroup>
                </FieldGroup>
              </>
            )}
            
            {activeTab === 'location' && (
              <MapSelectorContainer>
                <h3>{t('communities.selectLocationTitle')}</h3>
                <p>{t('communities.selectLocationDesc')}</p>
                
                {coordinates && (
                  <CoordinatesDisplay>
                    <p>{t('communities.coordsSelected')} {coordinates ? `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}` : '-'}</p>
                  </CoordinatesDisplay>
                )}
                
                <div style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                  <MapContainer
                    center={corumbaCoordinates}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationSelector 
                      onSelectLocation={(coords) => setCoordinates(coords)}
                      initialPosition={coordinates}
                    />
                  </MapContainer>
                </div>
              </MapSelectorContainer>
            )}
            
            {activeTab === 'images' && (
              <>
                <FormGroup>
                  <label>{t('communities.coverImageLabel')}</label>
                  <ImageUploadArea onClick={() => fileInputRef.current?.click()}>
                    {coverImage ? (
                      <ImagePreview>
                        <img src={coverImage} alt="Preview" />
                        <button type="button" onClick={() => setCoverImage(null)}>{t('communities.removeButton')}</button>
                      </ImagePreview>
                    ) : (
                      <div className="upload-placeholder">
                        <span>{t('communities.uploadCoverText')}</span>
                        <small>{t('communities.formatsAccepted')}</small>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleCoverImageUpload}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </ImageUploadArea>
                </FormGroup>
                
                <FormGroup>
                  <label>{t('communities.galleryLabel')}</label>
                  <ImageUploadArea onClick={() => galleryInputRef.current?.click()}>
                    <div className="upload-placeholder">
                      <span>{t('communities.uploadGalleryText')}</span>
                      <small>{t('communities.multipleImagesText')}</small>
                    </div>
                    <input
                      type="file"
                      ref={galleryInputRef}
                      onChange={handleGalleryUpload}
                      accept="image/*"
                      multiple
                      style={{ display: 'none' }}
                    />
                    
                    {galleryImages.length > 0 && (
                      <div className="gallery-preview">
                        {galleryImages.map((img, index) => (
                          <ImagePreview key={index}>
                            <img src={img} alt={`Gallery ${index + 1}`} />
                            <button type="button" onClick={() => removeGalleryImage(index)}>{t('communities.removeButton')}</button>
                          </ImagePreview>
                        ))}
                      </div>
                    )}
                  </ImageUploadArea>
                </FormGroup>
              </>
            )}
            
            {activeTab === 'details' && (
              <>
                <FieldGroup>
                  <FormGroup>
                    <label>{t('communities.fullDescLabel')}</label>
                    <TextArea
                      value={formData.fullDescription}
                      onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                      placeholder={t('communities.fullDescPlaceholder')}
                      rows={5}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>{t('communities.traditionsLabel')}</label>
                    <TextArea
                      value={formData.traditions}
                      onChange={(e) => handleInputChange('traditions', e.target.value)}
                      placeholder={t('communities.traditionsPlaceholder')}
                      rows={3}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>{t('communities.religionLabel')}</label>
                    <Input
                      type="text"
                      value={formData.religion}
                      onChange={(e) => handleInputChange('religion', e.target.value)}
                      placeholder={t('communities.religionPlaceholder')}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>{t('communities.festivalDateLabel')}</label>
                    <Input
                      type="text"
                      value={formData.festival_date}
                      onChange={(e) => handleInputChange('festival_date', e.target.value)}
                      placeholder={t('communities.festivalDatePlaceholder')}
                    />
                  </FormGroup>
                </FieldGroup>
              </>
            )}
            
            <FormActions>
              {activeTab !== 'info' && (
                <button 
                  type="button" 
                  className="back-button"
                  onClick={() => {
                    const tabs = ['info', 'location', 'images', 'details'];
                    const currentIndex = tabs.indexOf(activeTab);
                    setActiveTab(tabs[currentIndex - 1]);
                  }}
                >
                  {t('communities.backButton')}
                </button>
              )}
              
              {activeTab !== 'details' ? (
                <button
                  type="button"
                  className="next-button"
                  onClick={() => {
                    const tabs = ['info', 'location', 'images', 'details'];
                    const currentIndex = tabs.indexOf(activeTab);
                    setActiveTab(tabs[currentIndex + 1]);
                  }}
                >
                  {t('communities.nextButton')}
                </button>
              ) : (
                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? t('communities.processingButton') : t('communities.submitButton')}
                </SubmitButton>
              )}
            </FormActions>
            
            {submitError && (
              <div style={{
                backgroundColor: '#ffebee',
                color: '#c62828',
                padding: '12px 16px',
                borderRadius: '8px',
                marginTop: '20px',
                fontSize: '0.9rem',
                borderLeft: '4px solid #c62828'
              }}>
                <strong>{t('communities.errorTitle')}</strong> {submitError}
              </div>
            )}
          </Form>
        </ModalBody>
      </ModalContent>
    </RegisterModal>
  );
};

export default RegisterCommunityModal;
