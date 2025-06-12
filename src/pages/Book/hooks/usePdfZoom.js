import { useState, useEffect, useCallback, useRef } from 'react';

// Constantes para configuração do zoom
const ZOOM_STEP = 0.1; // Incremento/decremento do zoom
const MIN_ZOOM = 0.5; // Zoom mínimo
const MAX_ZOOM = 3.0; // Zoom máximo

/**
 * Hook personalizado para gerenciar o zoom do PDF
 * @param {number} initialZoom - Nível inicial de zoom
 * @param {function} onZoomChange - Callback para quando o zoom mudar
 * @param {boolean} zoomEnabled - Se o zoom está habilitado
 * @returns {Object} - Objeto contendo funções e estados relacionados ao zoom
 */
const usePdfZoom = (initialZoom = 1, onZoomChange = null, zoomEnabled = true) => {
  // Estado para controlar a posição do mouse durante o zoom
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [currentZoom, setCurrentZoom] = useState(initialZoom);
  
  // Ref para armazenar a última posição conhecida do mouse
  const lastKnownMousePosRef = useRef({ x: 0, y: 0 });
  
  // Função para rastrear a posição do mouse continuamente
  const trackMousePosition = useCallback((containerRef) => {
    if (!containerRef.current || !zoomEnabled) return;
    
    const container = containerRef.current;
    
    const mouseMoveHandler = (e) => {
      const rect = container.getBoundingClientRect();
      lastKnownMousePosRef.current = {
        x: (e.clientX - rect.left) / currentZoom,
        y: (e.clientY - rect.top) / currentZoom
      };
    };
    
    container.addEventListener('mousemove', mouseMoveHandler);
    
    return () => {
      container.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, [currentZoom, zoomEnabled]);

  // Função para aplicar zoom
  const applyZoom = useCallback((newZoomLevel, containerRef, event) => {
    if (!zoomEnabled || !containerRef.current) return;
    
    // Limita o zoom aos valores mínimo e máximo
    const limitedZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoomLevel));
    
    if (limitedZoom !== currentZoom) {
      const container = containerRef.current;
      
      // Determinar a posição do mouse para o zoom
      let mouseX, mouseY;
      
      if (event) {
        // Se temos um evento de mouse, usamos sua posição
        const rect = container.getBoundingClientRect();
        mouseX = (event.clientX - rect.left) / currentZoom;
        mouseY = (event.clientY - rect.top) / currentZoom;
      } else if (lastKnownMousePosRef.current.x || lastKnownMousePosRef.current.y) {
        // Caso contrário, usamos a última posição conhecida do mouse
        mouseX = lastKnownMousePosRef.current.x;
        mouseY = lastKnownMousePosRef.current.y;
      } else {
        // Se não temos nenhuma posição, usamos o centro do container
        mouseX = container.clientWidth / 2 / currentZoom;
        mouseY = container.clientHeight / 2 / currentZoom;
      }
      
      // Salva a posição de scroll atual
      const scrollX = container.scrollLeft;
      const scrollY = container.scrollTop;
      
      // Atualiza o estado
      setMousePosition({ x: mouseX, y: mouseY });
      setScrollPosition({ x: scrollX, y: scrollY });
      
      // Atualiza o zoom
      setCurrentZoom(limitedZoom);
      if (onZoomChange) {
        onZoomChange(limitedZoom);
      }
    }
  }, [currentZoom, zoomEnabled, onZoomChange]);

  // Handler para o evento de roda do mouse (zoom)
  const handleWheel = useCallback((e, containerRef) => {
    if (!zoomEnabled || !containerRef.current) return;
    
    // Previne o comportamento padrão de scroll
    e.preventDefault();
    
    // Calcula o novo nível de zoom
    const delta = -Math.sign(e.deltaY) * ZOOM_STEP;
    const newZoomLevel = currentZoom + delta;
    
    // Aplica o zoom
    applyZoom(newZoomLevel, containerRef, e);
  }, [applyZoom, currentZoom, zoomEnabled]);

  // Função para ajustar o PDF à largura da tela
  const fitToWidth = useCallback((containerRef, estimatedPdfWidth = 800) => {
    if (containerRef.current) {
      // Obtém a largura disponível do container
      const containerWidth = window.innerWidth - 120; // Largura total menos espaço para as setas
      
      // Calcula a escala necessária para ajustar à largura
      const newScale = Math.min(MAX_ZOOM, containerWidth / estimatedPdfWidth);
      
      // Aplica o zoom
      applyZoom(newScale, containerRef);
    }
  }, [applyZoom]);

  // Função para aplicar o scroll após o zoom
  const applyScrollAfterZoom = useCallback((containerRef, scale) => {
    if (!zoomEnabled || !containerRef.current) return;
    
    const container = containerRef.current;
    
    // Determinar a posição para centralizar o zoom
    let targetX, targetY;
    
    if (mousePosition.x && mousePosition.y) {
      // Usamos a posição do mouse como ponto de referência para o zoom
      targetX = mousePosition.x;
      targetY = mousePosition.y;
    } else if (lastKnownMousePosRef.current.x || lastKnownMousePosRef.current.y) {
      // Caso contrário, usamos a última posição conhecida do mouse
      targetX = lastKnownMousePosRef.current.x;
      targetY = lastKnownMousePosRef.current.y;
    } else {
      // Se não temos nenhuma posição, usamos o centro da área visível
      targetX = container.clientWidth / 2 / scale;
      targetY = container.clientHeight / 2 / scale;
    }
    
    // Calcula a nova posição de scroll
    const newX = (targetX * scale) - (container.clientWidth / 2);
    const newY = (targetY * scale) - (container.clientHeight / 2);
    
    // Aplica o scroll com um pequeno atraso para garantir que o PDF foi renderizado
    // e que a transição seja suave
    setTimeout(() => {
      container.scrollTo({
        left: Math.max(0, newX),
        top: Math.max(0, newY),
        behavior: 'auto' // Comportamento instantâneo para evitar atrasos
      });
    }, 10);
  }, [mousePosition, zoomEnabled]);

  return {
    currentZoom,
    mousePosition,
    scrollPosition,
    handleWheel,
    applyZoom,
    fitToWidth,
    applyScrollAfterZoom,
    trackMousePosition,
    ZOOM_STEP,
    MIN_ZOOM,
    MAX_ZOOM
  };
};

export default usePdfZoom;
