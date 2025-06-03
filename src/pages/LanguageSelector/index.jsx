import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Content, 
  Title, 
  LanguageOptions, 
  LanguageButton 
} from './styles';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const selectLanguage = (lang) => {
    i18n.changeLanguage(lang);
    // Navega para a página de introdução do idioma selecionado
    navigate(`/intro/${lang}`);
  };

  return (
    <Container>
      <Content>
        <Title>{t('languageSelector.title')}</Title>
        <LanguageOptions>
          <LanguageButton 
            id="ptbr" 
            onClick={() => selectLanguage('pt')}
            bgImage="/assets/images/locale_c.png"
          >
            {t('languageSelector.portuguese')}
          </LanguageButton>
          
          <LanguageButton 
            id="en" 
            onClick={() => selectLanguage('en')}
            bgImage="/assets/images/locale_en.png"
          >
            {t('languageSelector.english')}
          </LanguageButton>
          
          <LanguageButton 
            id="es" 
            onClick={() => selectLanguage('es')}
            bgImage="/assets/images/locale_es.png"
          >
            {t('languageSelector.spanish')}
          </LanguageButton>
        </LanguageOptions>
      </Content>
    </Container>
  );
};

export default LanguageSelector;
