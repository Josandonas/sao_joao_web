// Theme configuration for styled-components
const theme = {
  colors: {
    primary: '#ff6b01', // Laranja original da aplicação
    secondary: '#4772ec', // Azul original
    accent: '#800000', // Vermelho original
    background: '#ffffff',
    text: '#2a2a2a',
    textLight: '#585858',
    white: '#ffffff'
  },
  fonts: {
    body: "'Inter', 'Helvetica Neue', sans-serif",
    heading: "'Interstate', 'Inter', sans-serif",
    mono: "monospace"
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem',
    xxlarge: '2.5rem'
  },
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 700,
    black: 900
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem'
  },
  borderRadius: {
    small: '0.25rem',
    medium: '0.5rem',
    large: '1rem',
    full: '9999px'
  },
  shadows: {
    small: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    medium: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    large: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease'
  }
}

export default theme;
