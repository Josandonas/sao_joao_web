import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FeaturesSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  width: 100%;
  margin: 0 auto;
  
  /* Layout para distribuir 5 itens de forma mais equilibrada */
  & > :nth-child(1),
  & > :nth-child(2) {
    flex-basis: 45%;
    max-width: 45%;
  }
  
  & > :nth-child(3),
  & > :nth-child(4),
  & > :nth-child(5) {
    flex-basis: 30%;
    max-width: 30%;
  }
  
  @media (max-width: 1200px) {
    gap: 20px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    & > :nth-child(1),
    & > :nth-child(2),
    & > :nth-child(3),
    & > :nth-child(4),
    & > :nth-child(5) {
      flex-basis: calc(50% - 12px);
      max-width: calc(50% - 12px);
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    & > :nth-child(1),
    & > :nth-child(2),
    & > :nth-child(3),
    & > :nth-child(4),
    & > :nth-child(5) {
      flex-basis: 100%;
      max-width: 100%;
    }
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.md};
  }
`;

export const FeatureCard = styled(Link)`
  background-color: #fff;
  border-radius: 16px;
  padding: 26px 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: inherit;
  overflow: hidden;
  min-height: 180px;
  position: relative;
  z-index: 1;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(140, 0, 51, 0.15);
    border-bottom: 3px solid ${props => props.theme.colors.primary || '#5f1530'};
    
    &:before {
      opacity: 0.03;
    }
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #5f1530;
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
`;

export const FeatureIconWrapper = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background-color: rgba(243, 137, 74, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
  color: #5f1530;
  
  ${FeatureCard}:hover & {
    transform: scale(1.05);
    background-color: rgba(243, 137, 74, 0.2);
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 18px;
  color: #5f1530;
  margin: 0 0 10px 0;
  font-family: 'Merriweather', serif;
  font-weight: bold;
  position: relative;
  padding-bottom: 8px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background-color: #f3894a;
  }
`;

export const FeatureDescription = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin: 10px 0 0;
  max-width: 230px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 13px;
  }
`;
