import styled from 'styled-components';

export const SelectedCommunitySection = styled.section`
  margin-top: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: 0;
  background: transparent;
  animation: fadeIn 0.8s ease-in-out;
  position: relative;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    height: 40px;
    width: 2px;
    background: linear-gradient(to bottom, rgba(244, 162, 97, 0), rgba(244, 162, 97, 0.8));
    transform: translateX(-50%);
    z-index: -1;
  }
`;

export const SelectedCommunityTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: 1.8rem;
  color: #fff;
  margin: 0;
  padding: 1.2rem 1.8rem;
  border-radius: 12px 12px 0 0;
  background: linear-gradient(135deg, #f4a261, #e9c46a);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  
  &:before {
    content: '🏠';
    margin-right: 10px;
    font-size: 1.6rem;
  }
`;

export const SelectedCommunityCard = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  background: white;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.18);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const SelectedCommunityImage = styled.img`
  flex: 0 0 380px;
  height: 330px;
  object-fit: cover;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
  
  ${SelectedCommunityCard}:hover & {
    transform: scale(1.03);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 0 0 auto;
    width: 100%;
    height: 250px;
    margin-bottom: 0;
  }
`;

export const SelectedCommunityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 100%);
`;

export const SelectedCommunityDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #444;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1.2rem;
  border-left: 3px solid rgba(244, 162, 97, 0.3);
  font-family: ${props => props.theme.fonts.body || 'system-ui, -apple-system, sans-serif'};
`;

export const SelectedCommunityLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f4a261;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  background: rgba(244, 162, 97, 0.1);
  padding: 0.5rem 0.8rem;
  border-radius: 50px;
  align-self: flex-start;
  box-shadow: 0 2px 8px rgba(244, 162, 97, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(244, 162, 97, 0.15);
    transform: translateY(-2px);
  }
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
  background: linear-gradient(135deg, #f4a261, #e9c46a);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.8rem 1.8rem;
  font-weight: 600;
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.body || 'system-ui, -apple-system, sans-serif'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 12px rgba(78, 126, 227, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #3e67c2, #54b8c7);
    box-shadow: 0 6px 16px rgba(78, 126, 227, 0.4);
    transform: translateY(-2px);
  }
  
  &:after {
    content: '→';
    margin-left: 8px;
    font-size: 1.2rem;
    transition: transform 0.2s ease;
  }
  
  &:hover:after {
    transform: translateX(4px);
  }
`;
