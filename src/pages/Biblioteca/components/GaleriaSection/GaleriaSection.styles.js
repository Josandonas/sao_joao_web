import styled from 'styled-components';

/**
 * Container principal da seção de galeria
 */
export const GaleriaSectionContainer = styled.div`
  margin-bottom: 3rem;
`;

/**
 * Seletor de anos para a galeria
 */
export const YearSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

/**
 * Botão para seleção de ano
 */
export const YearButton = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  border: 1px solid var(--border-color);
  background-color: ${props => props.$isActive ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.$isActive ? 'white' : 'var(--text-color)'};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.$isActive ? 'var(--primary-color)' : 'var(--light-bg-hover)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color-light);
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
`;

/**
 * Container para o componente de galeria de imagens
 */
export const GalleryContainer = styled.div`
  .image-gallery {
    width: 100%;
    
    .image-gallery-slide {
      border-radius: 8px;
      overflow: hidden;
    }
    
    .image-gallery-image {
      object-fit: contain;
      max-height: 70vh;
      
      @media (max-width: 768px) {
        max-height: 50vh;
      }
    }
    
    .image-gallery-thumbnail {
      border-radius: 4px;
      overflow: hidden;
      
      &.active {
        border: 2px solid var(--primary-color);
      }
      
      &:hover {
        border: 2px solid var(--primary-color-light);
      }
    }
    
    .image-gallery-description {
      background-color: rgba(0, 0, 0, 0.7);
      padding: 0.75rem;
      font-size: 0.9rem;
      
      @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.8rem;
      }
    }
    
    .image-gallery-icon {
      color: white;
      filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
      
      &:hover {
        color: var(--primary-color);
      }
    }
    
    .image-gallery-bullets {
      .image-gallery-bullet {
        border: 1px solid white;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
        
        &.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
        }
        
        &:hover {
          background: var(--primary-color-light);
          border-color: var(--primary-color-light);
        }
      }
    }
  }
`;
