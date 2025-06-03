import React from 'react';
import { useTranslation } from 'react-i18next';
import { FooterContainer, FooterContent, Copyright, Partners, PartnerLink } from './styles';

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
          <span>{t('footer.partners')}:</span>
          <PartnerLink href="#" id="lnkVale" title="Vale">Vale</PartnerLink>
          <PartnerLink href="#" id="lnkFIC" title="FIC">FIC</PartnerLink>
          <PartnerLink href="#" id="lnkFCMS" title="FCMS">FCMS</PartnerLink>
          <PartnerLink href="#" id="lnkGOV" title="GOV">GOV</PartnerLink>
        </Partners>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
