import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Title, 
  Introduction, 
  StoriesGrid, 
  StoryCard, 
  StoryImage, 
  StoryTitle, 
  StoryExcerpt,
  StoryModal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalImage
} from './styles';

const Stories = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const [selectedStory, setSelectedStory] = useState(null);
  
  // Dados simulados para as histórias - em uma implementação real estes viriam de um JSON ou API
  const storiesData = [
    {
      id: 1,
      title: 'A origem do Banho de São João',
      excerpt: 'Conheça a história por trás desta tradição centenária...',
      image: '/assets/images/stories/story-1.jpg',
      content: `
        <p>A origem do Banho de São João remonta a tradições pagãs anteriores ao cristianismo, relacionadas às comemorações do solstício de verão no hemisfério norte (21-22 de junho).</p>
        <p>Nessa época do ano, as culturas antigas acreditavam que as águas ganhavam poderes mágicos, sendo capazes de purificar a alma e o corpo.</p>
        <p>Com a cristianização, essas festividades foram associadas ao nascimento de São João Batista, celebrado no dia 24 de junho. O próprio São João Batista é conhecido por batizar com água, o que reforçou essa associação.</p>
        <p>No Brasil, a tradição chegou com os colonizadores portugueses, mas ganhou características próprias, misturando-se com elementos indígenas e africanos.</p>
      `
    },
    {
      id: 2,
      title: 'Simpatias e rituais populares',
      excerpt: 'Descobra as simpatias realizadas durante a noite de São João...',
      image: '/assets/images/stories/story-2.jpg',
      content: `
        <p>A noite de São João é repleta de simpatias e rituais que fazem parte da cultura popular brasileira.</p>
        <p>Uma das simpatias mais conhecidas é a do ovo na água: à meia-noite do dia 23 para 24 de junho, quebra-se um ovo dentro de um copo com água e deixa-o ao sereno. Na manhã seguinte, a forma tomada pela clara revelaria aspectos do futuro.</p>
        <p>Outra tradição envolve escrever o nome de pretendentes amorosos em pedaços de papel e colocá-los embaixo do travesseiro. O nome que aparecer em sonho seria o do futuro cônjuge.</p>
        <p>Para os pescadores, o banho nas águas do rio durante a madrugada de São João traria proteção e boas pescarias durante todo o ano.</p>
      `
    },
    {
      id: 3,
      title: 'A fogueira de São João',
      excerpt: 'Entenda o simbolismo da fogueira nas festas juninas...',
      image: '/assets/images/stories/story-3.jpg',
      content: `
        <p>A fogueira é um dos elementos mais importantes das festas de São João, sendo acesa na noite de 23 para 24 de junho.</p>
        <p>Conta a tradição que Santa Isabel, prima de Maria, mãe de Jesus, combinou acender uma fogueira para avisar a prima quando seu filho João Batista nascesse.</p>
        <p>Além desse simbolismo cristão, a fogueira representa purificação e renovação, além de servir como ponto de encontro para as comunidades, onde as pessoas se reúnem para conversar, dançar e cozinhar comidas típicas.</p>
        <p>Em algumas regiões, existem rituais como pular a fogueira em pares, estabelecendo um laço de compadrio entre os participantes, ou andar descalço sobre as brasas como prova de fé.</p>
      `
    },
    {
      id: 4,
      title: 'São João e as comunidades ribeirinhas',
      excerpt: 'A importância das festas para as comunidades às margens dos rios...',
      image: '/assets/images/stories/story-4.jpg',
      content: `
        <p>Nas comunidades ribeirinhas, especialmente nas regiões Norte e Nordeste do Brasil, o Banho de São João possui um significado especial.</p>
        <p>O rio, fonte de alimento e via de transporte, torna-se também um espaço sagrado durante as festividades de São João.</p>
        <p>Nessas comunidades, a imagem do santo é levada em procissão até as águas, onde é banhada em um ritual que simboliza a bênção do rio e de todos que dependem dele.</p>
        <p>Após o banho do santo, os devotos também se banham nas águas, acreditando receber as bênçãos e a proteção de São João para todo o ano seguinte.</p>
      `
    },
    {
      id: 5,
      title: 'A música e a dança nas festas de São João',
      excerpt: 'Conheça as expressões musicais ligadas às celebrações juninas...',
      image: '/assets/images/stories/story-5.jpg',
      content: `
        <p>A música é parte fundamental das celebrações de São João, com ritmos que variam conforme a região do país.</p>
        <p>No Nordeste, o forró, xote, baião e xaxado dominam as festas, com artistas como Luiz Gonzaga tendo eternizado músicas que falam sobre as tradições juninas.</p>
        <p>As quadrilhas juninas, danças de origem francesa que chegaram ao Brasil no século XIX, tornaram-se uma das expressões mais características das festas de São João, com seus figurinos coloridos e coreografias que narram histórias do universo rural.</p>
        <p>Muitas cantigas tradicionais também marcam presença nas festas, com letras que fazem referência a elementos como a fogueira, a colheita e os santos juninos.</p>
      `
    },
    {
      id: 6,
      title: 'São João pelo Brasil: diferentes celebrações',
      excerpt: 'As variações regionais das festas de São João no território brasileiro...',
      image: '/assets/images/stories/story-6.jpg',
      content: `
        <p>Embora a essência das festas de São João seja preservada em todo o Brasil, cada região possui suas particularidades na forma de celebrar.</p>
        <p>No Nordeste, destacam-se as grandes festas de Campina Grande (PB) e Caruaru (PE), que se autodenominam "O Maior São João do Mundo" e atraem milhares de turistas.</p>
        <p>No Norte, principalmente nas regiões amazônicas, as festividades incorporam elementos da cultura ribeirinha e indígena, com destaque para os banhos rituais e as danças tradicionais.</p>
        <p>No Sudeste e Sul, as influências europeias se fazem mais presentes, com destaque para as danças e comidas típicas trazidas pelos imigrantes.</p>
      `
    }
  ];
  
  // Abre o modal com a história selecionada
  const openStoryModal = (story) => {
    setSelectedStory(story);
    document.body.style.overflow = 'hidden';
  };
  
  // Fecha o modal
  const closeStoryModal = () => {
    setSelectedStory(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <Container>
      <Title>Estórias e Tradições</Title>
      
      <Introduction>
        <p>As festas de São João são repletas de histórias, lendas e tradições que se perpetuam através de gerações. Conheça algumas das narrativas que fazem parte deste rico patrimônio cultural brasileiro.</p>
      </Introduction>
      
      <StoriesGrid>
        {storiesData.map(story => (
          <StoryCard key={story.id} onClick={() => openStoryModal(story)}>
            <StoryImage src={story.image} alt={story.title} />
            <StoryTitle>{story.title}</StoryTitle>
            <StoryExcerpt>{story.excerpt}</StoryExcerpt>
          </StoryCard>
        ))}
      </StoriesGrid>
      
      {/* Modal para exibir a história completa */}
      {selectedStory && (
        <StoryModal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{selectedStory.title}</ModalTitle>
              <CloseButton onClick={closeStoryModal}>&times;</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <ModalImage src={selectedStory.image} alt={selectedStory.title} />
              <div dangerouslySetInnerHTML={{ __html: selectedStory.content }} />
            </ModalBody>
          </ModalContent>
        </StoryModal>
      )}
    </Container>
  );
};

export default Stories;
