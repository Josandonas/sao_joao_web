import styled from 'styled-components';

export const PostcardItemContainer = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.4s ease;
  height: 300px;
  background-color: white;
  
  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    z-index: -2;
    background: linear-gradient(135deg, #5f1530, #b5003e);
    border-radius: 14px;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    
    &:after {
      opacity: 1;
    }
  }
`;

export const PostcardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;

  ${PostcardItemContainer}:hover & {
    transform: scale(1.08);
  }
`;

export const PostcardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9));
  padding: 25px 20px 20px;
  color: #fff;
  transition: all 0.4s ease;
  transform: translateY(0);
  opacity: 1;
  height: auto;
  min-height: 25%;
  display: flex;
  align-items: flex-end;
`;

export const PostcardTitle = styled.h3`
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
  letter-spacing: 0.7px;
  position: relative;
  padding-bottom: 10px;
  color: white;
  max-width: 100%;
  display: block;
  text-align: left;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, #ff6b01, rgba(255, 107, 1, 0.5));
    transition: width 0.3s ease;
  }
  
  ${PostcardItemContainer}:hover &:after {
    width: 80px;
  }
`;
