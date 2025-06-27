import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useBookContext } from '../context/BookContext';

// Estilização do componente
const SelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const SelectLabel = styled.span`
  font-size: 0.95rem;
  color: #333;
`;

const StyledSelect = styled.select`
  padding: 0.5rem 1rem;
  background-color: #8b1e3f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  appearance: none; /* Remove estilo padrão do navegador */
  position: relative;
  min-width: 120px;
  text-align: center;
  
  /* Seta customizada */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 1em;
  padding-right: 2.5rem;
  
  &:hover {
    background-color: #6d1832;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(139, 30, 63, 0.25);
  }
  
  /* Estilo para as opções */
  option {
    background-color: white;
    color: #333;
    padding: 0.5rem;
  }
`;

const LegacyIndicator = styled.span`
  color: #ffc107;
  margin-left: 0.25rem;
  font-size: 0.8rem;
`;

/**
 * Componente para seleção do ano do livro
 * @returns {JSX.Element|null} - Componente renderizado ou null se não houver múltiplos livros
 */
const BookYearSelector = () => {
  const { t } = useTranslation();
  const { books } = useBookContext();
  const { allBooks, selectedBook, selectBookByYear, loading, error } = books;
  
  // Não exibe o seletor se estiver carregando, houver erro, ou não houver livros
  if (loading || error || !allBooks || allBooks.length === 0) {
    return null;
  }
  
  // Não exibe o seletor se houver apenas um livro (apenas o legado)
  if (allBooks.length <= 1) {
    return null;
  }
  
  // Função para lidar com a mudança no dropdown
  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    selectBookByYear(selectedYear);
  };
  
  // Exibe o seletor como dropdown quando há múltiplos livros disponíveis
  return (
    <SelectorContainer>
      <SelectLabel>{t('book.yearSelector.title', 'Selecione o ano:')}</SelectLabel>
      <StyledSelect 
        value={selectedBook?.year || ''}
        onChange={handleYearChange}
        aria-label={t('book.yearSelector.selectYear', 'Selecione um ano')}
      >
        {allBooks.map(book => (
          <option key={book.year} value={book.year}>
            {book.year}
            {book.isLegacy && ` (${t('book.yearSelector.legacy', 'Edição Original')})`}
          </option>
        ))}
      </StyledSelect>
    </SelectorContainer>
  );
};

export default BookYearSelector;
