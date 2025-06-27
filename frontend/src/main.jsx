import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './utils/i18n'; // Importa a configuração de i18n
import { TranslationProvider } from './contexts/TranslationContext'; // Importa o provider de traduções

// Importação do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/bootstrap-custom.css';
import './styles/bootstrap-carousel-custom.css'; // Novos estilos personalizados para o carrossel do Bootstrap
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles/customGallery.css"; // Estilos personalizados para o ImageGallery com ícone de fogueira
import './styles/global.css';
// Removidas importações do react-image-gallery que não são mais necessárias

// Criar o router com a flag future.useTransition
const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />
    }
  ],
  {
    future: {
      v7_startTransition: true
    }
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TranslationProvider>
      <RouterProvider router={router} />
    </TranslationProvider>
  </React.StrictMode>,
);
