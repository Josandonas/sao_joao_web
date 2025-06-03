import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Content, Title, Message, Button } from './styles';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang = 'pt' } = useParams();

  const goToHome = () => {
    navigate(`/${lang}`);
  };

  return (
    <Container>
      <Content>
        <Title>404</Title>
        <Message>{t('notFound.title')}</Message>
        <p>{t('notFound.message')}</p>
        <Button onClick={goToHome}>{t('notFound.button')}</Button>
      </Content>
    </Container>
  );
};

export default NotFound;
