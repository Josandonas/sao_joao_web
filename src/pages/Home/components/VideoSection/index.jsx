import React, { useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  VideoSectionContainer, 
  VideoCard,
  VideoWrapper, 
  PlayButton, 
  VideoTitle,
  VideoDescription
} from './styles';
import { FaPlay } from 'react-icons/fa';

/**
 * Componente que exibe um vídeo opcional entre seções
 * O vídeo só será reproduzido se o usuário clicar no botão de play
 */
const VideoSection = () => {
  const { t, i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const videoRef = useRef(null);

  // Define o caminho do vídeo com base no idioma atual
  const videoPath = useMemo(() => {
    const currentLanguage = i18n.language;
    
    switch(currentLanguage) {
      case 'en':
        return `${PUBLIC_URL}/assets/videos/intro/institucional-en.mp4`;
      case 'es':
        return `${PUBLIC_URL}/assets/videos/intro/institucional-es.mp4`;
      case 'pt':
      default:
        return `${PUBLIC_URL}/assets/videos/intro/institucional-pt.mp4`;
    }
  }, [i18n.language]);

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
        <VideoTitle>{t('home.video.title', 'Conheça o Banho de São João')}</VideoTitle>
        <VideoDescription>
          {t('home.video.description', 'Clique no botão para assistir ao vídeo sobre esta tradicional celebração pantaneira')}
        </VideoDescription>
        
        <VideoWrapper>
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
        </VideoWrapper>
      </VideoCard>
    </VideoSectionContainer>
  );
};

export default VideoSection;
