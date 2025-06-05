import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeaderContainer, Logo, Navigation, NavItem, LanguageSelector, LanguageButton, NavContainer } from './styles';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  
  // Alterna entre os idiomas disponíveis mantendo a página atual
  const changeLanguage = (newLang) => {
    if (lang === newLang) return;
    
    const currentPath = location.pathname;
    const newPath = currentPath.replace(`/${lang}`, `/${newLang}`);
    window.location.href = newPath;
  };
  
  return (
    <HeaderContainer>
      <Logo>
        <Link to={`/${lang}`}>
          {/* Logo sem texto */}
        </Link>
      </Logo>
      
      <NavContainer>
        <Navigation>
          <NavItem>
            <Link to={`/${lang}`} className={location.pathname === `/${lang}` ? 'active' : ''}>
              {t('navigation.home')}
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/${lang}/stories`} className={location.pathname.includes('/stories') ? 'active' : ''}>
              {t('navigation.stories')}
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/${lang}/communities`} className={location.pathname.includes('/communities') ? 'active' : ''}>
              {t('navigation.communities')}
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/${lang}/book`} className={location.pathname.includes('/book') ? 'active' : ''}>
              {t('navigation.book')}
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/${lang}/testimonials`} className={location.pathname.includes('/testimonials') ? 'active' : ''}>
              {t('navigation.testimonials')}
            </Link>
          </NavItem>
          <NavItem>
            <Link to={`/${lang}/postcards`} className={location.pathname.includes('/postcards') ? 'active' : ''}>
              {t('navigation.postcards')}
            </Link>
          </NavItem>
        </Navigation>
        
        <LanguageSelector>
          <LanguageButton 
            onClick={() => changeLanguage('pt')} 
            className={lang === 'pt' ? 'active' : ''}
            title="Português"
          >
            PT
          </LanguageButton>
          <LanguageButton 
            onClick={() => changeLanguage('en')} 
            className={lang === 'en' ? 'active' : ''}
            title="English"
          >
            EN
          </LanguageButton>
          <LanguageButton 
            onClick={() => changeLanguage('es')} 
            className={lang === 'es' ? 'active' : ''}
            title="Español"
          >
            ES
          </LanguageButton>
        </LanguageSelector>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
