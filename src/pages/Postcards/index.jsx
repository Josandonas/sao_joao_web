import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Title, TitleSection, SectionDivider, ToggleFormButton } from './styles';

// Hooks customizados
import usePostcards from './hooks/usePostcards';

// Componentes
import FilterSection from './components/FilterSection';
import PostcardGrid from './components/PostcardGrid';
import PostcardModal from './components/PostcardModal';
import SubmissionForm from './components/SubmissionForm';
import Pagination from './components/Pagination';
import { FaEnvelope } from 'react-icons/fa';

const Postcards = () => {
  const { t } = useTranslation();
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  
  const {
    postcards,
    selectedPostcard,
    activeFilter,
    setActiveFilter,
    openPostcardModal,
    closePostcardModal,
    sharePostcard,
    downloadPostcard,
    clearFilters,
    // Paginação
    currentPage,
    totalPages,
    totalItems,
    loading,
    error,
    nextPage,
    prevPage,
    goToPage,
    // Formulário de submissão
    formData,
    formErrors,
    handleFormChange,
    handleSubmit,
    isSubmitting,
    submitSuccess,
    submitError,
    yearsList
  } = usePostcards();
  
  // Abrir o modal do formulário de submissão
  const openSubmissionForm = () => {
    setShowSubmissionForm(true);
  };
  
  // Fechar o modal do formulário de submissão
  const closeSubmissionForm = () => {
    setShowSubmissionForm(false);
  };

  return (
    <Container>
      <TitleSection>
        <Title>{t('postcards.title')}</Title>
        <ToggleFormButton onClick={openSubmissionForm}>
          <FaEnvelope size={16} /> {t('postcards.showSubmissionForm')}
        </ToggleFormButton>
      </TitleSection>
      
      <SectionDivider />
      
      <FilterSection 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      
      <PostcardGrid 
        postcards={postcards}
        onPostcardClick={openPostcardModal}
        clearFilters={clearFilters}
        loading={loading}
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        loading={loading}
        error={error}
        onPageChange={goToPage}
      />
      
      {selectedPostcard && (
        <PostcardModal 
          postcard={selectedPostcard}
          onClose={closePostcardModal}
          onShare={sharePostcard}
          onDownload={downloadPostcard}
        />
      )}
      
      {showSubmissionForm && (
        <SubmissionForm
          formData={formData}
          formErrors={formErrors}
          handleFormChange={handleFormChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitSuccess={submitSuccess}
          submitError={submitError}
          yearsList={yearsList}
          onClose={closeSubmissionForm}
          isModal={true}
        />
      )}
    </Container>
  );
};

export default Postcards;
