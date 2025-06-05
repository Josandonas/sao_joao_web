import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Container } from './styles';

// Componentes modulares
import Hero from './components/Hero';
import About from './components/About';
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
    <Container>
      {/* Componente Hero com banner principal */}
      <Hero lang={lang} />

      {/* Componente About com conteúdo sobre o projeto e controles de zoom de texto */}
      <About fontSizeControls={fontSizeControls} />

      {/* Componente Features com cards de recursos da aplicação */}
      <Features features={features} />
    </Container>
  );
};

export default Home;
