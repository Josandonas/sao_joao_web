import styled from 'styled-components';

export const HeaderImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/assets/images/cabecalho/cabecalho.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top:15%; /* Ajuste este valor para controlar a altura da imagem (proporção) */
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;
