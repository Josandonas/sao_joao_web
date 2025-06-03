import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Title,
  Introduction,
  PostcardGrid,
  PostcardItem,
  PostcardImage,
  PostcardOverlay,
  PostcardTitle,
  PostcardModal,
  ModalContent,
  CloseButton,
  ModalHeader,
  ModalBody,
  FullPostcardImage,
  PostcardInfo,
  PostcardDescription,
  PostcardMetadata,
  MetadataItem,
  ShareContainer,
  ShareButton,
  DownloadButton,
  Filters,
  FilterButton,
  SearchInput,
  NoResults
} from './styles';

const Postcards = () => {
  const { t } = useTranslation();
  const [selectedPostcard, setSelectedPostcard] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dados reais dos postais usando os arquivos migrados da aplicação original
  const postcardsData = [
    {
      id: 1,
      title: 'Procissão Fluvial',
      image: '/assets/images/postcards/celebrations/cartao2.jpg',
      description: 'A procissão fluvial do Banho de São João em Corumbá, com barcos decorados navegando pelo Rio Paraguai durante o entardecer.',
      location: 'Rio Paraguai, Corumbá, MS',
      author: 'Maria Silva',
      year: '2012',
      category: 'celebrations'
    },
    {
      id: 2,
      title: 'Celebração Comunitária',
      image: '/assets/images/postcards/celebrations/cartao3.jpg',
      description: 'Celebração comunitária durante o festival de São João, com decorações típicas e participantes reunidos.',
      location: 'Ladário, MS',
      author: 'João Pereira',
      year: '2012',
      category: 'celebrations'
    },
    {
      id: 3,
      title: 'Festa na Margem do Rio',
      image: '/assets/images/postcards/celebrations/cartao4.jpg',
      description: 'Moradores celebrando o Banho de São João às margens do Rio Paraguai, com fogueiras e música tradicional.',
      location: 'Miranda, MS',
      author: 'Ana Coelho',
      year: '2012',
      category: 'celebrations'
    },
    {
      id: 4,
      title: 'Ritual do Banho',
      image: '/assets/images/postcards/ritual/cartao5.jpg',
      description: 'O momento sagrado do banho da imagem de São João Batista nas águas do Rio Paraguai durante a noite de 23 para 24 de junho.',
      location: 'Porto Geral, Corumbá, MS',
      author: 'Carlos Ramires',
      year: '2012',
      category: 'ritual'
    },
    {
      id: 5,
      title: 'Promessas e Devoções',
      image: '/assets/images/postcards/ritual/cartao6.jpg',
      description: 'Devotos cumprindo promessas e participando dos rituais tradicionais durante a celebração de São João.',
      location: 'Aquidauana, MS',
      author: 'Josefa Santos',
      year: '2012',
      category: 'ritual'
    },
    {
      id: 6,
      title: 'Dança do Siriri',
      image: '/assets/images/postcards/dances/cartao7.jpg',
      description: 'Apresentação da tradicional dança do siriri, expressão cultural típica das festividades pantaneiras.',
      location: 'Porto Murtinho, MS',
      author: 'Roberto Oliveira',
      year: '2012',
      category: 'dances'
    },
    {
      id: 7,
      title: 'Dançadores Regionais',
      image: '/assets/images/postcards/dances/cartao8.jpg',
      description: 'Grupo de dançadores em trajes típicos apresentando coreografias tradicionais do folclore pantaneiro.',
      location: 'Poconé, MT',
      author: 'Luiza Mendes',
      year: '2012',
      category: 'dances'
    },
    {
      id: 8,
      title: 'Músicos Tradicionais',
      image: '/assets/images/postcards/music/cartao9.jpg',
      description: 'Grupo de músicos com instrumentos típicos como viola de cocho, ganzá e mocho, tocando ritmos tradicionais.',
      location: 'Cáceres, MT',
      author: 'Pedro Guimarães',
      year: '2012',
      category: 'music'
    },
    {
      id: 9,
      title: 'Viola de Cocho',
      image: '/assets/images/postcards/music/cartao10.jpg',
      description: 'Músico tocando a tradicional viola de cocho, instrumento característico do Pantanal, feito de tronco escavado.',
      location: 'Corumbá, MS',
      author: 'Teresa Albuquerque',
      year: '2012',
      category: 'music'
    },
    {
      id: 10,
      title: 'Altar Decorado',
      image: '/assets/images/postcards/altars/cartao11.jpg',
      description: 'Altar tradicional ricamente decorado com flores, fitas e velas em preparação para a cerimônia do Banho de São João.',
      location: 'Rio Paraguai, Corumbá, MS',
      author: 'Fernando Costa',
      year: '2012',
      category: 'altars'
    },
    {
      id: 11,
      title: 'Oferendas Sagradas',
      image: '/assets/images/postcards/altars/cartao12.jpg',
      description: 'Mesa com oferendas tradicionais para São João, incluindo frutas, ervas medicinais e velas decoradas.',
      location: 'Bonito, MS',
      author: 'Antonia Pires',
      year: '2012',
      category: 'altars'
    },
    {
      id: 12,
      title: 'Símbolos da Festa',
      image: '/assets/images/postcards/symbols/cartao13.jpg',
      description: 'Elementos simbólicos utilizados durante as festividades de São João, representando a tradição e fé popular.',
      location: 'Cuiabá, MT',
      author: 'José Silveira',
      year: '2012',
      category: 'symbols'
    },
    {
      id: 13,
      title: 'Mastro de São João',
      image: '/assets/images/postcards/symbols/cartao14.jpg',
      description: 'O tradicional mastro erguido durante as festividades de São João, decorado com oferendas e símbolos sagrados.',
      location: 'Cuiabá, MT',
      author: 'Paulo Mendes',
      year: '2012',
      category: 'symbols'
    }
  ];
  
  // Abrir modal com o postal selecionado
  const openPostcardModal = (postcard) => {
    setSelectedPostcard(postcard);
    document.body.style.overflow = 'hidden';
  };
  
  // Fechar o modal
  const closePostcardModal = () => {
    setSelectedPostcard(null);
    document.body.style.overflow = 'auto';
  };
  
  // Função de compartilhamento (simulada)
  const sharePostcard = () => {
    // Em uma implementação real, integraria com a Web Share API ou redes sociais
    alert('Função de compartilhamento seria implementada aqui!');
  };
  
  // Função de download (simulada)
  const downloadPostcard = () => {
    // Em uma implementação real, faria o download da imagem
    alert('Download do postal iniciado!');
  };
  
  // Filtrar postais por categoria e busca
  const filteredPostcards = postcardsData
    .filter(postcard => {
      // Filtro por categoria
      if (activeFilter !== 'all' && postcard.category !== activeFilter) {
        return false;
      }
      
      // Filtro por busca
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          postcard.title.toLowerCase().includes(query) ||
          postcard.description.toLowerCase().includes(query) ||
          postcard.location.toLowerCase().includes(query) ||
          postcard.author.toLowerCase().includes(query) ||
          postcard.year.includes(query)
        );
      }
      
      return true;
    });

  return (
    <Container>
      <Title>Postais do Banho de São João</Title>
      
      <Introduction>
        <p>Explore esta coleção de imagens que retratam os diversos aspectos da celebração do Banho de São João no Pantanal. Compartilhe ou faça o download dos postais para recordar e divulgar esta rica tradição cultural.</p>
      </Introduction>
      
      <Filters>
        <div className="filter-buttons">
          <FilterButton 
            isActive={activeFilter === 'all'} 
            onClick={() => setActiveFilter('all')}
          >
            Todos
          </FilterButton>
          <FilterButton 
            isActive={activeFilter === 'celebrations'} 
            onClick={() => setActiveFilter('celebrations')}
          >
            Celebrações
          </FilterButton>
          <FilterButton 
            isActive={activeFilter === 'ritual'} 
            onClick={() => setActiveFilter('ritual')}
          >
            Ritual
          </FilterButton>
          <FilterButton 
            isActive={activeFilter === 'dances'} 
            onClick={() => setActiveFilter('dances')}
          >
            Danças
          </FilterButton>
          <FilterButton 
            isActive={activeFilter === 'music'} 
            onClick={() => setActiveFilter('music')}
          >
            Música
          </FilterButton>
          <FilterButton 
            isActive={activeFilter === 'altars'} 
            onClick={() => setActiveFilter('altars')}
          >
            Altares
          </FilterButton>
          <FilterButton 
            isActive={activeFilter === 'symbols'} 
            onClick={() => setActiveFilter('symbols')}
          >
            Símbolos
          </FilterButton>
        </div>
        
        <SearchInput 
          type="text"
          placeholder="Buscar postais..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Filters>
      
      {filteredPostcards.length > 0 ? (
        <PostcardGrid>
          {filteredPostcards.map(postcard => (
            <PostcardItem key={postcard.id} onClick={() => openPostcardModal(postcard)}>
              <PostcardImage src={postcard.image} alt={postcard.title} />
              <PostcardOverlay>
                <PostcardTitle>{postcard.title}</PostcardTitle>
              </PostcardOverlay>
            </PostcardItem>
          ))}
        </PostcardGrid>
      ) : (
        <NoResults>
          <p>Nenhum postal encontrado com os filtros atuais.</p>
          <button onClick={() => {
            setActiveFilter('all');
            setSearchQuery('');
          }}>
            Limpar filtros
          </button>
        </NoResults>
      )}
      
      {/* Modal para exibição detalhada do postal */}
      {selectedPostcard && (
        <PostcardModal>
          <ModalContent>
            <CloseButton onClick={closePostcardModal}>&times;</CloseButton>
            
            <ModalHeader>
              <h2>{selectedPostcard.title}</h2>
            </ModalHeader>
            
            <ModalBody>
              <FullPostcardImage src={selectedPostcard.image} alt={selectedPostcard.title} />
              
              <PostcardInfo>
                <PostcardDescription>
                  {selectedPostcard.description}
                </PostcardDescription>
                
                <PostcardMetadata>
                  <MetadataItem>
                    <strong>Local:</strong> {selectedPostcard.location}
                  </MetadataItem>
                  <MetadataItem>
                    <strong>Autor:</strong> {selectedPostcard.author}
                  </MetadataItem>
                  <MetadataItem>
                    <strong>Ano:</strong> {selectedPostcard.year}
                  </MetadataItem>
                </PostcardMetadata>
                
                <ShareContainer>
                  <ShareButton onClick={sharePostcard}>
                    Compartilhar
                  </ShareButton>
                  <DownloadButton onClick={downloadPostcard}>
                    Download
                  </DownloadButton>
                </ShareContainer>
              </PostcardInfo>
            </ModalBody>
          </ModalContent>
        </PostcardModal>
      )}
    </Container>
  );
};

export default Postcards;
