import styled from 'styled-components';

export const HeaderImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('${PUBLIC_URL}/assets/images/cabecalho/cabecalho-5.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 185px; /* Proporção base para desktop */

  /* Ajustes responsivos usando os breakpoints do Bootstrap */
  @media (max-width: 1200px) { /* xl */
    padding-top: 16%;
  }

  @media (max-width: 992px) { /* lg */
    padding-top: 18%;
  }

  @media (max-width: 768px) { /* md */
    padding-top: 20%;
  }

  @media (max-width: 576px) { /* sm */
    padding-top: 20%;
  }
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
