import styled from 'styled-components';

export const Container = styled.div`
  padding: ${props => props.theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.light};
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

export const Introduction = styled.div`
  max-width: 800px;
  margin: 0 auto ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.fontSizes.large};
  line-height: 1.6;
  color: ${props => props.theme.colors.textLight};
  text-align: center;
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const MapSection = styled.section`
  margin-bottom: ${props => props.theme.spacing.xl};
  
  h2 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fontWeights.bold};
    font-size: ${props => props.theme.fontSizes.xlarge};
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.md};
    text-align: center;
  }
`;

export const MapDescription = styled.div`
  max-width: 800px;
  margin: 0 auto ${props => props.theme.spacing.md};
  text-align: center;
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.medium};
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;
  border-radius: ${props => props.theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  
  .map-placeholder {
    padding: ${props => props.theme.spacing.lg};
    color: ${props => props.theme.colors.textLight};
    text-align: center;
    max-width: 400px;
    font-style: italic;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 300px;
  }
`;

export const MapContainerStyled = styled.div`
  width: 100%;
  height: 600px;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 450px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 350px;
  }
`;

export const CommunityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${props => props.theme.spacing.md};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const CommunityCard = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: transform ${props => props.theme.transitions.default}, 
              box-shadow ${props => props.theme.transitions.default};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform ${props => props.theme.transitions.slow};
  
  ${CommunityCard}:hover & {
    transform: scale(1.05);
  }
`;

export const CardContent = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

export const CardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.accent};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const CardLocation = styled.h4`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.normal};
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const CardDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.fontSizes.medium};
`;

export const CommunityModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.md};
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalFadeIn 0.3s ease;
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const ModalTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xlarge};
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;

export const ModalImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-bottom: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.small};
`;

export const ModalDescriptionText = styled.div`
  font-size: ${props => props.theme.fontSizes.medium};
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: ${props => props.theme.colors.textLight};
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

export const ModalBody = styled.div`
  padding: ${props => props.theme.spacing.lg};
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
    line-height: 1.6;
  }
`;

export const ModalDetailsContainer = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.md};
`;

export const ModalDetail = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ModalDetailTitle = styled.h4`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.accent};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const ModalText = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.text};
`;

export const GalleryContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  .image-gallery {
    width: 100%;
    border-radius: ${props => props.theme.borderRadius.small};
    overflow: hidden;
  }
  
  .image-gallery-image {
    max-height: 500px;
    object-fit: contain;
    background-color: #f5f5f5;
  }
  
  .image-gallery-thumbnail {
    width: 80px;
    border: 3px solid transparent;
    
    &.active {
      border: 3px solid ${props => props.theme.colors.primary};
    }
  }
  
  .image-gallery-fullscreen-button,
  .image-gallery-play-button,
  .image-gallery-left-nav,
  .image-gallery-right-nav {
    color: ${props => props.theme.colors.primary};
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
  }
`;

// Estilos para o card de comunidade selecionada no mapa
export const SelectedCommunitySection = styled.section`
  margin-top: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.lg};
  background: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const SelectedCommunityTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.xlarge};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border || '#e0e0e0'};
  padding-bottom: ${props => props.theme.spacing.sm};
`;

export const SelectedCommunityCard = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const SelectedCommunityImage = styled.img`
  flex: 0 0 300px;
  height: 300px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.small};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 0 0 auto;
    width: 100%;
    height: 250px;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

export const SelectedCommunityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const SelectedCommunityDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.large};
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const SelectedCommunityLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.secondary};
  font-size: ${props => props.theme.fontSizes.medium};
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const LocationIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.secondary};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: ${props => props.theme.colors.secondary} transparent transparent transparent;
  }
`;

export const DetailsButton = styled.button`
  margin-top: auto;
  align-self: flex-start;
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-family: ${props => props.theme.fonts.body};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.accentDark || 'darken($accent, 10%)'};
  }
`;
