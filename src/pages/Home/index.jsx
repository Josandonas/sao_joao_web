import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { 
  Container, 
  HeroSection, 
  HeroContent, 
  Title, 
  Subtitle,
  ExploreButton,
  FeaturesSection,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  AboutSection,
  AboutContainer,
  AboutTitle,
  AboutContent,
  AboutImage,
  AboutText,
  AboutParagraph,
  AboutSignature,
  TextControls,
  TextControlButton,
  Divider
} from './styles';

const Home = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const [fontSize, setFontSize] = useState(16); // Estado para o tamanho da fonte

  // Funções para aumentar e diminuir o tamanho da fonte
  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));

  // Array de features para renderizar dinamicamente com os assets reais migrados
  const features = [
    {
      id: 'stories',
      icon: '/assets/images/ui/btn-conte-sua-historia.png',
      title: t('navigation.stories'),
      description: t('home.features.stories'),
      link: `/${lang}/stories`
    },
    {
      id: 'communities',
      // Usa o botão de comunidade apropriado para o idioma atual
      icon: `/assets/images/ui/btn-comunidade-${lang === 'pt' ? 'c' : lang}.png`,
      title: t('navigation.communities'),
      description: t('home.features.communities'),
      link: `/${lang}/communities`
    },
    {
      id: 'book',
      icon: '/assets/images/ui/titulo_deco.png',
      title: t('navigation.book'),
      description: t('home.features.book'),
      link: `/${lang}/book`
    },
    {
      id: 'testimonials',
      icon: '/assets/images/ui/titulo_deco2.png',
      title: t('navigation.testimonials'),
      description: t('home.features.testimonials'),
      link: `/${lang}/testimonials`
    },
    {
      id: 'postcards',
      icon: '/assets/images/ui/logomarcas.png',
      title: t('navigation.postcards'),
      description: t('home.features.postcards'),
      link: `/${lang}/postcards`
    }
  ];

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title>{t('home.welcome')}</Title>
          <Subtitle>{t('home.subtitle')}</Subtitle>
          <ExploreButton as={Link} to={`/${lang}/stories`}>
            {t('home.exploreButton')}
          </ExploreButton>
        </HeroContent>
      </HeroSection>

      <AboutSection>
        <AboutContainer>
          <AboutTitle>{t('home.about.title')}</AboutTitle>
          
          <TextControls>
            <TextControlButton onClick={increaseFontSize} aria-label="Aumentar texto">
              A+
            </TextControlButton>
            <TextControlButton onClick={decreaseFontSize} aria-label="Diminuir texto">
              A-
            </TextControlButton>
          </TextControls>
          
          <AboutContent>
            <AboutImage src="/assets/images/home-porto.jpg" alt="Porto de Corumbá" />
            <AboutText style={{ fontSize: `${fontSize}px` }}>
              <AboutParagraph>{t('home.about.paragraph1')}</AboutParagraph>
              <AboutParagraph>{t('home.about.paragraph2')}</AboutParagraph>
              <AboutParagraph>{t('home.about.paragraph3')}</AboutParagraph>
              <AboutParagraph>{t('home.about.paragraph4')}</AboutParagraph>
              <AboutSignature>
                {t('home.about.curator')}
                <br />
                <span>{t('home.about.curatorTitle')}</span>
              </AboutSignature>
            </AboutText>
          </AboutContent>
        </AboutContainer>
      </AboutSection>

      <Divider />

      <FeaturesSection>
        {features.map(feature => (
          <FeatureCard key={feature.id} to={feature.link}>
            <FeatureIcon src={feature.icon} alt={feature.title} />
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesSection>
    </Container>
  );
};

export default Home;
