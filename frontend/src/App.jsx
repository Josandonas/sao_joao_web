import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppRoutes from './routes';
import theme from './styles/theme';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
