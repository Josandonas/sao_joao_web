import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  HeroSection,
  HeroContent,
  Title,
  Subtitle,
  ExploreButton
} from './styles';

/**
 * Componente Hero para a seção inicial/banner da página Home
 * @param {Object} props - Propriedades do componente
 * @param {string} props.lang - Código do idioma atual
 */
const Hero = ({ lang }) => {
  const { t } = useTranslation();

  return (
    <HeroSection>
      <HeroContent>
        <Title>{t('home.welcome')}</Title>
        <Subtitle>{t('home.subtitle')}</Subtitle>
        <ExploreButton as={Link} to={`/${lang}/stories`}>
          {t('home.exploreButton')}
        </ExploreButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
