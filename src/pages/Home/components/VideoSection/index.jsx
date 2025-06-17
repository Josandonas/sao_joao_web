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
import { FaPlay, FaPause } from 'react-icons/fa';

/**
 * Componente que exibe um vídeo opcional entre seções
 * O vídeo só será reproduzido se o usuário clicar no botão de play
 */
const VideoSection = () => {
  const { t, i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Define o caminho do vídeo com base no idioma atual
  const videoPath = useMemo(() => {
    const currentLanguage = i18n.language;
    
    switch(currentLanguage) {
      case 'en':
        return "/assets/videos/intro/institucional-en.mp4";
      case 'es':
        return "/assets/videos/intro/institucional-es.mp4";
      case 'pt':
      default:
        return "/assets/videos/intro/institucional-pt.mp4";
    }
  }, [i18n.language]);

  // Função para alternar entre play e pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Função para lidar com o fim do vídeo
  const handleVideoEnd = () => {
    setIsPlaying(false);
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
            poster="/assets/videos/intro/capa.png"
          />
          <PlayButton onClick={togglePlay} aria-label={isPlaying ? t('common.pause', 'Pausar') : t('common.play', 'Reproduzir')}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </PlayButton>
        </VideoWrapper>
      </VideoCard>
    </VideoSectionContainer>
  );
};

export default VideoSection;
