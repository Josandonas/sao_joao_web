import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import LanguageSelector from './pages/LanguageSelector';
import Intro from './pages/Intro';
import Home from './pages/Home';
import Stories from './pages/Stories';
import Communities from './pages/Communities';
import Book from './pages/Book';
import Testimonials from './pages/Testimonials';
import Postcards from './pages/Postcards';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota raiz redireciona para a seleção de idioma */}
      <Route path="/" element={<Navigate to="/language-selector" replace />} />
      
      {/* Página de seleção de idioma */}
      <Route path="/language-selector" element={<LanguageSelector />} />
      
      {/* Rotas de introdução para cada idioma */}
      <Route path="/intro/:lang" element={<Intro />} />
      
      {/* Rotas específicas para cada idioma com layout compartilhado */}
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="stories" element={<Stories />} />
        <Route path="communities" element={<Communities />} />
        <Route path="book" element={<Book />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="postcards" element={<Postcards />} />
      </Route>
      
      {/* Rota de página não encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
