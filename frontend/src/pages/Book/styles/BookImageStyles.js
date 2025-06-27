import styled from 'styled-components';

// Container para as páginas do livro
export const BookImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// Container para exibir uma ou duas imagens lado a lado
export const BookImageLayout = styled.div`
  display: flex;
  flex-direction: ${props => props.$singlePage ? 'column' : 'row'};
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin: 20px 0;
`;

// Wrapper para cada imagem individual
export const BookImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${props => props.$singlePage ? '100%' : '50%'};
  position: relative;
`;

// Estilo para a imagem do livro
export const BookImage = styled.img`
  max-width: 100%;
  max-height: ${props => props.$fullscreen ? '80vh' : '60vh'};
  object-fit: contain;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

// Controles de navegação para o livro
export const BookNavigationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  margin-top: 20px;
`;

// Botão de navegação
export const BookNavigationButton = styled.button`
  background-color: #f57c00;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ff9800;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// Contador de páginas
export const BookPageCounter = styled.div`
  font-size: 1rem;
  color: #333;
  font-weight: 500;
`;

// Container para os botões de capítulos
export const BookChaptersContainer = styled.div.attrs(props => {
  // Transformamos a prop isOpen em $isOpen para evitar o warning do React
  const { isOpen, ...rest } = props;
  return {
    ...rest,
    $isOpen: isOpen
  };
})`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  
  /* Aplicando estilos com base na prop $isOpen */
  position: ${props => props.$isOpen ? 'fixed' : 'static'};
  top: ${props => props.$isOpen ? '0' : 'auto'};
  left: ${props => props.$isOpen ? '0' : 'auto'};
  right: ${props => props.$isOpen ? '0' : 'auto'};
  bottom: ${props => props.$isOpen ? '0' : 'auto'};
  z-index: ${props => props.$isOpen ? '1000' : 'auto'};
  background-color: ${props => props.$isOpen ? 'rgba(0, 0, 0, 0.5)' : '#f5f5f5'};
`;

// Container para o conteúdo do visualizador de livro
export const BookViewerContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Container para as páginas do livro no visualizador
export const BookPagesContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 10px;
`;

// Container para os controles de zoom
export const ZoomControlsContainer = styled.div`
  position: absolute;
  z-index: 9999;
  bottom: 10px;
  left: 10px;
  display: flex;
  gap: 5px;
`;

// Botão de zoom
export const ZoomButton = styled.button`
  padding: 5px 10px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0b7dda;
  }
`;

// Botão de capítulo
export const ChapterButton = styled.button`
  background-color: ${props => props.$active ? '#f57c00' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? '#ff9800' : '#f0f0f0'};
  }
`;

// Título do capítulo
export const ChapterTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  text-align: center;
  margin: 20px 0;
  font-weight: 600;
`;

// Estilos para o modo fullscreen
export const FullscreenImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
`;

export const FullscreenImageLayout = styled(BookImageLayout)`
  height: 80vh;
`;

export const FullscreenNavigationControls = styled(BookNavigationControls)`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 15px;
  border-radius: 8px;
  max-width: 80%;
  margin: 0 auto;
`;
