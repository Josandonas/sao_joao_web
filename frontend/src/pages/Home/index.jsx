import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ContentContainer } from './styles';

// Componentes modulares
import Hero from './components/Hero';
import About from './components/About';
import VideoSection from './components/VideoSection';
import Features from './components/Features';

// Hooks e utilitários
import useFontSize from './hooks/useFontSize';
import { generateFeatures } from './utils/features';

/**
 * Página inicial da aplicação
 */
const Home = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  
  // Usar o hook personalizado para controlar o tamanho da fonte
  const fontSizeControls = useFontSize(16, 12, 24, 2);
  
  // Gerar a lista de features/recursos usando o utilitário
  const features = generateFeatures(lang, t);

  return (
      <ContentContainer>
        <Hero lang={lang} />
        <About fontSizeControls={fontSizeControls} />
        <VideoSection />
        <Features features={features} />
      </ContentContainer>
  );
};

export default Home;
