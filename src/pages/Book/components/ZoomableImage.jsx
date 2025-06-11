import React, { useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { BookImage, ZoomControlsContainer, ZoomButton } from '../styles/BookImageStyles';

/**
 * Componente reutilizável para imagens com funcionalidade de zoom
 * 
 * Este componente encapsula a funcionalidade de zoom usando react-zoom-pan-pinch,
 * eliminando a duplicação de código entre as imagens esquerda e direita.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.src - URL da imagem
 * @param {string} props.alt - Texto alternativo para a imagem
 * @param {boolean} props.fullscreen - Indica se a imagem está em modo tela cheia
 * @param {boolean} props.zoomActive - Indica se o zoom está ativo
 * @param {boolean} props.showControls - Indica se os controles de zoom devem ser exibidos
 * @param {number} props.zoomLevel - Nível de zoom controlado externamente
 * @param {Function} props.onZoomChange - Callback chamado quando o zoom é alterado
 */
const ZoomableImage = ({ 
  src, 
  alt, 
  fullscreen = false, 
  zoomActive = false,
  showControls = true,
  zoomLevel = 1,
  onZoomChange = () => {}
}) => {
  // Referência para o componente TransformWrapper
  const transformRef = useRef(null);

  // Efeito para sincronizar o nível de zoom quando o zoomLevel muda externamente
  useEffect(() => {
    if (transformRef.current && zoomActive) {
      transformRef.current.setTransform(0, 0, zoomLevel);
    }
  }, [zoomLevel, zoomActive]);

  // Se o zoom não estiver ativo, renderiza apenas a imagem sem o wrapper de zoom
  if (!zoomActive) {
    return (
      <BookImage 
        src={src} 
        alt={alt} 
        $fullscreen={fullscreen}
        style={{ maxHeight: fullscreen ? '90vh' : '85vh' }}
      />
    );
  }
  
  // Se o zoom estiver ativo, renderiza com o wrapper de zoom
  return (
    <TransformWrapper
      ref={transformRef}
      initialScale={1}
      minScale={0.5}
      maxScale={4}
      wheel={{ step: 0.1 }}
      pinch={{ step: 10 }}
      doubleClick={{ disabled: 0 }}
      zoomAnimation={{ disabled: 0 }}
      centerOnInit={true}
      onZoom={onZoomChange}
    >
      {({ zoomIn, zoomOut, resetTransform }) => (
        <>
          {showControls && (
            <ZoomControlsContainer>
              <ZoomButton onClick={() => zoomIn()}>+</ZoomButton>
              <ZoomButton onClick={() => zoomOut()}>-</ZoomButton>
              <ZoomButton onClick={() => resetTransform()}>Reset</ZoomButton>
            </ZoomControlsContainer>
          )}
          <TransformComponent>
            <BookImage 
              src={src} 
              alt={alt} 
              $fullscreen={fullscreen}
              style={{ maxHeight: fullscreen ? '90vh' : '85vh' }}
            />
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
};

export default ZoomableImage;
