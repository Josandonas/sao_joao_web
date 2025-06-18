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
        <Row className="align-items-center">
          <Col xs={12} md={4} className="text-center text-md-start">
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
          
          <Col xs={12} md={4} className="text-center my-3 my-md-0">
            <Copyright>
              &copy; {currentYear} {t('app.name')} - {t('footer.rights')}
            </Copyright>
          </Col>
          
          <Col xs={12} md={4} className="text-center text-md-end">
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
