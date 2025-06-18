import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BiGlobe } from 'react-icons/bi';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { HeaderContainer, HeaderContent, Navigation, NavItem, LanguageSelector, LanguageButton, NavButton, LanguageDropdown, LanguageOption, GlobeIcon } from './styles';
const Header = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
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

  // Controlar a classe do body quando o menu mobile está aberto/fechado
  useEffect(() => {
    if (menuExpanded) {
      document.body.classList.add('navbar-open');
    } else {
      document.body.classList.remove('navbar-open');
    }
  }, [menuExpanded]);

  return (
    <HeaderContainer>
      <Container fluid>
        <Navbar expand="lg" className="py-2 navbar-dark mobile-menu-custom" expanded={menuExpanded}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto me-2 border-0 custom-toggler" onClick={() => setMenuExpanded(!menuExpanded)} />
          <Navbar.Collapse id="basic-navbar-nav" className="mt-2 mt-lg-0 mobile-menu-collapse">
            <Nav className="mx-auto justify-content-between w-100">
              <NavItem className="nav-item-mobile">
                <Link to={`/${lang}`} className={location.pathname === `/${lang}` ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.home')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile">
                <Link to={`/${lang}/stories`} className={location.pathname.includes('/stories') ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.stories')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile">
                <Link to={`/${lang}/communities`} className={location.pathname.includes('/communities') ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.communities')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile">
                <Link to={`/${lang}/book`} className={location.pathname.includes('/book') ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.book')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile">
                <Link to={`/${lang}/postcards`} className={location.pathname.includes('/postcards') ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.postcards')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile">
                <Link to={`/${lang}/testimonials`} className={location.pathname.includes('/testimonials') ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.testimonials')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile">
                <Link to={`/${lang}/biblioteca`} className={location.pathname.includes('/biblioteca') ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.biblioteca', 'Biblioteca')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile">
                <Link to={`/${lang}/programacao`} className={location.pathname.includes('/programacao') ? 'active d-flex align-items-center programacao-item' : 'd-flex align-items-center programacao-item'}>
                  {t('navigation.programacao')}
                </Link>
              </NavItem>
            </Nav>
            
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
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
