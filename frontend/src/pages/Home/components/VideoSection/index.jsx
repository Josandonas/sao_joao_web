import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { 
  VideoSectionContainer, 
  VideoCard,
  VideoWrapper, 
  PlayButton, 
  VideoTitle,
  VideoDescription,
  YearSelector
} from './styles';
import { FaPlay, FaCalendarAlt } from 'react-icons/fa';
import useVideoGallery from './hooks/useVideoGallery';

/**
 * Componente que exibe um vídeo opcional entre seções
 * O vídeo só será reproduzido se o usuário clicar no botão de play
 */
const VideoSection = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const videoRef = useRef(null);
  
  const {
    availableYears,
    selectedYear,
    videoPath,
    loading,
    yearsLoading,
    showYearSelector,
    selectYear
  } = useVideoGallery();

  // O caminho do vídeo agora é gerenciado pelo hook useVideoGallery

  // Função para iniciar a reprodução do vídeo
  const startVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPlayButton(false);
      
      // Habilita os controles padrão do vídeo após o primeiro clique
      videoRef.current.controls = true;
    }
  };

  // Função para lidar com o fim do vídeo
  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowPlayButton(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <VideoSectionContainer>
      <VideoCard>
        <div className={`video-header ${!showYearSelector ? 'centered' : ''}`}>
          <VideoTitle>{t('home.video.title', 'Conheça o Banho de São João')}</VideoTitle>
          
          {/* Dropdown para seleção de ano - visível apenas quando houver mais de um ano disponível */}
          {showYearSelector && (
          <YearSelector>
            <Dropdown onSelect={(eventKey) => selectYear(Number(eventKey))}>
              <Dropdown.Toggle variant="outline-primary" id="video-year-dropdown" disabled={yearsLoading}>
                <FaCalendarAlt /> {selectedYear || t('home.video.yearSelector', 'Selecione o ano')}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {availableYears.map(year => (
                  <Dropdown.Item key={year} eventKey={year} active={year === selectedYear}>
                    {year}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </YearSelector>
          )}
        </div>
        
        <VideoDescription>
          {t('home.video.description', 'Clique no botão para assistir ao vídeo sobre esta tradicional celebração pantaneira')}
        </VideoDescription>
        
        <VideoWrapper>
          {loading ? (
            <div className="video-loading">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">{t('common.loading', 'Carregando...')}</span>
              </div>
            </div>
          ) : (
            <>
              <video 
                ref={videoRef}
                src={videoPath}
                onEnded={handleVideoEnd}
                poster={`${PUBLIC_URL}/assets/videos/intro/capa.gif`}
                // Controles inicialmente ocultos, serão habilitados após o primeiro clique
                controls={!showPlayButton}
              />
              
              {/* Botão de play central - visível apenas antes de iniciar o vídeo */}
              {showPlayButton && (
                <PlayButton 
                  onClick={startVideo} 
                  aria-label={t('common.play', 'Reproduzir')}
                >
                  <FaPlay />
                </PlayButton>
              )}
            </>
          )}
        </VideoWrapper>
      </VideoCard>
    </VideoSectionContainer>
  );
};

export default VideoSection;
