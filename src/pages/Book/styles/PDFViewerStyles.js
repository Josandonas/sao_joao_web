import styled from 'styled-components';

// Container principal do visualizador de PDF
export const PDFContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

// Container do visualizador de PDF
export const ViewerContainer = styled.div`
  flex: 1;
  height: ${props => props.$hasToolbar ? 'calc(100% - 56px)' : '100%'};
`;

// Container da barra de ferramentas
export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  height: 56px;
`;

// Grupo de botões na barra de ferramentas
export const ToolbarButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

// Botão base
export const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  transition: background-color 0.2s;
  
  svg {
    margin-right: 5px;
  }
`;

// Botão de voltar
export const BackButton = styled(Button)`
  background-color: #007bff;
  color: white;
  
  &:hover {
    background-color: #0069d9;
  }
`;

// Botão de download
export const DownloadButton = styled(Button)`
  background-color: #28a745;
  color: white;
  
  &:hover {
    background-color: #218838;
  }
`;

// Botão de tela cheia
export const FullscreenButton = styled(Button)`
  background-color: #6c757d;
  color: white;
  
  &:hover {
    background-color: #5a6268;
  }
`;

// Container para mensagens de erro
export const ErrorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 0, 0, 0.05);
  z-index: 10;
`;

// Texto de erro
export const ErrorText = styled.div`
  padding: 16px;
  background-color: white;
  border: 1px solid #f44336;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: #d32f2f;
  font-weight: 500;
`;

// Container para o indicador de carregamento
export const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
`;

// Texto de carregamento
export const LoadingText = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-weight: 500;
`;

// Spinner de carregamento
export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
