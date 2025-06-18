import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';
import { LayoutContainer, Main, HeaderImage } from './styles';

const Layout = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  
  // Atualiza o idioma quando o parâmetro de rota muda
  React.useEffect(() => {
    if (lang && ['pt', 'en', 'es'].includes(lang)) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return (
    <LayoutContainer>
      <Container fluid className="px-0">
        <HeaderImage />
      </Container>
      <Header />
      <Main>
        <Container fluid className="px-0">
          <Outlet />
        </Container>
      </Main>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
