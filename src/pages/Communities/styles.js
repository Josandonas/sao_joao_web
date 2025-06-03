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
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

export const ModalTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.large};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  transition: transform ${props => props.theme.transitions.fast};
  
  &:hover {
    transform: scale(1.2);
  }
`;

export const ModalBody = styled.div`
  padding: ${props => props.theme.spacing.lg};
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
    line-height: 1.6;
  }
`;

export const ModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing.lg};
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
