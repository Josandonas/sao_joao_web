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

export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const CategoryButton = styled.button`
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
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.xsmall};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  }
`;

export const RecordButton = styled.button`
  display: block;
  margin: ${props => props.theme.spacing.xl} auto;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: ${props => props.theme.fontWeights.bold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  box-shadow: ${props => props.theme.shadows.medium};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

export const RecordingForm = styled.form`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.lg} auto;
  max-width: 800px;
  box-shadow: ${props => props.theme.shadows.medium};
  animation: slideDown 0.5s ease;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const FormTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

export const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
  
  small {
    display: block;
    margin-top: ${props => props.theme.spacing.xs};
    color: ${props => props.theme.colors.textLight};
    font-size: ${props => props.theme.fontSizes.xsmall};
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.text};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  transition: border ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid #ddd;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  resize: vertical;
  font-family: inherit;
  transition: border ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-top: ${props => props.theme.spacing.lg};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`;

export const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const TestimonialCard = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: transform ${props => props.theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

export const TestimonialImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const TestimonialContent = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

export const TestimonialName = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const TestimonialLocation = styled.h4`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.normal};
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.textLight};
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const TestimonialQuote = styled.p`
  font-style: italic;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.6;
`;

export const TestimonialVideo = styled.button`
  display: block;
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  background-color: transparent;
  color: ${props => props.theme.colors.accent};
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.small};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: white;
  }
`;

export const VideoModal = styled.div`
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
  position: relative;
  padding: ${props => props.theme.spacing.lg};
  animation: modalFadeIn 0.3s ease;
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
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

export const VideoContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  overflow: hidden;
  
  video {
    display: block;
  }
`;
