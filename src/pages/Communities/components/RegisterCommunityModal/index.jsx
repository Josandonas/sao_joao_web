import React, { useState, useRef, useCallback } from 'react';
import { saveCommunity, processImage } from '../../services/communityService';
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
  CoordinatesDisplay
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

// Componente auxiliar para as abas de idioma
const LanguageTabGroup = ({ activeTab, setActiveTab, t }) => (
  <LanguageTabs>
    <LanguageTab 
      active={activeTab === 'pt'} 
      onClick={() => setActiveTab('pt')}
    >
      {t('languageSelector.portuguese')}
    </LanguageTab>
    <LanguageTab 
      active={activeTab === 'en'} 
      onClick={() => setActiveTab('en')}
    >
      {t('languageSelector.english')}
    </LanguageTab>
    <LanguageTab 
      active={activeTab === 'es'} 
      onClick={() => setActiveTab('es')}
    >
      {t('languageSelector.spanish')}
    </LanguageTab>
  </LanguageTabs>
);

const RegisterCommunityModal = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  
  // Função auxiliar para renderizar as abas de idioma
  const renderLanguageTabs = useCallback((activeLangTab, setActiveLangTab) => (
    <LanguageTabs>
      <LanguageTab 
        active={activeLangTab === 'pt'} 
        onClick={() => setActiveLangTab('pt')}
      >
        {t('languageSelector.portuguese')}
      </LanguageTab>
      <LanguageTab 
        active={activeLangTab === 'en'} 
        onClick={() => setActiveLangTab('en')}
      >
        {t('languageSelector.english')}
      </LanguageTab>
      <LanguageTab 
        active={activeLangTab === 'es'} 
        onClick={() => setActiveLangTab('es')}
      >
        {t('languageSelector.spanish')}
      </LanguageTab>
    </LanguageTabs>
  ), [t]);
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const currentLang = i18n.language.split('-')[0] || 'pt';
  
  const [activeTab, setActiveTab] = useState('info');
  const [activeLangTab, setActiveLangTab] = useState(currentLang);
  const [coordinates, setCoordinates] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  
  const [formData, setFormData] = useState({
    name: { pt: '', en: '', es: '' },
    location: { pt: '', en: '', es: '' },
    description: { pt: '', en: '', es: '' },
    fullDescription: { pt: '', en: '', es: '' },
    traditions: { pt: '', en: '', es: '' },
    religion: { pt: '', en: '', es: '' },
    festival_date: { pt: '', en: '', es: '' }
  });
  
  // Coordenadas do centro de Corumbá - MS
  const corumbaCoordinates = [-19.0095, -57.6511];
  
  const handleInputChange = (field, language, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [language]: value
      }
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
      if (!formData.name.pt || !formData.description.pt || !coordinates || !coverImage) {
        throw new Error(t('communities.requiredFieldsError'));
      }
      
      // Processa a imagem de capa para otimização
      const optimizedCoverImage = await processImage(coverImage);
      
      // Processa imagens da galeria
      const optimizedGalleryImages = [];
      for (const image of galleryImages) {
        const optimizedImage = await processImage(image);
        optimizedGalleryImages.push(optimizedImage);
      }
      
      // Criando o objeto da nova comunidade
      const newCommunity = {
        name: formData.name,
        location: formData.location,
        description: formData.description,
        fullDescription: formData.fullDescription,
        traditions: formData.traditions,
        religion: formData.religion,
        festival_date: formData.festival_date,
        coordinates: coordinates,
        image: optimizedCoverImage,
        gallery: optimizedGalleryImages
      };
      
      // Salva a comunidade usando o serviço
      await saveCommunity(newCommunity);
      
      alert(t('communities.registerSuccess'));
      
      // Fecha o modal após o envio
      onClose();
    } catch (error) {
      console.error('Erro ao cadastrar comunidade:', error);
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
                <LanguageTabs>
                  <LanguageTab 
                    active={activeLangTab === 'pt'} 
                    onClick={() => setActiveLangTab('pt')}
                  >
                    Português
                  </LanguageTab>
                  <LanguageTab 
                    active={activeLangTab === 'en'} 
                    onClick={() => setActiveLangTab('en')}
                  >
                    English
                  </LanguageTab>
                  <LanguageTab 
                    active={activeLangTab === 'es'} 
                    onClick={() => setActiveLangTab('es')}
                  >
                    Español
                  </LanguageTab>
                </LanguageTabs>
                
                <FieldGroup>
                  <FormGroup>
                    <label>{t('communities.nameLabel')}</label>
                    <Input
                      type="text"
                      value={formData.name[activeLangTab]}
                      onChange={(e) => handleInputChange('name', activeLangTab, e.target.value)}
                      placeholder={t('communities.namePlaceholder')}
                      required={activeLangTab === 'pt'}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>{t('communities.locationLabel')}</label>
                    <Input
                      type="text"
                      value={formData.location[activeLangTab]}
                      onChange={(e) => handleInputChange('location', activeLangTab, e.target.value)}
                      placeholder={t('communities.locationPlaceholder')}
                      required={activeLangTab === 'pt'}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>{t('communities.shortDescLabel')}</label>
                    <TextArea
                      value={formData.description[activeLangTab]}
                      onChange={(e) => handleInputChange('description', activeLangTab, e.target.value)}
                      placeholder={t('communities.shortDescPlaceholder')}
                      rows={3}
                      required={activeLangTab === 'pt'}
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
                <LanguageTabs>
                  <LanguageTab 
                    active={activeLangTab === 'pt'} 
                    onClick={() => setActiveLangTab('pt')}
                  >
                    Português
                  </LanguageTab>
                  <LanguageTab 
                    active={activeLangTab === 'en'} 
                    onClick={() => setActiveLangTab('en')}
                  >
                    English
                  </LanguageTab>
                  <LanguageTab 
                    active={activeLangTab === 'es'} 
                    onClick={() => setActiveLangTab('es')}
                  >
                    Español
                  </LanguageTab>
                </LanguageTabs>
                
                <FieldGroup>
                  <FormGroup>
                    <label>{t('communities.fullDescLabel')}</label>
                    <TextArea
                      value={formData.fullDescription[activeLangTab]}
                      onChange={(e) => handleInputChange('fullDescription', activeLangTab, e.target.value)}
                      placeholder={t('communities.fullDescPlaceholder')}
                      rows={5}
                      required={activeLangTab === 'pt'}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>{t('communities.traditionsLabel')}</label>
                    <TextArea
                      value={formData.traditions[activeLangTab]}
                      onChange={(e) => handleInputChange('traditions', activeLangTab, e.target.value)}
                      placeholder={t('communities.traditionsPlaceholder')}
                      rows={3}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>{t('communities.religionLabel')}</label>
                    <Input
                      type="text"
                      value={formData.religion[activeLangTab]}
                      onChange={(e) => handleInputChange('religion', activeLangTab, e.target.value)}
                      placeholder={t('communities.religionPlaceholder')}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label>{t('communities.festivalDateLabel')}</label>
                    <Input
                      type="text"
                      value={formData.festival_date[activeLangTab]}
                      onChange={(e) => handleInputChange('festival_date', activeLangTab, e.target.value)}
                      placeholder={t('communities.festivalDatePlaceholder')}
                    />
                  </FormGroup>
                </FieldGroup>
              </>
            )}
            
            <div className="form-actions">
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
            </div>
            
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
