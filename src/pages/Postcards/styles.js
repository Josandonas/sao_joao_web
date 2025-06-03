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

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  gap: ${props => props.theme.spacing.md};
  
  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: ${props => props.theme.spacing.sm};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    
    .filter-buttons {
      justify-content: center;
    }
  }
`;

export const FilterButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.theme.colors.textLight};
  border: 1px solid ${props => props.isActive ? props.theme.colors.primary : '#ddd'};
  border-radius: ${props => props.theme.borderRadius.large};
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.isActive ? props.theme.colors.primary : 'rgba(0, 0, 0, 0.05)'};
    color: ${props => props.isActive ? 'white' : props.theme.colors.primary};
    border-color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xsmall};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  }
`;

export const SearchInput = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.borderRadius.large};
  font-size: ${props => props.theme.fontSizes.medium};
  width: 300px;
  max-width: 100%;
  transition: border ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 100, 180, 0.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

export const PostcardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

export const PostcardItem = styled.div`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  aspect-ratio: 3/4;
  cursor: pointer;
  transition: transform ${props => props.theme.transitions.default}, 
              box-shadow ${props => props.theme.transitions.default};
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: ${props => props.theme.shadows.large};
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

export const PostcardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${props => props.theme.transitions.slow};
`;

export const PostcardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  padding: ${props => props.theme.spacing.md};
  color: white;
  transition: background ${props => props.theme.transitions.default};
  
  ${PostcardItem}:hover & {
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%);
  }
`;

export const PostcardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin: 0;
`;

export const NoResults = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl} 0;
  color: ${props => props.theme.colors.textLight};
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.fontSizes.large};
  }
  
  button {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${props => props.theme.borderRadius.medium};
    font-size: ${props => props.theme.fontSizes.medium};
    cursor: pointer;
    transition: background-color ${props => props.theme.transitions.default};
    
    &:hover {
      background-color: ${props => props.theme.colors.accent};
    }
  }
`;

export const PostcardModal = styled.div`
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
  max-width: 900px;
  width: 90%;
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

export const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background ${props => props.theme.transitions.fast};
  z-index: 2;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const ModalHeader = styled.div`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  h2 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fontWeights.bold};
    font-size: ${props => props.theme.fontSizes.xlarge};
    color: ${props => props.theme.colors.primary};
    margin: 0;
  }
`;

export const ModalBody = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const FullPostcardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${props => props.theme.borderRadius.small};
  box-shadow: ${props => props.theme.shadows.small};
`;

export const PostcardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostcardDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.medium};
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const PostcardMetadata = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const MetadataItem = styled.div`
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textLight};
  
  strong {
    color: ${props => props.theme.colors.text};
  }
`;

export const ShareContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: auto;
`;

export const ShareButton = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

export const DownloadButton = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: darken(${props => props.theme.colors.primary}, 10%);
  }
`;
