import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Stories from './pages/Stories';
import Communities from './pages/Communities';
import Book from './pages/Book';
import Testimonials from './pages/Testimonials';
import Postcards from './pages/Postcards';
import Programacao from './pages/Programacao';
import Biblioteca from './pages/Biblioteca';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota raiz redireciona diretamente para o idioma português */}
      <Route path="/" element={<Navigate to="/pt" replace />} />
      
      {/* Rota de introdução removida */}
      
      {/* Rotas específicas para cada idioma com layout compartilhado */}
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="stories" element={<Stories />} />
        <Route path="communities" element={<Communities />} />
        <Route path="book" element={<Book />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="postcards" element={<Postcards />} />
        <Route path="programacao" element={<Programacao />} />
        <Route path="biblioteca" element={<Biblioteca />} />
      </Route>
      
      {/* Rota de página não encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
