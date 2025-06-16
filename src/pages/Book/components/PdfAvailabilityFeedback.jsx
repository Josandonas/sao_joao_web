import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiAlertTriangle, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';

// Importar estilos da pasta styles
import {
  FeedbackContainer,
  FeedbackIcon,
  FeedbackTitle,
  FeedbackText,
  FeedbackActionsContainer,
  FeedbackButton,
  spinnerStyles
} from '../styles/PdfAvailabilityFeedbackStyles';

/**
 * Componente para mostrar feedback sobre a disponibilidade do PDF
 * @param {Object} props - Propriedades do componente
 * @param {boolean|null} props.isAvailable - Se o PDF está disponível (null = verificando)
 * @param {Error} props.error - Erro ocorrido durante a verificação
 * @param {Function} props.onRetry - Função para tentar novamente
 * @param {Function} props.onBackToCover - Função para voltar à capa
 * @returns {JSX.Element} - Componente renderizado
 */
const PdfAvailabilityFeedback = ({ isAvailable, error, onRetry, onBackToCover }) => {
  const { t } = useTranslation();
  
  // Se ainda está verificando
  if (isAvailable === null) {
    return (
      <FeedbackContainer>
        <FeedbackIcon>
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </FeedbackIcon>
        <FeedbackTitle>
          {t ? t('book.checkingPdf') : 'Verificando disponibilidade do PDF...'}
        </FeedbackTitle>
        <FeedbackText>
          {t ? t('book.pleaseWait') : 'Por favor, aguarde enquanto verificamos se o PDF está disponível.'}
        </FeedbackText>
        <style jsx>{spinnerStyles}</style>
      </FeedbackContainer>
    );
  }
  
  // Se o PDF não está disponível
  if (!isAvailable) {
    return (
      <FeedbackContainer>
        <FeedbackIcon error>
          <FiAlertTriangle size={48} />
        </FeedbackIcon>
        
        <FeedbackTitle>
          {t ? t('book.pdfNotAvailable') : 'PDF não disponível'}
        </FeedbackTitle>
        
        <FeedbackText>
          {error 
            ? `${t ? t('book.pdfError') : 'Erro ao verificar o PDF'}: ${error.message}`
            : (t ? t('book.pdfNotFound') : 'O PDF solicitado não foi encontrado.')}
        </FeedbackText>
        
        <FeedbackActionsContainer>
          {onRetry && (
            <FeedbackButton onClick={onRetry} primary>
              <FiRefreshCw /> {t ? t('common.tryAgain') : 'Tentar novamente'}
            </FeedbackButton>
          )}
          
          {onBackToCover && (
            <FeedbackButton onClick={onBackToCover}>
              <FiArrowLeft /> {t ? t('book.backToCover') : 'Voltar à capa'}
            </FeedbackButton>
          )}
        </FeedbackActionsContainer>
      </FeedbackContainer>
    );
  }
  
  // Se o PDF está disponível, não renderiza nada
  return null;
};

export default PdfAvailabilityFeedback;
