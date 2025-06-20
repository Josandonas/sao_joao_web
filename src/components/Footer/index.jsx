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
          <Col xs={12} lg={4} className="text-center text-lg-start mb-4 mb-lg-0">
            <Boss>
              <a href="https://www.corumba.ms.gov.br" target="_blank" rel="noopener noreferrer">
                <PrefeituraLogo 
                  src="/assets/images/colaborates/prefeitura_corumba.png" 
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
              &copy; {currentYear} {t('app.name')} - {t('footer.rights')}
            </Copyright>
          </Col>
          
          {/* Logo da Fundação da Cultura - à direita no desktop */}
          <Col xs={12} lg={4} className="text-center text-lg-end mb-4 mb-lg-0">
            <Parteners>
              <a href="https://ww2.corumba.ms.gov.br/secretarias-e-fundacoes/fundacao-da-cultura-e-do-patrimonio-historico-de-corumba/" target="_blank" rel="noopener noreferrer">
                <FundaCulturaLogo 
                  src="/assets/images/colaborates/cultura.png" 
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
