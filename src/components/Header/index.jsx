import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BiGlobe } from 'react-icons/bi';
import { HeaderContainer, HeaderContent, Navigation, NavItem, LanguageSelector, LanguageButton, NavButton, LanguageDropdown, LanguageOption, GlobeIcon } from './styles';
const Header = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Função para obter o nome do idioma por extenso
  const getLanguageLabel = (code) => {
    switch(code) {
      case 'pt': return 'Português';
      case 'en': return 'English';
      case 'es': return 'Español';
      default: return 'Português';
    }
  };
  
  // Alterna entre os idiomas disponíveis mantendo a página atual
  const handleLanguageChange = (newLang) => {
    if (lang === newLang) {
      setDropdownOpen(false);
      return;
    }
    
    const currentPath = location.pathname;
    const newPath = currentPath.replace(`/${lang}`, `/${newLang}`);
    window.location.href = newPath;
  };
  
  // Fecha o dropdown quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <HeaderContainer>      
      <HeaderContent>
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
          <Link to={`/${lang}/postcards`} className={location.pathname.includes('/postcards') ? 'active' : ''}>
            {t('navigation.postcards')}
          </Link>
        </NavItem>
        <NavItem>
          <Link to={`/${lang}/testimonials`} className={location.pathname.includes('/testimonials') ? 'active' : ''}>
            {t('navigation.testimonials')}
          </Link>
        </NavItem>

        <NavItem>
          <NavButton to={`/${lang}/biblioteca`} className={location.pathname.includes('/biblioteca') ? 'active' : ''}>
            Biblioteca
          </NavButton>
        </NavItem>
        <NavItem>
          <NavButton to={`/${lang}/programacao`} className={location.pathname.includes('/programacao') ? 'active' : ''}>
            {(() => {
              const programText = t('navigation.programacao');
              const parts = programText.split(' ');
              if (parts.length >= 2) {
                return (
                  <>
                    <span>{parts[0]}</span>
                    <br />
                    <span>{parts[1]}</span>
                  </>
                );
              } else {
                return programText;
              }
            })()}
          </NavButton>
        </NavItem>
        </Navigation>
        
        <LanguageSelector>
          <div className="language-dropdown-container">
            <GlobeIcon onClick={() => setDropdownOpen(!dropdownOpen)} ref={dropdownRef}>
              <BiGlobe size={18} />
              <span>{getLanguageLabel(lang)}</span>
            </GlobeIcon>
            
            <LanguageDropdown className={dropdownOpen ? 'open' : ''}>
              <LanguageOption 
                onClick={() => handleLanguageChange('pt')} 
                className={lang === 'pt' ? 'active' : ''}
              >
                Português
              </LanguageOption>
              <LanguageOption 
                onClick={() => handleLanguageChange('en')} 
                className={lang === 'en' ? 'active' : ''}
              >
                English
              </LanguageOption>
              <LanguageOption 
                onClick={() => handleLanguageChange('es')} 
                className={lang === 'es' ? 'active' : ''}
              >
                Español
              </LanguageOption>
            </LanguageDropdown>
          </div>
        </LanguageSelector>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
