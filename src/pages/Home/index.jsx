import React from 'react';
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
  FeatureDescription
} from './styles';

const Home = () => {
  const { t } = useTranslation();
  const { lang } = useParams();

  // Array de features para renderizar dinamicamente com os assets reais migrados
  const features = [
    {
      id: 'stories',
      icon: '/assets/images/ui/btn-conte-sua-historia.png',
      title: t('navigation.stories'),
      description: 'Conheça histórias e lendas sobre as tradições de São João.',
      link: `/${lang}/stories`
    },
    {
      id: 'communities',
      // Usa o botão de comunidade apropriado para o idioma atual
      icon: `/assets/images/ui/btn-comunidade-${lang === 'pt' ? 'c' : lang}.png`,
      title: t('navigation.communities'),
      description: 'Descubra comunidades que celebram estas tradições.',
      link: `/${lang}/communities`
    },
    {
      id: 'book',
      icon: '/assets/images/ui/titulo_deco.png',
      title: t('navigation.book'),
      description: 'Explore o livro digital sobre as festas de São João.',
      link: `/${lang}/book`
    },
    {
      id: 'testimonials',
      icon: '/assets/images/ui/titulo_deco2.png',
      title: t('navigation.testimonials'),
      description: 'Assista depoimentos de pessoas que vivem estas tradições.',
      link: `/${lang}/testimonials`
    },
    {
      id: 'postcards',
      icon: '/assets/images/ui/logomarcas.png',
      title: t('navigation.postcards'),
      description: 'Envie um cartão postal virtual para seus amigos.',
      link: `/${lang}/postcards`
    }
  ];

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title>{t('home.welcome')}</Title>
          <Subtitle>{t('home.description')}</Subtitle>
          <ExploreButton as={Link} to={`/${lang}/stories`}>
            {t('home.exploreButton')}
          </ExploreButton>
        </HeroContent>
      </HeroSection>

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
