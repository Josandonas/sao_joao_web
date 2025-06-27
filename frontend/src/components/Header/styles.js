import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  background: linear-gradient(1deg, #5f1530, #a00036);
  padding:  0;
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
  flex-wrap: nowrap; /* Impede a quebra de linha para os itens no desktop */
  flex: 1;
  justify-content: center; /* Centraliza os itens no container */
  gap: 10px; /* Espaçamento fixo entre os itens para evitar problemas de cálculo */
  padding-top: 50px; /* Espaço fixo para acomodar o ícone da viola acima dos itens */
  overflow-x: visible; /* Permite que os itens sejam visíveis mesmo se ultrapassarem o container */

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: ${props => props.theme.spacing.md};
    justify-content: center;
    padding-top: 20px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }

  /* Estratégia para controlar o comportamento responsivo antes da quebra para mobile */
  @media (max-width: 1300px) and (min-width: 992px) {
    gap: 8px; /* Espaçamento fixo em pixels para evitar problemas de cálculo */
  }

  @media (max-width: 1200px) and (min-width: 992px) {
    gap: 6px; /* Espaçamento fixo em pixels */
  }

  @media (max-width: 1100px) and (min-width: 992px) {
    gap: 4px; /* Espaçamento fixo em pixels */
  }
`;

// Estilos base para links de navegação
const navLinkStyles = `
  color: #FFC56E;
  text-decoration: none;
  padding: 10px;
  font-family: var(--font-family-heading);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  border-radius: 4px;
  display: block;
  text-align: center;

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

  /* Estratégia para controlar o comportamento responsivo antes da quebra para mobile */
  @media (max-width: 1400px) and (min-width: 1201px) {
    padding: 0.35rem 0.45rem;
    font-size: 0.9rem;
  }

  @media (max-width: 1300px) and (min-width: 1101px) {
    padding: 0.3rem 0.4rem;
    font-size: 0.85rem;
  }

  @media (max-width: 1200px) and (min-width: 992px) {
    padding: 0.25rem 0.35rem;
    font-size: 0.8rem;
  }

  @media (max-width: 1100px) and (min-width: 992px) {
    padding: 0.2rem 0.3rem;
    font-size: 0.75rem;
    letter-spacing: 0;
  }

  /* Estilos específicos para o item Programação Oficial */
  &.programacao-item {
    font-size: 0.9rem;
    white-space: normal; /* Permite quebra de texto */
    hyphens: auto; /* Adiciona hifenização */
    word-break: break-word;
    line-height: 1.2;

    @media (max-width: 1200px) and (min-width: 992px) {
      font-size: 0.8rem;
    }

    @media (max-width: 1100px) and (min-width: 992px) {
      font-size: 0.75rem;
    }
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
  margin: 0 5px; /* Margem fixa em pixels */
  min-width: 100px; /* Largura mínima menor para a caixa */
  text-align: center; /* Centraliza o texto dentro da caixa */
  position: relative; /* Para posicionar o ícone de viola */
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;

  /* Classe para itens que devem se adaptar responsivamente */
  &.nav-item-responsive {
    flex: 1; /* Distribui o espaço igualmente */
    min-width: 80px; /* Largura mínima ainda menor */
    max-width: 120px; /* Limita a largura máxima */
    white-space: nowrap; /* Impede quebra de texto */
    overflow: visible; /* Garante que o texto seja visível */
  }

  /* Classe especial para o item Programação Oficial */
  &.programacao-wrapper {
    flex: 1.2; /* Um pouco mais de espaço para este item */
    white-space: normal; /* Permite quebra de texto */
    min-width: 130px; /* Garante largura mínima maior */
    max-width: 150px; /* Limita a largura máxima */
  }

  /* Estilos responsivos para dispositivos móveis */
  @media (max-width: 991px) { /* Bootstrap lg breakpoint */
    margin: 0.25rem 0;
    flex-direction: row;
    justify-content: center;
    min-width: auto;
    padding: 0.25rem 0;

    &.nav-item-responsive {
      white-space: normal; /* Permite quebra de texto no mobile */
      max-width: none; /* Remove limite de largura no mobile */
    }

    &.programacao-wrapper {
      max-width: none; /* Remove limite de largura no mobile */
    }
  }

  /* Estratégia para controlar o comportamento responsivo antes da quebra para mobile */
  @media (max-width: 1300px) and (min-width: 992px) {
    min-width: 90px; /* Reduz a largura mínima */
    margin: 0 4px; /* Margem fixa em pixels */
  }

  @media (max-width: 1200px) and (min-width: 992px) {
    min-width: 80px; /* Reduz a largura mínima */
    margin: 0 3px; /* Margem fixa em pixels */
  }

  @media (max-width: 1100px) and (min-width: 992px) {
    min-width: 70px; /* Reduz ainda mais a largura mínima */
    margin: 0 2px; /* Margem fixa em pixels */
  }

  /* Adiciona o ícone de viola acima do item ativo em desktop e ao lado em mobile */
  &::before {
    content: '';
    position: absolute;
    display: none; /* Adicione esta linha */
    bottom: calc(100% + 15px); /* Aumentado o espaço para melhor visualização */
    left: 50%;
    transform: translateX(-50%); /* Centraliza horizontalmente */
    width: 60px; /* Tamanho reduzido para evitar sobreposição */
    height: 60px; /* Tamanho reduzido para evitar sobreposição */
    background-image: url('/assets/svg/Viola_Marrom.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    filter: drop-shadow(0 2px 4px rgba(255, 197, 110, 0.6)); /* Sombra dourada */
    z-index: 10; /* Garante que a viola fique acima de outros elementos */

    /* Ajustes para telas intermediárias */
    @media (max-width: 1200px) and (min-width: 992px) {
      width: 50px;
      height: 50px;
      bottom: calc(100% + 12px);
    }

    @media (max-width: 1100px) and (min-width: 992px) {
      width: 45px;
      height: 45px;
      bottom: calc(100% + 10px);
    }

    /* Reposiciona a viola para dispositivos móveis */
    @media (max-width: 991px) {
      bottom: auto;
      left: 0.5rem; /* Posiciona à esquerda do item */
      top: 50%;
      transform: translateY(-50%) scale(0.6); /* Centraliza verticalmente e reduz tamanho */
      width: 30px;
      height: 30px;
      z-index: 2; /* Garante que a viola fique acima do fundo */
      opacity: 1 !important; /* Garante que a viola seja sempre visível no mobile quando ativo */
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

    /* Ajustes para telas intermediárias */
    @media (max-width: 1200px) and (min-width: 992px) {
      width: 25px;
      height: 25px;
      bottom: calc(100% + 18px);
    }

    @media (max-width: 1100px) and (min-width: 992px) {
      width: 22px;
      height: 22px;
      bottom: calc(100% + 16px);
    }

    /* Reposiciona o brilho para dispositivos móveis */
    @media (max-width: 991px) {
      bottom: auto;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 15px;
      height: 15px;
    }
  }

  /* Mostra o ícone de viola quando o link está ativo */
  &:has(a.active)::before {
    opacity: 1 !important;
    visibility: visible !important;
    display: block !important;
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

  @media (max-width: 991px) {
    @keyframes pulseGlow {
      0% { transform: translateY(-50%) scale(1); opacity: 0.5; }
      100% { transform: translateY(-50%) scale(1.2); opacity: 0.8; }
    }
  }

  /* Ajuste específico para o item Programação Oficial que pode quebrar em duas linhas */
  &:has(a.programacao-item) {
    &::before {
      bottom: calc(100% + 10px); /* Mantém a posição consistente */
    }

    &::after {
      bottom: calc(100% + 20px); /* Mantém a posição consistente */
    }

    @media (max-width: 1200px) and (min-width: 992px) {
      &::before {
        bottom: calc(100% + 8px);
      }

      &::after {
        bottom: calc(100% + 18px);
      }
    }

    @media (max-width: 1100px) and (min-width: 992px) {
      &::before {
        bottom: calc(100% + 6px);
      }

      &::after {
        bottom: calc(100% + 16px);
      }
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
    /* Faz o link ocupar toda a largura da caixa */
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
  
  /* Estilos para mobile */
  @media (max-width: 991px) {
    margin-top: 0;
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
  
  /* Ajustes para mobile */
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    right: 0;
    width: 160px;
    max-width: 90vw;
  }
  
  /* Posicionamento especial para o dropdown fixo */
  .language-selector-fixed & {
    top: calc(100% + 5px);
    right: 0;
  }
`;

export const LanguageOption = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  background: none;
  border: none;
  color: #FFC56E;
  font-family: var(--font-family-heading);
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 197, 110, 0.2);
    font-weight: 700;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 197, 110, 0.3);
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: ${props => props.theme.spacing.sm};
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const NavLink = styled(Link)`
  ${props => navLinkStyles}
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: ${props => props.theme.spacing.lg};

  img {
    height: 60px;
    margin-right: ${props => props.theme.spacing.sm};
  }

  h1 {
    color: ${props => props.theme.colors.white};
    font-size: 1.5rem;
    margin: 0;
    font-weight: 700;
    font-family: var(--font-family-heading);
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-bottom: ${props => props.theme.spacing.sm};
    margin-right: 0;
    justify-content: center;
  }
`;

export const MobileToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

export const LanguageButton = styled.button`
  background: transparent;
  border: 1px solid #FFC56E;
  color: #FFC56E;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: 4px 8px;
  margin: 0 3px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  
  .flag-icon {
    margin-right: 4px;
    width: 16px !important;
    height: auto !important;
  }
  
  &:hover {
    background-color: rgba(255, 197, 110, 0.2);
  }
  
  &.active {
    background-color: #FFC56E;
    color: #5f1530;
    
    .flag-icon {
      color: #5f1530;
    }
  }
  
  @media (max-width: 991px) {
    padding: 3px 6px;
    font-size: 0.75rem;
    margin: 0 2px;
    min-width: 45px;
    
    .flag-icon {
      width: 14px !important;
      margin-right: 2px;
    }
  }
`;


export const NavButton = styled.button`
  background: none;
  border: none;
  color: #FFC56E;
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-family: var(--font-family-heading);
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  border-radius: ${props => props.theme.borderRadius.small};
  display: block;
  width: 100%;
  text-align: center;

  &:hover {
    color: #FFC56E;
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  @media (max-width: 1200px) and (min-width: 992px) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    font-size: 1.3rem;
  }

  @media (max-width: 1100px) and (min-width: 992px) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.xs};
    font-size: 1.2rem;
  }

  @media (max-width: 991px) {
    padding: 0.5rem 1rem;
    margin: 0.25rem 0;
    text-align: left;
    font-size: 1rem;
    border-radius: 4px;

    &:hover {
      transform: none;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

// Animação para o ícone da viola
export const floatViola = `
  @keyframes floatViola {
    0% { transform: translateX(-50%) translateY(0); }
    100% { transform: translateX(-50%) translateY(-5px); }
  }

  @media (max-width: 991px) {
    @keyframes floatViola {
      0% { transform: translateY(-50%) scale(0.6) translateX(0); }
      100% { transform: translateY(-50%) scale(0.6) translateX(3px); }
    }
  }
`;
