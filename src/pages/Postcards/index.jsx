import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Title, TitleSection } from './styles';

// Hooks customizados
import usePostcards from './hooks/usePostcards';

// Componentes
import FilterSection from './components/FilterSection';
import PostcardGrid from './components/PostcardGrid';
import PostcardModal from './components/PostcardModal';

const Postcards = () => {
  const { t } = useTranslation();
  const {
    postcards,
    selectedPostcard,
    activeFilter,
    setActiveFilter,
    openPostcardModal,
    closePostcardModal,
    sharePostcard,
    downloadPostcard,
    clearFilters
  } = usePostcards();

  return (
    <Container>
      <TitleSection>
        <Title>Postais do Banho de São João</Title>
      </TitleSection>
      
      <FilterSection 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      
      <PostcardGrid 
        postcards={postcards}
        onPostcardClick={openPostcardModal}
        clearFilters={clearFilters}
      />
      
      {selectedPostcard && (
        <PostcardModal 
          postcard={selectedPostcard}
          onClose={closePostcardModal}
          onShare={sharePostcard}
          onDownload={downloadPostcard}
        />
      )}
    </Container>
  );
};

export default Postcards;
