import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderContainer, Title, Description } from '../styles/ProgramacaoHeader.styles';

/**
 * Componente de cabeçalho para a página de Programação Oficial
 * @returns {JSX.Element} - Componente renderizado
 */
const ProgramacaoHeader = () => {
  const { t } = useTranslation();
  
  return (
    <HeaderContainer>
      <Title>{t('programacao.title', 'Programação Oficial')}</Title>
      <Description>
        {t('programacao.description', 'Confira a programação completa do Banho de São João, com todas as atividades, shows e eventos culturais previstos para a celebração.')}
      </Description>
    </HeaderContainer>
  );
};

export default ProgramacaoHeader;
