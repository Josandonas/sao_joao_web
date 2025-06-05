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
  font-weight: 800;
  font-size: 3rem;
  color: #8c0033;
  margin: 1.5rem 0 2.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.08);
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #8c0033, #a30039);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #8c0033, #b5003e);
    border-radius: 3px;
    box-shadow: 0 3px 6px rgba(140, 0, 51, 0.2);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
    margin: 1rem 0 1.8rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2.2rem;
  }
`;

export const Introduction = styled.div`
  max-width: 800px;
  margin: 2rem auto 2.5rem;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #444;
  text-align: center;
  background-color: rgba(255, 248, 220, 0.6);
  padding: 1.5rem 2.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  
  p {
    margin-bottom: 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1.2rem 1.5rem;
    font-size: 1rem;
    margin: 1.5rem auto 2rem;
  }
`;

export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 0 auto 2.5rem;
  padding: 1rem 1.5rem;
  max-width: 900px;
  background: linear-gradient(135deg, rgba(140, 0, 51, 0.8), rgba(120, 0, 42, 0.7));
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(140, 0, 51, 0.2);
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(160, 0, 60, 0.4), rgba(120, 0, 42, 0.3));
    border-radius: 52px;
    z-index: -1;
    filter: blur(4px);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0.8rem 1rem;
    border-radius: 30px;
    margin-bottom: 1.5rem;
    flex-direction: row;
    overflow-x: auto;
    justify-content: flex-start;
    max-width: 100%;
    
    &:before {
      border-radius: 32px;
    }
  }
`;

export const CategoryButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${props => props.isActive ? '#8c0033' : 'white'};
  color: ${props => props.isActive ? 'white' : '#555'};
  border: none;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.isActive ? '0 4px 10px rgba(140, 0, 51, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  transform: ${props => props.isActive ? 'translateY(-3px)' : 'none'};
  position: relative;
  overflow: hidden;
  min-width: 100px;
  z-index: 1;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0%'};
    height: 100%;
    background-color: #6c0026;
    z-index: -1;
    transition: width 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background-color: ${props => props.isActive ? '#8c0033' : '#f8f8f8'};
    color: ${props => props.isActive ? 'white' : '#8c0033'};
    
    &:after {
      width: ${props => props.isActive ? '100%' : '0%'};
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.85rem;
    padding: 0.5rem 0.9rem;
    min-width: auto;
  }
`;

export const RecordButton = styled.button`
  display: block;
  margin: 2.5rem auto;
  padding: 0.9rem 2.2rem;
  background-color: #8c0033;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  z-index: 1;
  letter-spacing: 0.5px;
  
  &:before {
    content: '📍';
    font-size: 1.4rem;
    line-height: 0;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: -10%;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, rgba(160, 0, 60, 0.8), rgba(120, 0, 42, 1));
    z-index: -1;
    transform: skew(-10deg);
    transition: width 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(140, 0, 51, 0.4);
    
    &:after {
      width: 110%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
    padding: 0.8rem 1.8rem;
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
