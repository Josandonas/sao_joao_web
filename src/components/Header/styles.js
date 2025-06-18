import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  background-color: #5f1530;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.sm} 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  /* Estilos para o botão de toggle do menu mobile */
  .custom-toggler {
    border-color: rgba(255, 197, 110, 0.5) !important;
    
    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 197, 110, 0.9)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
    }
    
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(255, 197, 110, 0.25) !important;
    }
  }
  
  /* Animação para o menu mobile */
  .navbar-collapse {
    transition: all 0.3s ease-in-out;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

export const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: center; /* Centraliza as opções do navbar */
  gap: ${props => props.theme.spacing.md}; /* Adiciona espaçamento entre os itens */
  padding-top: 4%; /* Espaço para acomodar o ícone da viola acima dos itens */
  
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
  
  /* Estilos responsivos para dispositivos móveis */
  @media (max-width: 991px) {
    padding: 0.5rem 1rem;
    margin: 0.25rem 0;
    width: 100%;
    text-align: left;
    font-size: 1rem;
    border-radius: 4px;
    
    &.active {
      padding-left: 2.5rem; /* Espaço para a viola */
      transform: none;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #FFC56E;
    }
    
    &:hover {
      transform: none;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const NavItem = styled.div`
  margin: 0 ${props => props.theme.spacing.xs};
  min-width: 120px; /* Largura mínima para a caixa */
  text-align: center; /* Centraliza o texto dentro da caixa */
  position: relative; /* Para posicionar o ícone de viola */
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  
  /* Estilos responsivos para dispositivos móveis */
  @media (max-width: 991px) { /* Bootstrap lg breakpoint */
    width: 100%;
    margin: 0.25rem 0;
    flex-direction: row;
    justify-content: center;
    min-width: auto;
    padding: 0.25rem 0;
  }
  
  /* Adiciona o ícone de viola acima do item ativo em desktop e ao lado em mobile */
  &::before {
    content: '';
    position: absolute;
    bottom: calc(100% + 10px); /* Posiciona acima do item em desktop com espaço fixo */
    left: 50%;
    transform: translateX(-50%); /* Centraliza horizontalmente */
    width: 80px; /* Tamanho fixo para desktop */
    height: 80px; /* Tamanho fixo para desktop */
    background-image: url('/assets/svg/Viola_Marrom.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    filter: drop-shadow(0 2px 4px rgba(255, 197, 110, 0.6)); /* Sombra dourada */
    
    /* Reposiciona a viola para dispositivos móveis */
    @media (max-width: 991px) {
      bottom: auto;
      left: 0.5rem; /* Posiciona à esquerda do item */
      top: 50%;
      transform: translateY(-50%) scale(0.6); /* Centraliza verticalmente e reduz tamanho */
      width: 30px;
      height: 30px;
      z-index: 2; /* Garante que a viola fique acima do fundo */
    }
  }
  
  /* Adiciona um efeito de brilho atrás do ícone */
  &::after {
    content: '';
    position: absolute;
    bottom: calc(100% + 20px); /* Posicionado em relação ao item, alinhado com o ícone */
    left: 50%;
    transform: translateX(-50%);
    width: 28px; /* Tamanho fixo para o brilho */
    height: 28px; /* Tamanho fixo para o brilho */
    background: radial-gradient(circle, rgba(255, 197, 110, 0.6) 0%, rgba(255, 197, 110, 0) 70%);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: -1;
    
    /* Reposiciona o brilho para dispositivos móveis */
    @media (max-width: 991px) {
      bottom: auto;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  
  /* Mostra o ícone quando o link está ativo */
  &:has(a.active)::before {
    opacity: 1;
  }
  
  /* Mostra o efeito de brilho quando o link está ativo */
  &:has(a.active)::after {
    opacity: 0.7;
    animation: pulseGlow 2s ease-in-out infinite alternate; /* Animação de pulso para o brilho */
    
    @media (max-width: 991px) {
      width: 20px;
      height: 20px;
    }
  }
  
  @keyframes pulseGlow {
    0% { transform: translateX(-50%) scale(1); opacity: 0.5; }
    100% { transform: translateX(-50%) scale(1.2); opacity: 0.8; }
  }
  
  /* Ajuste específico para o item Programação Oficial que pode quebrar em duas linhas */
  &:has(a.programacao-item) {
    &::before {
      bottom: calc(100% + 10px); /* Mantém a posição consistente */
    }
    
    &::after {
      bottom: calc(100% + 20px); /* Mantém a posição consistente */
    }
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
  align-items: center;
  margin-left: auto;
  align-self: flex-end;
  position: relative;
  padding: 1%;
  .language-dropdown-container {
    position: relative;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: ${props => props.theme.spacing.sm};
    margin-left: 0;
    justify-content: center;
    width: 100%;
  }
`;

export const GlobeIcon = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border: 2px solid #FFC56E;
  border-radius: ${props => props.theme.borderRadius.small};
  transition: all ${props => props.theme.transitions.default};
  background-color: transparent;
  color: #FFC56E;
  font-family: var(--font-family-heading);
  font-weight: 700;
  
  svg {
    color: #FFC56E;
  }
  
  span {
    font-weight: 500;
    margin-left: 5px;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }
`;

export const LanguageDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: #5f1530;
  border: 2px solid #FFC56E;
  border-radius: ${props => props.theme.borderRadius.small};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  min-width: 160px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all ${props => props.theme.transitions.default};
  overflow: hidden;
  
  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

export const LanguageOption = styled.div`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  color: #FFC56E;
  font-family: var(--font-family-heading);
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255, 197, 110, 0.2);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: rgba(255, 197, 110, 0.15);
  }
  
  &.active {
    background-color: rgba(255, 197, 110, 0.25);
    font-weight: 700;
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