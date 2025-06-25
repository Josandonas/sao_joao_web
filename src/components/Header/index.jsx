import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
// Substituímos o hook padrão pelo nosso hook otimizado
import useOptimizedTranslation from '../../hooks/useOptimizedTranslation';
import { BiGlobe } from 'react-icons/bi';
import ReactCountryFlag from 'react-country-flag';
import { Container, Navbar, Nav, NavDropdown, Spinner } from 'react-bootstrap';
import { HeaderContainer, HeaderContent, Navigation, NavItem, LanguageSelector, LanguageButton, NavButton, LanguageDropdown, LanguageOption, GlobeIcon } from './styles';
const Header = () => {
  // Usando o hook otimizado para traduções
  const { t, i18n, changeLanguage, isReady } = useOptimizedTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
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
  const handleLanguageChange = async (newLang) => {
    if (lang === newLang) {
      setDropdownOpen(false);
      return;
    }

    try {
      // Indica que está carregando o novo idioma
      setIsChangingLanguage(true);
      setDropdownOpen(false);
      
      // Pré-carrega as traduções do novo idioma usando nosso sistema de cache
      await changeLanguage(newLang);
      
      // Atualiza a URL para refletir o novo idioma
      const currentPath = location.pathname;
      const newPath = currentPath.replace(`/${lang}`, `/${newLang}`);
      window.location.href = newPath;
    } catch (error) {
      console.error('Erro ao mudar idioma:', error);
      setIsChangingLanguage(false);
    }
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
  
  // Remover o useEffect para detectar tamanho da tela, já que não precisamos mais do seletor fixo

  // Função para fechar o menu mobile quando um item é clicado
  const handleNavItemClick = () => {
    if (menuExpanded) {
      setMenuExpanded(false);
    }
  };

  return (
    <HeaderContainer>
      
      <Container fluid>
        <Navbar expand="lg" className="p-0 navbar-dark mobile-menu-custom" expanded={menuExpanded}>
          {/* Botões de idioma para mobile (ao lado do toggle) */}
          <div className="d-flex d-lg-none ms-auto me-2 align-items-center">
            <LanguageButton
              onClick={() => handleLanguageChange('pt')}
              className={lang === 'pt' ? 'active' : ''}
              title="Português"
              disabled={isChangingLanguage}
            >
              {isChangingLanguage && lang !== 'pt' ? (
                <Spinner animation="border" size="sm" className="me-1" />
              ) : (
                <ReactCountryFlag countryCode="BR" className="flag-icon" svg />
              )}{' '}
              PT
            </LanguageButton>
            <LanguageButton
              onClick={() => handleLanguageChange('en')}
              className={lang === 'en' ? 'active' : ''}
              title="English"
              disabled={isChangingLanguage}
            >
              {isChangingLanguage && lang !== 'en' ? (
                <Spinner animation="border" size="sm" className="me-1" />
              ) : (
                <ReactCountryFlag countryCode="US" className="flag-icon" svg />
              )}{' '}
              EN
            </LanguageButton>
            <LanguageButton
              onClick={() => handleLanguageChange('es')}
              className={lang === 'es' ? 'active' : ''}
              title="Español"
              disabled={isChangingLanguage}
            >
              {isChangingLanguage && lang !== 'es' ? (
                <Spinner animation="border" size="sm" className="me-1" />
              ) : (
                <ReactCountryFlag countryCode="ES" className="flag-icon" svg />
              )}{' '}
              ES
            </LanguageButton>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-2 border-0 custom-toggler" onClick={() => setMenuExpanded(!menuExpanded)} />
          <Navbar.Collapse id="basic-navbar-nav" className="p-0 mobile-menu-collapse">
            <Nav className="mx-auto justify-content-between w-100 flex-nowrap">
              <NavItem className="nav-item-mobile nav-item-responsive">
                <Link to={`/${lang}`} onClick={handleNavItemClick} className={location.pathname === `/${lang}` ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.home')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile nav-item-responsive">
                <Link to={`/${lang}/stories`} onClick={handleNavItemClick} className={location.pathname.includes('/stories') ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.stories')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile nav-item-responsive">
                <Link to={`/${lang}/communities`} onClick={handleNavItemClick} className={location.pathname.includes('/communities') ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.communities')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile nav-item-responsive">
                <Link to={`/${lang}/book`} onClick={handleNavItemClick} className={location.pathname.includes('/book') ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.book')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile nav-item-responsive">
                <Link to={`/${lang}/postcards`} onClick={handleNavItemClick} className={location.pathname.includes('/postcards') ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.postcards')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile nav-item-responsive">
                <Link to={`/${lang}/testimonials`} onClick={handleNavItemClick} className={location.pathname.includes('/testimonials') ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.testimonials')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile nav-item-responsive">
                <Link to={`/${lang}/biblioteca`} onClick={handleNavItemClick} className={location.pathname.includes('/biblioteca') ? 'active d-flex align-items-center' : 'd-flex align-items-center'}>
                  {t('navigation.biblioteca', 'Biblioteca')}
                </Link>
              </NavItem>
              <NavItem className="nav-item-mobile programacao-wrapper">
                <Link to={`/${lang}/programacao`} onClick={handleNavItemClick} className={location.pathname.includes('/programacao') ? 'active d-flex align-items-center programacao-item' : 'd-flex align-items-center programacao-item'}>
                  {t('navigation.programacao')}
                </Link>
              </NavItem>
            </Nav>

            {/* Removida a versão mobile simplificada (dentro do menu) */}

            {/* Versão desktop com dropdown */}
            <LanguageSelector className="d-none d-lg-flex">
              <div className="language-dropdown-container">
                <GlobeIcon onClick={() => setDropdownOpen(!dropdownOpen)} ref={dropdownRef}>
                  <BiGlobe size={18} />
                  <span>{getLanguageLabel(lang)}</span>
                </GlobeIcon>

                <LanguageDropdown className={dropdownOpen ? 'open' : ''}>
                  <LanguageOption
                    onClick={() => handleLanguageChange('pt')}
                    className={lang === 'pt' ? 'active' : ''}
                    disabled={isChangingLanguage}
                  >
                    {isChangingLanguage && lang !== 'pt' ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Carregando...
                      </>
                    ) : (
                      'Português'
                    )}
                  </LanguageOption>
                  <LanguageOption
                    onClick={() => handleLanguageChange('en')}
                    className={lang === 'en' ? 'active' : ''}
                    disabled={isChangingLanguage}
                  >
                    {isChangingLanguage && lang !== 'en' ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Loading...
                      </>
                    ) : (
                      'English'
                    )}
                  </LanguageOption>
                  <LanguageOption
                    onClick={() => handleLanguageChange('es')}
                    className={lang === 'es' ? 'active' : ''}
                    disabled={isChangingLanguage}
                  >
                    {isChangingLanguage && lang !== 'es' ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Cargando...
                      </>
                    ) : (
                      'Español'
                    )}
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
