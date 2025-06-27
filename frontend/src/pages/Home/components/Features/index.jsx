import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FeaturesSection,
  FeatureCard,
  FeatureIconWrapper,
  FeatureTitle,
  FeatureDescription
} from './styles';

// Importando ícones necessários
import { BsBookHalf, BsChatQuote } from 'react-icons/bs';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoBook, IoMail } from 'react-icons/io5';

/**
 * Componente para renderizar o ícone correto com base no tipo
 * @param {string} iconType - Tipo de ícone a ser renderizado
 * @returns {React.ReactElement} O ícone correspondente
 */
const IconRenderer = ({ iconType }) => {
  const iconProps = { size: 36 };

  switch (iconType) {
    case 'BsBookHalf':
      return <BsBookHalf {...iconProps} />;
    case 'FaPeopleGroup':
      return <FaPeopleGroup {...iconProps} />;
    case 'IoBook':
      return <IoBook {...iconProps} />;
    case 'BsChatQuote':
      return <BsChatQuote {...iconProps} />;
    case 'IoMail':
      return <IoMail {...iconProps} />;
    default:
      return <BsBookHalf {...iconProps} />;
  }
};

/**
 * Componente para exibir os recursos/funcionalidades da aplicação
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.features - Lista de recursos/funcionalidades para exibir
 */
const Features = ({ features }) => {
  return (
    <FeaturesSection className="pb-5 mb-0">
      {features.map(feature => (
        <FeatureCard key={feature.id} to={feature.link}>
          <FeatureIconWrapper>
            <IconRenderer iconType={feature.iconType} />
          </FeatureIconWrapper>
          <FeatureTitle>{feature.title}</FeatureTitle>
          <FeatureDescription>{feature.description}</FeatureDescription>
        </FeatureCard>
      ))}
    </FeaturesSection>
  );
};

export default Features;
