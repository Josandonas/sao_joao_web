import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DesktopToolbar, 
  DesktopToolbarGroup 
} from '../styles/BookReaderDesktop.styles';
import { 
  MobileToolbar, 
  MobileToolbarGroup, 
  MobileActionButton 
} from '../styles/BookReaderMobile.styles';
import { BaseButton, ButtonIcon } from '../styles/BookReaderCommon.styles';

/**
 * Componente para a barra de ferramentas do leitor de livros
 * Versões responsivas para desktop e mobile
 */
const BookReaderToolbar = ({
  isMobile,
  onBackToCover,
  onDownload,
  onShare,
  onToggleFullscreen,
  onToggleZoom,
  onToggleChapters,
  onToggleSettings,
  isFullscreen,
  zoomActive,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onFitToWidth,
  zoomLevel,
  t
}) => {
  // Se não for passado o objeto de tradução, usa o hook
  const { t: translate } = useTranslation();
  const tFunc = t || translate;

  // Renderiza a versão mobile da barra de ferramentas
  if (isMobile) {
    return (
      <MobileToolbar>
        <MobileToolbarGroup>
          <MobileActionButton onClick={onBackToCover} title={tFunc('book.backToCover')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </MobileActionButton>
        </MobileToolbarGroup>

        <MobileToolbarGroup>
          <MobileActionButton onClick={onToggleChapters} title={tFunc('book.chapters')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </MobileActionButton>
        </MobileToolbarGroup>

        <MobileToolbarGroup>
          <MobileActionButton 
            onClick={onToggleZoom} 
            title={zoomActive ? tFunc('book.disableZoom') : tFunc('book.enableZoom')}
            style={{ color: zoomActive ? '#4CAF50' : 'inherit' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              {!zoomActive && <line x1="11" y1="8" x2="11" y2="14"></line>}
              {!zoomActive && <line x1="8" y1="11" x2="14" y2="11"></line>}
            </svg>
          </MobileActionButton>
          
          <MobileActionButton onClick={onToggleSettings} title={tFunc('book.settings')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </MobileActionButton>
        </MobileToolbarGroup>
      </MobileToolbar>
    );
  }

  // Renderiza a versão desktop da barra de ferramentas
  return (
    <DesktopToolbar>
      <DesktopToolbarGroup>
        <BaseButton onClick={onBackToCover}>
          <ButtonIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </ButtonIcon>
          <span>{tFunc('book.backToCover')}</span>
        </BaseButton>
      </DesktopToolbarGroup>

      <DesktopToolbarGroup>
        <BaseButton onClick={onDownload}>
          <ButtonIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </ButtonIcon>
          <span>{tFunc('book.downloadPdf')}</span>
        </BaseButton>

        <BaseButton onClick={onShare}>
          <ButtonIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </ButtonIcon>
          <span>{tFunc('book.share')}</span>
        </BaseButton>

        {/* Controles de zoom expandidos */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {/* Botão de zoom out */}
          <BaseButton 
            onClick={onZoomOut}
            disabled={!zoomActive || zoomLevel <= 0.5}
            style={{ padding: '5px 10px' }}
            title={tFunc('book.zoomOut')}
          >
            <ButtonIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </ButtonIcon>
          </BaseButton>
          
          {/* Indicador de zoom */}
          <div style={{ 
            padding: '0 8px',
            fontSize: '14px',
            fontWeight: 'bold',
            minWidth: '60px',
            textAlign: 'center',
            color: zoomActive ? '#4CAF50' : 'inherit'
          }}>
            {Math.round(zoomLevel * 100)}%
          </div>
          
          {/* Botão de zoom in */}
          <BaseButton 
            onClick={onZoomIn}
            disabled={!zoomActive || zoomLevel >= 3}
            style={{ padding: '5px 10px' }}
            title={tFunc('book.zoomIn')}
          >
            <ButtonIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </ButtonIcon>
          </BaseButton>
          
          {/* Botão de reset zoom */}
          <BaseButton 
            onClick={onZoomReset}
            disabled={!zoomActive || zoomLevel === 1}
            style={{ padding: '5px 10px' }}
            title={tFunc('book.resetZoom')}
          >
            <ButtonIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
            </ButtonIcon>
          </BaseButton>
          
          {/* Botão de ajustar à largura */}
          <BaseButton 
            onClick={onFitToWidth}
            style={{ padding: '5px 10px' }}
            title={tFunc('book.fitToWidth')}
          >
            <ButtonIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="8 9 12 5 16 9"></polyline>
                <polyline points="16 15 12 19 8 15"></polyline>
                <line x1="4" y1="12" x2="20" y2="12"></line>
              </svg>
            </ButtonIcon>
          </BaseButton>
          
          {/* Botão para ativar/desativar zoom */}
          <BaseButton 
            onClick={onToggleZoom} 
            style={{ color: zoomActive ? '#4CAF50' : 'inherit' }}
          >
            <ButtonIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                {!zoomActive && <line x1="11" y1="8" x2="11" y2="14"></line>}
                {!zoomActive && <line x1="8" y1="11" x2="14" y2="11"></line>}
              </svg>
            </ButtonIcon>
            <span>{zoomActive ? tFunc('book.disableZoom') : tFunc('book.enableZoom')}</span>
          </BaseButton>
        </div>

        <BaseButton onClick={onToggleFullscreen}>
          <ButtonIcon>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isFullscreen ? (
                <>
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                </>
              ) : (
                <>
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </>
              )}
            </svg>
          </ButtonIcon>
          <span>{isFullscreen ? tFunc('book.exitFullscreen') : tFunc('book.fullscreen')}</span>
        </BaseButton>
      </DesktopToolbarGroup>
    </DesktopToolbar>
  );
};

export default BookReaderToolbar;
