import React from 'react';
import { useTranslation } from 'react-i18next';
import { FooterContainer, FooterContent, Copyright, Partners, PrefeituraLogo } from './styles';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          &copy; {currentYear} {t('app.name')} - {t('footer.rights')}
        </Copyright>
        
        <Partners>
          <a href="https://www.corumba.ms.gov.br" target="_blank" rel="noopener noreferrer">
            <PrefeituraLogo 
              src="/assets/images/colaborates/prefeitura_corumba.png" 
              alt="Prefeitura de Corumbá" 
              title="Prefeitura de Corumbá" 
            />
          </a>
        </Partners>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
