import React from 'react';
import { useTranslation } from 'react-i18next';
import { FooterContainer, FooterContent, Copyright, Boss, PrefeituraLogo, FundaCulturaLogo, Parteners } from './styles';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Boss>
          <a href="https://www.corumba.ms.gov.br" target="_blank" rel="noopener noreferrer">
            <PrefeituraLogo 
              src="/assets/images/colaborates/prefeitura_corumba.png" 
              alt="Prefeitura de Corumbá" 
              title="Prefeitura de Corumbá" 
            />
          </a>
        </Boss>

        <Copyright>
          &copy; {currentYear} {t('app.name')} - {t('footer.rights')}
        </Copyright>
        <Parteners>
          <a href="https://ww2.corumba.ms.gov.br/secretarias-e-fundacoes/fundacao-da-cultura-e-do-patrimonio-historico-de-corumba/" target="_blank" rel="noopener noreferrer">
            <FundaCulturaLogo 
              src="/assets/images/colaborates/cultura.png" 
              alt="Fundação da Cultura de Corumbá" 
              title="Fundação da Cultura de Corumbá" 
            />
          </a>
        </Parteners>  
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
