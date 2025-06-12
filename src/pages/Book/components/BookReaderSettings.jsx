import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DesktopDropdownMenu, 
  DesktopDropdownItem, 
  DropdownDivider 
} from '../styles/BookReaderDesktop.styles';
import {
  MobileOptionsMenu,
  MobileMenuItem,
  MobileOverlay
} from '../styles/BookReaderMobile.styles';

/**
 * Componente para configurações do leitor de livros
 * Versões responsivas para desktop e mobile
 */
const BookReaderSettings = ({
  isMobile,
  isOpen,
  onClose,
  onDownload,
  onShare,
  onToggleFullscreen,
  onToggleDarkMode,
  isDarkMode,
  isFullscreen,
  t
}) => {
  // Se não for passado o objeto de tradução, usa o hook
  const { t: translate } = useTranslation();
  const tFunc = t || translate;

  if (!isOpen) return null;

  // Renderiza a versão mobile do menu de configurações
  if (isMobile) {
    return (
      <>
        <MobileOverlay isOpen={true} onClick={onClose} />
        <MobileOptionsMenu isOpen={true}>
          <MobileMenuItem onClick={() => { onDownload(); onClose(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {tFunc('book.downloadPdf')}
          </MobileMenuItem>
          
          <MobileMenuItem onClick={() => { onShare(); onClose(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            {tFunc('book.share')}
          </MobileMenuItem>
          
          <MobileMenuItem onClick={() => { onToggleFullscreen(); onClose(); }}>
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
            {isFullscreen ? tFunc('book.exitFullscreen') : tFunc('book.fullscreen')}
          </MobileMenuItem>
          
          <MobileMenuItem onClick={() => { onToggleDarkMode(); onClose(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isDarkMode ? (
                <>
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </>
              ) : (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              )}
            </svg>
            {isDarkMode ? tFunc('book.lightMode') : tFunc('book.darkMode')}
          </MobileMenuItem>
        </MobileOptionsMenu>
      </>
    );
  }

  // Renderiza a versão desktop do menu de configurações
  return (
    <DesktopDropdownMenu isOpen={true}>
      <DesktopDropdownItem onClick={() => { onToggleDarkMode(); onClose(); }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isDarkMode ? (
            <>
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </>
          ) : (
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          )}
        </svg>
        {isDarkMode ? tFunc('book.lightMode') : tFunc('book.darkMode')}
      </DesktopDropdownItem>
      
      <DropdownDivider />
      
      <DesktopDropdownItem onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        {tFunc('book.close')}
      </DesktopDropdownItem>
    </DesktopDropdownMenu>
  );
};

export default BookReaderSettings;
