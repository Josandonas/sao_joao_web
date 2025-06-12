import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  background-color: #5f1530;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-shadow: ${props => props.theme.shadows.medium};
  position: relative;
  z-index: 100;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: center; /* Centraliza as opções do navbar */
  gap: ${props => props.theme.spacing.md}; /* Adiciona espaçamento entre os itens */
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    margin-bottom: ${props => props.theme.spacing.md};
    justify-content: center;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

// Estilos base para links de navegação
const navLinkStyles = `
  color: #FFC56E;
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-family: var(--font-family-heading);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  border-radius: ${props => props.theme.borderRadius.small};
  display: block;
  
  &:hover {
    color: #FFC56E;
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  &.active {
    color: #5f1530;
    background-color: #FFC56E;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
    font-weight: 700;
  }
`;

export const NavItem = styled.div`
  margin: 0 ${props => props.theme.spacing.xs};
  min-width: 120px; /* Largura mínima para a caixa */
  text-align: center; /* Centraliza o texto dentro da caixa */
  position: relative; /* Para posicionar o ícone de viola */
  padding-top: 35px; /* Espaço para o ícone de viola */
  transition: all 0.3s ease;
  
  /* Adiciona o ícone de viola acima do item ativo */
  &::before {
    content: '';
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-30%);
    width: 70px; /* Tamanho ajustado */
    height: 70px; /* Tamanho ajustado */
    background-image: url('/assets/svg/Viola_Marrom.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    filter: drop-shadow(0 2px 4px rgba(255, 197, 110, 0.6)); /* Sombra dourada */
    animation: floatViola 3s ease-in-out infinite; /* Animação suave de flutuação */
    animation-play-state: paused; /* Inicia pausada */
  }
  
  /* Adiciona um efeito de brilho atrás do ícone */
  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(255, 197, 110, 0.6) 0%, rgba(255, 197, 110, 0) 70%);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: -1;
  }
  
  /* Mostra o ícone apenas quando o link está ativo */
  &:has(a.active)::before {
    opacity: 1;
    animation-play-state: running; /* Inicia a animação quando ativo */
  }
  
  /* Mostra o efeito de brilho quando o link está ativo */
  &:has(a.active)::after {
    opacity: 0.7;
    width: 28px;
    height: 28px;
    animation: pulseGlow 2s ease-in-out infinite alternate; /* Animação de pulso para o brilho */
  }
  
  @keyframes pulseGlow {
    0% { transform: translateX(-50%) scale(1); opacity: 0.5; }
    100% { transform: translateX(-50%) scale(1.2); opacity: 0.8; }
  }
  
  @keyframes floatViola {
    0% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-3px); }
    100% { transform: translateX(-50%) translateY(0); }
  }
  
  /* Efeito hover para o ícone */
  &:has(a.active):hover::before {
    filter: drop-shadow(0 3px 6px rgba(255, 197, 110, 0.8)) brightness(1.1);
    animation: floatViola 1s ease-in-out infinite alternate;
  }
  
  /* Efeito hover para o brilho */
  &:has(a.active):hover::after {
    animation-duration: 1.5s; /* Acelera a animação no hover */
  }
  
  a {
    ${props => navLinkStyles}
    width: 100%; /* Faz o link ocupar toda a largura da caixa */
    box-sizing: border-box; /* Garante que o padding não aumente o tamanho total */
  }
`;

export const LanguageSelector = styled.div`
  display: flex;
  flex: 0 0 auto;
  gap: ${props => props.theme.spacing.xs};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    justify-content: flex-start;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: ${props => props.theme.spacing.sm};
    margin-top: ${props => props.theme.spacing.sm};
  }
`;

export const LanguageButton = styled.button`
  background: transparent;
  border: 2px solid #FFC56E;
  color: #FFC56E;
  font-family: var(--font-family-heading);
  font-weight: 900;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  border-radius: ${props => props.theme.borderRadius.small};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }
  
  &.active {
    background-color: #FFC56E;
    color: #5f1530;
    border-color: #FFC56E;
  }
`;

export const NavButton = styled(Link)`
  ${props => navLinkStyles}
  min-width: 120px; /* Largura mínima para a caixa */
  text-align: center; /* Centraliza o texto dentro da caixa */
  box-sizing: border-box; /* Garante que o padding não aumente o tamanho total */
`;