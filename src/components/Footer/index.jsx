import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import { FooterContainer, FooterContent, Copyright, Boss, PrefeituraLogo, FundaCulturaLogo, Parteners } from './styles';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container fluid>
        {/* Desktop: Logos nas extremidades e copyright no meio */}
        {/* Mobile: Itens empilhados com espaçamento entre eles */}
        <Row className="justify-content-between align-items-center">
          {/* Logo da Prefeitura - à esquerda no desktop */}
          <Col xs={6} lg={4} className="text-center text-lg-start mb-4 mb-lg-0">
            <Boss>
              <a href="https://corumba.ms.gov.br" target="_blank" rel="noopener noreferrer">
                <PrefeituraLogo
                  src={`${PUBLIC_URL}/assets/images/colaborates/prefeitura_corumba.png`}
                  alt="Prefeitura de Corumbá"
                  title="Prefeitura de Corumbá"
                  className="img-fluid"
                />
              </a>
            </Boss>
          </Col>

          {/* Copyright - centralizado */}
          <Col xs={12} lg={4} className="text-center mb-4 mb-lg-0 order-lg-0 order-first">
          <Copyright>
            &copy; {currentYear} - {t('footer.rights')}
            <br />
            Arcabouço multimídia cedido - Deus te Salve João Batista!
            <br />
            Desenvolvimento: Núcleo de Gestão Estratégico
          </Copyright>
          </Col>

          {/* Logo da Fundação da Cultura - à direita no desktop */}
          <Col xs={6} lg={4} className="text-center text-lg-end mb-4 mb-lg-0">
            <Parteners>
              <a href="https://corumba.ms.gov.br/secretarias/funda%C3%A7%C3%A3o-da-cultura-de-corumba" target="_blank" rel="noopener noreferrer">
                <FundaCulturaLogo
                  src={`${PUBLIC_URL}/assets/images/colaborates/cultura.png`}
                  alt="Fundação da Cultura de Corumbá"
                  title="Fundação da Cultura de Corumbá"
                  className="img-fluid"
                />
              </a>
            </Parteners>
          </Col>
        </Row>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
