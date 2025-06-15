import styled from 'styled-components';

// Barra de controles superior
export const ControlsBar = styled.div`
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1001;
`;

// Container para os controles de navegação central
export const NavigationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 30px;
  padding: 5px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

// Botão de navegação base
export const NavigationButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.disabled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  margin: 0 2px;
  opacity: ${props => props.disabled ? 0.5 : 1};
  font-size: 22px;
`;

// Indicador de página
export const PageIndicator = styled.div`
  color: white;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 5px 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
`;

// Container para o conteúdo principal
export const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
`;

// Container para o PDF
export const PDFContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// Container para o menu de capítulos
export const ChaptersMenu = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 15px;
  max-width: 300px;
  max-height: 70vh;
  overflow-y: auto;
  z-index: 1002;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  color: white;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

// Título do menu de capítulos
export const ChaptersTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 16px;
  color: white;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 8px;
`;

// Botão de capítulo
export const ChapterItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  margin: 5px 0;
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;
