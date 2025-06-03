import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Player, BigPlayButton, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';
import { Container, Content, VideoWrapper, ActionButtons, Button } from './styles';

const Intro = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);
  
  // Mapeia o caminho do vídeo baseado no idioma selecionado usando os arquivos reais migrados
  const videoSources = {
    pt: '/assets/videos/intro/introducao-c.mp4',
    en: '/assets/videos/intro/introducao-en.mp4',
    es: '/assets/videos/intro/introducao-es.mp4'
  };
  
  const handleVideoEnd = () => {
    setVideoEnded(true);
  };
  
  const replayVideo = () => {
    if (playerRef.current) {
      playerRef.current.seek(0);
      playerRef.current.play();
      setVideoEnded(false);
    }
  };
  
  const skipToHome = () => {
    navigate(`/${lang}`);
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <Player
            ref={playerRef}
            autoPlay
            fluid={false}
            width="100%"
            height={500}
            onEnded={handleVideoEnd}
          >
            <source src={videoSources[lang] || videoSources.pt} />
            <BigPlayButton position="center" />
            <ControlBar autoHide={true} />
          </Player>
        </VideoWrapper>
        
        <ActionButtons videoEnded={videoEnded}>
          <Button primary onClick={skipToHome}>
            {t('intro.skipIntro')}
          </Button>
          
          <Button onClick={replayVideo}>
            {t('intro.watchAgain')}
          </Button>
        </ActionButtons>
      </Content>
    </Container>
  );
};

export default Intro;
