import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Title,
  Introduction,
  TestimonialsGrid,
  TestimonialCard,
  TestimonialImage,
  TestimonialContent,
  TestimonialName,
  TestimonialLocation,
  TestimonialQuote,
  TestimonialVideo,
  VideoModal,
  ModalContent,
  CloseButton,
  VideoContainer,
  Categories,
  CategoryButton,
  RecordButton,
  RecordingForm,
  FormTitle,
  FormGroup,
  Label,
  Input,
  TextArea,
  SubmitButton
} from './styles';

const Testimonials = () => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const videoRef = useRef(null);
  
  // Dados de depoimentos usando os vídeos reais migrados (formato FLV)
  const testimonialData = [
    {
      id: 1,
      name: 'Alfredo Tadeu Ortiz Ferraz',
      location: 'Corumbá, MS',
      image: '/assets/images/testimonials/persons/alfredo_tadeu.jpg', // Ainda não temos a foto real do Alfredo
      quote: 'Minha família celebra o Banho de São João há cinco gerações. É uma tradição que nos conecta com nossos ancestrais e mantém viva nossa cultura pantaneira.',
      videoUrl: '/assets/videos/testimonials/alfredo-c.flv',
      category: 'traditions'
    },
    {
      id: 2,
      name: 'Bianca Machado',
      location: 'Ladário, MS',
      image: '/assets/images/testimonials/persons/bianca_machado.jpg', // Usando imagem real migrada
      quote: 'Como moradora ribeirinha, sempre tive uma relação especial com o rio. O Banho de São João é um momento de agradecer pela abundância que as águas nos proporcionam.',
      videoUrl: '/assets/videos/testimonials/bianca-c.flv',
      category: 'personal'
    },
    {
      id: 3,
      name: 'Eliane - Elinete Escobar',
      location: 'Porto Murtinho, MS',
      image: '/assets/images/testimonials/persons/eliane_escobar.jpg', // Usando imagem real migrada
      quote: 'Preservar as tradições do Banho de São João é preservar nossa identidade cultural. Nas celebrações, nossa música acompanha a procissão e as danças tradicionais.',
      videoUrl: '/assets/videos/testimonials/eliane-c.flv',
      category: 'cultural'
    },
    {
      id: 4,
      name: 'Epifania da Silva Bastos',
      location: 'Campo Grande, MS',
      image: '/assets/images/testimonials/persons/epifania.jpg', // Usando imagem real migrada
      quote: 'Como moradora antiga, encontro no Banho de São João um exemplo perfeito do sincretismo religioso e cultural que forma a identidade pantaneira brasileira.',
      videoUrl: '/assets/videos/testimonials/epifania-c.flv',
      category: 'traditions'
    },
    {
      id: 4,
      name: 'Fernando Vanucci',
      location: 'Aquidauana, MS',
      image: '/assets/images/testimonials/persons/fernando_vanucci.jpg', // Usando imagem real migrada
      quote: 'Fiz uma promessa a São João quando meu filho estava doente. Após sua recuperação, participamos todos os anos do ritual do banho, mantendo nosso compromisso com o santo.',
      videoUrl: '/assets/videos/testimonials/fernando-c.flv',
      category: 'faith'
    },
    {
      id: 7,
      name: 'Filhos de Bere',
      location: 'Corumbá, MS',
      image: '/assets/images/testimonials/persons/filhos_dona_bere.jpg', // Usando imagem real migrada
      quote: 'Nossa família preserva as canções e danças que celebram São João há gerações. A música é fundamental para transmitir essa herança cultural.',
      videoUrl: '/assets/videos/testimonials/filhasbere-c.flv',
      category: 'cultural'
    },
    {
      id: 5,
      name: 'Idalina Idalina Gonçalves da Silva',
      location: 'Coxim, MS',
      image: '/assets/images/testimonials/persons/idalina_goncalves.jpg', // Ainda não temos a foto real da Idalina
      quote: 'Minha avó era curandeira e utilizava as ervas e a água benta de São João em seus tratamentos. Aprendi com ela o valor medicinal e espiritual dessa tradição.',
      videoUrl: '/assets/videos/testimonials/idalina-c.flv',
      category: 'traditions'
    },
    {
      id: 9,
      name: 'Izabel Meira de Castro',
      location: 'Miranda, MS',
      image: '/assets/images/testimonials/persons/izabel_meira.jpg', // Usando imagem real migrada
      quote: 'Como benzedeira, utilizo as ervas abenaçoadas durante a festa de São João. A água coletada nessa noite é considerada mítica e curativa.',
      videoUrl: '/assets/videos/testimonials/izabel-c.flv',
      category: 'faith'
    },
    {
      id: 10,
      name: 'Janete Tinoco',
      location: 'Corumbá, MS',
      image: '/assets/images/testimonials/persons/janete_tinoco.jpg', // Usando imagem real migrada
      quote: 'Organizo a festa há mais de 20 anos e vejo como ela se transformou mantendo sua essência. É gratificante ver os jovens se interessando por nossas tradições.',
      videoUrl: '/assets/videos/testimonials/janete-c.flv',
      category: 'traditions'
    },
    {
      id: 6,
      name: 'Joaquina Pereira',
      location: 'Poconé, MT',
      image: '/assets/images/testimonials/persons/joaquina_pereira.jpg', // Usando imagem real migrada
      quote: 'Na minha comunidade, as celebrações do Banho de São João conectam as pessoas e fortalecem nossos laços. É uma manifestação cultural que nos une como povo.',
      videoUrl: '/assets/videos/testimonials/joaquina-c.flv',
      category: 'cultural'
    },
    {
      id: 9,
      name: 'Luís Martins',
      location: 'Corumbá, MS',
      image: '/assets/images/testimonials/persons/luis_martins.jpg', // Usando imagem real migrada
      quote: 'Como pescador, tenho uma relação especial com São João e com as águas do Pantanal. O banho é um momento de renovação e agradecimento pela fartura.',
      videoUrl: '/assets/videos/testimonials/luisao-c.flv',
      category: 'faith'
    },
    {
      id: 10,
      name: 'Lucila Lucila Alvarez de Souza',
      location: 'Aquidauana, MS',
      image: '/assets/images/testimonials/persons/lucila_alvarez.jpg', // Usando imagem real migrada
      quote: 'Na minha família, a festa é um momento de reunião e agradecimento. Preparamos comidas típicas e recebemos vizinhos para celebrar juntos essa tradição.',
      videoUrl: '/assets/videos/testimonials/lucila-c.flv',
      category: 'personal'
    },
    {
      id: 11,
      name: 'Manoel Fernandes',
      location: 'Porto Murtinho, MS',
      image: '/assets/images/testimonials/persons/manoel.jpg', // Usando imagem real migrada
      quote: 'Como músico, vejo na celebração do Banho de São João uma riqueza cultural única, onde ritmos tradicionais preservam nossa memória coletiva.',
      videoUrl: '/assets/videos/testimonials/manoel-c.flv',
      category: 'cultural'
    },
    {
      id: 12,
      name: 'Maria Paula da Silva',
      location: 'Campo Grande, MS',
      image: '/assets/images/testimonials/persons/maria_paula.jpg', // Usando imagem real encontrada
      quote: 'Estudo as tradições do Banho de São João como parte da minha pesquisa. É impressionante como essa prática conecta elementos indígenas, europeus e africanos.',
      videoUrl: '/assets/videos/testimonials/maria_paula-c.flv',
      category: 'academic'
    },
    {
      id: 13,
      name: 'Marinete Luiz Cavalcanti',
      location: 'Miranda, MS',
      image: '/assets/images/testimonials/persons/marinete_luiz.jpg', // Usando imagem real migrada
      quote: 'Aprendi a preparar as ervas e os elementos do altar com minha avó. Cada planta tem um significado e um propósito na celebração.',
      videoUrl: '/assets/videos/testimonials/marinete-c.flv',
      category: 'traditions'
    },
    {
      id: 14,
      name: 'Oraide Teodora',
      location: 'Nioaque, MS',
      image: '/assets/images/testimonials/persons/horaide.jpg', // Usando imagem real migrada
      quote: 'Preparo o altar de São João todos os anos seguindo exatamente os ensinamentos que recebi da minha mãe. Cada elemento tem um significado especial na tradição.',
      videoUrl: '/assets/videos/testimonials/horaide-c.flv',
      category: 'traditions'
    },
    {
      id: 15,
      name: 'Pedro Paulo Miranda',
      location: 'Ladário, MS',
      image: '/assets/images/testimonials/persons/pedro_paulo.jpg', // Usando imagem real migrada
      quote: 'Minha experiência com o Banho de São João começou quando fiz uma promessa pela saúde do meu pai. Desde então, é uma prática anual de gratidão.',
      videoUrl: '/assets/videos/testimonials/pepe-c.flv',
      category: 'faith'
    },
    {
      id: 16,
      name: 'Reginalda Mendes',
      location: 'Miranda, MS',
      image: '/assets/images/testimonials/persons/reginalda_mendes.jpg', // Usando imagem real migrada
      quote: 'Participo ativamente das festividades de São João desde criança. As tradições do Arraiá Nhá Concha são parte fundamental da nossa identidade cultural.',
      videoUrl: '/assets/videos/testimonials/reginalda-c.flv',
      category: 'traditions'
    },
    {
      id: 17,
      name: 'Roberto Carlos da Silva',
      location: 'Aquidauana, MS',
      image: '/assets/images/testimonials/persons/roberto_carlos.jpg', // Usando imagem real encontrada
      quote: 'Como artesão, crio peças inspiradas nas simbologias do Banho de São João. É uma forma de manter viva essa expressão cultural tão rica e diversa.',
      videoUrl: '/assets/videos/testimonials/roberto-c.flv',
      category: 'cultural'
    }
  ];
  
  // Abrir modal com o vídeo do depoimento
  const openVideoModal = (testimonial) => {
    setSelectedVideo(testimonial);
    document.body.style.overflow = 'hidden';
    
    // Necessário para garantir que o vídeo carregue antes de tentar dar play
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };
  
  // Fechar o modal de vídeo
  const closeVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };
  
  // Filtrar depoimentos por categoria
  const filteredTestimonials = activeCategory === 'all' 
    ? testimonialData 
    : testimonialData.filter(t => t.category === activeCategory);
  
  // Alternar exibição do formulário de gravação
  const toggleRecordingForm = () => {
    setShowForm(!showForm);
  };
  
  // Submeter formulário de novo depoimento
  const handleSubmit = (e) => {
    e.preventDefault();
    // Em uma implementação real, aqui enviaria os dados para o backend
    alert('Obrigado! Seu depoimento será revisado e adicionado em breve.');
    setShowForm(false);
  };

  return (
    <Container>
      <Title>Depoimentos</Title>
      
      <Introduction>
        <p>Conheça histórias e experiências pessoais relacionadas ao Banho de São João através dos depoimentos de participantes, organizadores e pesquisadores dessa importante tradição cultural.</p>
      </Introduction>
      
      <Categories>
        <CategoryButton 
          isActive={activeCategory === 'all'} 
          onClick={() => setActiveCategory('all')}
        >
          Todos
        </CategoryButton>
        <CategoryButton 
          isActive={activeCategory === 'personal'} 
          onClick={() => setActiveCategory('personal')}
        >
          Histórias Pessoais
        </CategoryButton>
        <CategoryButton 
          isActive={activeCategory === 'traditions'} 
          onClick={() => setActiveCategory('traditions')}
        >
          Tradições
        </CategoryButton>
        <CategoryButton 
          isActive={activeCategory === 'cultural'} 
          onClick={() => setActiveCategory('cultural')}
        >
          Manifestações Culturais
        </CategoryButton>
        <CategoryButton 
          isActive={activeCategory === 'faith'} 
          onClick={() => setActiveCategory('faith')}
        >
          Fé e Devoção
        </CategoryButton>
        <CategoryButton 
          isActive={activeCategory === 'academic'} 
          onClick={() => setActiveCategory('academic')}
        >
          Pesquisadores
        </CategoryButton>
      </Categories>
      
      <RecordButton onClick={toggleRecordingForm}>
        {showForm ? 'Fechar Formulário' : 'Compartilhe seu Depoimento'}
      </RecordButton>
      
      {showForm && (
        <RecordingForm onSubmit={handleSubmit}>
          <FormTitle>Registre seu Depoimento</FormTitle>
          
          <FormGroup>
            <Label htmlFor="name">Nome Completo</Label>
            <Input 
              type="text" 
              id="name" 
              required 
              placeholder="Seu nome completo"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="location">Localidade</Label>
            <Input 
              type="text" 
              id="location" 
              required 
              placeholder="Cidade, Estado"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="category">Categoria</Label>
            <Input 
              as="select" 
              id="category" 
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="personal">História Pessoal</option>
              <option value="traditions">Tradições</option>
              <option value="cultural">Manifestações Culturais</option>
              <option value="faith">Fé e Devoção</option>
              <option value="academic">Pesquisa Acadêmica</option>
            </Input>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="testimonial">Seu Depoimento</Label>
            <TextArea 
              id="testimonial" 
              rows="6" 
              required 
              placeholder="Compartilhe sua história ou experiência relacionada ao Banho de São João"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="video">Upload de Vídeo (opcional)</Label>
            <Input 
              type="file" 
              id="video" 
              accept="video/*"
            />
            <small>Tamanho máximo: 50MB. Formatos aceitos: MP4, MOV, AVI</small>
          </FormGroup>
          
          <SubmitButton type="submit">Enviar Depoimento</SubmitButton>
        </RecordingForm>
      )}
      
      <TestimonialsGrid>
        {filteredTestimonials.map(testimonial => (
          <TestimonialCard key={testimonial.id}>
            <TestimonialImage src={testimonial.image} alt={testimonial.name} />
            <TestimonialContent>
              <TestimonialName>{testimonial.name}</TestimonialName>
              <TestimonialLocation>{testimonial.location}</TestimonialLocation>
              <TestimonialQuote>"{testimonial.quote}"</TestimonialQuote>
              <TestimonialVideo onClick={() => openVideoModal(testimonial)}>
                Assistir Depoimento
              </TestimonialVideo>
            </TestimonialContent>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
      
      {/* Modal para reprodução de vídeo */}
      {selectedVideo && (
        <VideoModal onClick={closeVideoModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={closeVideoModal}>&times;</CloseButton>
            <VideoContainer>
              <video 
                ref={videoRef}
                controls
                width="100%"
                src={selectedVideo.videoUrl}
              >
                Seu navegador não suporta a reprodução de vídeos.
              </video>
            </VideoContainer>
            <TestimonialName>{selectedVideo.name}</TestimonialName>
            <TestimonialLocation>{selectedVideo.location}</TestimonialLocation>
          </ModalContent>
        </VideoModal>
      )}
    </Container>
  );
};

export default Testimonials;
