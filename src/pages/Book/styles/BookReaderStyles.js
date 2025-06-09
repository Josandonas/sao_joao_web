import styled from 'styled-components';

// Container principal para a seção do visualizador do livro
export const BookViewerSection = styled.div`
  background-color: transparent;
  padding: 0;
  margin-top: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

// Barra de ações do leitor do livro
export const BookViewerActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  .left-actions, .center-actions, .right-actions {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
  }

  .center-actions {
    justify-content: center;
  }

  .right-actions {
    justify-content: flex-end;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};

    .left-actions, .center-actions, .right-actions {
      width: 100%;
      justify-content: center;
    }
  }
`;

// Visualizador principal do livro
export const BookViewer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

// Controles do livro
export const BookControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

// Navegação entre páginas
export const PageNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

// Contador de páginas
export const PageCounter = styled.div`
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.small};
  min-width: 150px;
  text-align: center;
`;

// Container para as páginas do livro
export const BookPages = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

// Página individual do livro
export const Page = styled.div`
  width: 100%;
  opacity: ${props => props.active ? 1 : 0};
  position: ${props => props.active ? 'relative' : 'absolute'};
  top: 0;
  left: 0;
  transition: opacity 0.5s ease;
  pointer-events: ${props => props.active ? 'auto' : 'none'};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

// Conteúdo da página
export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

// Imagem da página
export const PageImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  object-fit: cover;
  margin: 0 auto;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    width: 45%;
    margin: 0;
  }
`;

// Texto da página
export const PageText = styled.div`
  flex: 1;
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.medium};
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  p {
    margin-bottom: ${props => props.theme.spacing.md};
    text-align: justify;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

// Título da página
export const PageTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.xlarge};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
`;

// Navegação de capítulos
export const ChapterNavigation = styled.div`
  background-color: ${props => props.theme.colors.backgroundLight};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-top: ${props => props.theme.spacing.xl};

  h3 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: ${props => props.theme.fontSizes.medium};
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.md};
    text-align: center;
  }

  .chapter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: ${props => props.theme.spacing.sm};
    justify-content: center;
  }
`;

// Botão de capítulo
export const ChapterButton = styled.button`
  background-color: ${props => 
    props.isActive 
      ? props.theme.colors.primary 
      : props.theme.colors.backgroundDark
  };
  color: ${props => 
    props.isActive 
      ? 'white' 
      : props.theme.colors.text
  };
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes.small};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => 
      props.isActive 
        ? props.theme.colors.primaryDark 
        : props.theme.colors.border
    };
    transform: translateY(-2px);
  }
`;

// Componente para o modo de tela cheia
export const FullscreenReader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.xl};
`;

// Conteúdo em tela cheia
export const FullscreenContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} 0;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};

  .fullscreen-page {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.lg};

    h2 {
      font-family: ${props => props.theme.fonts.heading};
      font-size: ${props => props.theme.fontSizes.xxlarge};
      color: ${props => props.theme.colors.primary};
      text-align: center;
      margin-bottom: ${props => props.theme.spacing.lg};
    }

    .page-container {
      display: flex;
      flex-direction: column;
      gap: ${props => props.theme.spacing.xl};

      @media (min-width: ${props => props.theme.breakpoints.lg}) {
        flex-direction: row;
        align-items: flex-start;
      }

      img {
        width: 100%;
        max-width: 500px;
        height: auto;
        border-radius: ${props => props.theme.borderRadius.medium};
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        object-fit: cover;
        margin: 0 auto;

        @media (min-width: ${props => props.theme.breakpoints.lg}) {
          width: 45%;
          margin: 0;
        }
      }

      .page-text {
        flex: 1;
        font-family: ${props => props.theme.fonts.body};
        font-size: ${props => props.theme.fontSizes.large};
        line-height: 1.8;
        color: ${props => props.theme.colors.text};
        padding: ${props => props.theme.spacing.lg};
        background-color: ${props => props.theme.colors.backgroundLight};
        border-radius: ${props => props.theme.borderRadius.medium};
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

        p {
          margin-bottom: ${props => props.theme.spacing.md};
          text-align: justify;
        }

        p:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .fullscreen-chapters {
    display: flex;
    flex-wrap: wrap;
    gap: ${props => props.theme.spacing.sm};
    justify-content: center;
    margin-top: ${props => props.theme.spacing.xl};

    button {
      background-color: ${props => props.theme.colors.backgroundDark};
      color: ${props => props.theme.colors.text};
      border: none;
      border-radius: ${props => props.theme.borderRadius.small};
      padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
      font-size: ${props => props.theme.fontSizes.small};
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background-color: ${props => props.theme.colors.primary};
        color: white;
      }

      &:hover {
        background-color: ${props => props.isActive ? props.theme.colors.primaryDark : props.theme.colors.border};
        transform: translateY(-2px);
      }
    }
  }
`;
