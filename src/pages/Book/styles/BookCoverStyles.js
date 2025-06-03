import styled from 'styled-components';

export const BookCover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 0;
  margin-top: 0;
  margin-bottom: ${props => props.theme.spacing.sm};
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  
  .book-cover-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
    padding: ${props => props.theme.spacing.md};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    .book-cover-content {
      flex-direction: row;
      align-items: flex-start;
      gap: ${props => props.theme.spacing.xl};
    }
  }
`;

export const CoverImage = styled.img`
  width: 280px;
  height: auto;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  object-fit: cover;
  aspect-ratio: 3/4;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: 300px;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    width: 350px;
  }
`;

export const BookInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${props => props.theme.spacing.lg};
  max-width: 500px;
  
  .book-title-section {
    margin-bottom: ${props => props.theme.spacing.md};
    
    h2 {
      font-family: ${props => props.theme.fonts.heading};
      font-size: ${props => props.theme.fontSizes.xxlarge};
      color: ${props => props.theme.colors.primary};
      margin-bottom: ${props => props.theme.spacing.sm};
      line-height: 1.2;
      font-weight: ${props => props.theme.fontWeights.bold};
    }
    
    h3 {
      font-family: ${props => props.theme.fonts.heading};
      font-size: ${props => props.theme.fontSizes.large};
      color: ${props => props.theme.colors.secondary};
      font-weight: ${props => props.theme.fontWeights.light};
    }
  }
  
  .book-description {
    margin-bottom: ${props => props.theme.spacing.lg};
    
    p {
      font-family: ${props => props.theme.fonts.body};
      font-size: ${props => props.theme.fontSizes.medium};
      color: ${props => props.theme.colors.text};
      line-height: 1.8;
      text-align: justify;
    }
  }
  
  .book-details {
    background-color: ${props => props.theme.colors.backgroundLight};
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.medium};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    margin-top: auto;
    
    .detail-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: ${props => props.theme.spacing.sm};
      padding-bottom: ${props => props.theme.spacing.sm};
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      
      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }
      
      .detail-label {
        font-weight: ${props => props.theme.fontWeights.bold};
        color: ${props => props.theme.colors.secondary};
      }
      
      .detail-value {
        color: ${props => props.theme.colors.text};
      }
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 100%;
    margin-top: ${props => props.theme.spacing.lg};
    
    .book-title-section {
      text-align: center;
      
      h2 {
        font-size: ${props => props.theme.fontSizes.xlarge};
      }
      
      h3 {
        font-size: ${props => props.theme.fontSizes.medium};
      }
    }
    
    .book-description p {
      font-size: ${props => props.theme.fontSizes.medium};
      text-align: center;
    }
  }
`;

export const CoverActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  justify-content: center;
  margin: 0;
  padding: 0.75rem;
  background: linear-gradient(to right, #f5f5f5, #f0f0f0, #f5f5f5);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) and (max-width: ${props => props.theme.breakpoints.lg}) {
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;
