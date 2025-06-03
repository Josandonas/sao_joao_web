import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Container, 
  Title, 
  Introduction, 
  MapSection, 
  MapContainer, 
  CommunityList, 
  CommunityCard,
  CardImage,
  CardContent, 
  CardTitle, 
  CardLocation,
  CardDescription,
  CommunityModal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalImage,
  ModalDetailsContainer,
  ModalDetail,
  ModalDetailTitle,
  ModalText
} from './styles';

const Communities = () => {
  const { t } = useTranslation();
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  
  // Dados das comunidades usando as imagens reais migradas
  const communitiesData = [
    {
      id: 1,
      name: 'Comunidade São Sebastião',
      location: 'Corumbá, MS',
      coordinates: { lat: -19.0055, lng: -57.6530 },
      image: '/assets/images/communities/iee73.jpg',
      description: 'Uma das mais antigas comunidades que celebram o Banho de São João.',
      fullDescription: `
        <p>A comunidade São Sebastião tem uma história que remonta ao início do século XX, quando os primeiros moradores se estabeleceram às margens do Rio Paraguai em Corumbá.</p>
        <p>A tradição do Banho de São João é celebrada aqui há mais de 80 anos, com procissões fluviais que saem do porto geral e percorrem o rio, levando a imagem do santo para ser banhada nas águas.</p>
        <p>Durante a festividade, toda a comunidade se mobiliza com preparação de comidas típicas, decoração das embarcações e ensaios para as danças tradicionais que acontecem após o banho do santo.</p>
      `,
      traditions: 'Procissão fluvial, fogueiras à beira do rio, dança do siriri, culinária pantaneira',
      festival_date: 'De 15 a 24 de junho'
    },
    {
      id: 2,
      name: 'Comunidade Taquaral',
      location: 'Ladário, MS',
      coordinates: { lat: -19.0070, lng: -57.6017 },
      image: '/assets/images/communities/i8d6e.jpg',
      description: 'Conhecida pelas suas festas juninas que mesclam tradições paraguaias e bolivianas.',
      fullDescription: `
        <p>A comunidade Taquaral, localizada na cidade de Ladário, fronteira com a Bolívia, apresenta uma mistura única de tradições brasileiras, paraguaias e bolivianas em suas celebrações de São João.</p>
        <p>O Banho de São João nesta comunidade tem uma forte influência da cultura guarani, com cantos em guarani e português que acompanham todo o ritual.</p>
        <p>A localização fronteiriça faz com que muitos turistas dos países vizinhos venham participar das festividades, criando um ambiente de integração cultural único na região.</p>
      `,
      traditions: 'Cantos em guarani, danças com trajes típicos paraguaios, culinária fronteiriça',
      festival_date: 'De 20 a 24 de junho'
    },
    {
      id: 3,
      name: 'Comunidade Porto Esperança',
      location: 'Corumbá, MS',
      coordinates: { lat: -19.6012, lng: -57.4382 },
      image: '/assets/images/communities/i497e.jpg',
      description: 'Uma pequena comunidade ribeirinha com uma celebração intimista de São João.',
      fullDescription: `
        <p>Porto Esperança é uma pequena e tradicional vila ribeirinha no município de Corumbá. Seu acesso é principalmente por via fluvial ou pela antiga estrada de ferro Noroeste do Brasil.</p>
        <p>Mesmo sendo pequena, a comunidade mantém viva uma celebração muito tradicional do Banho de São João, onde a imagem do santo é levada em uma canoa simples, decorada com flores da região.</p>
        <p>A tradição local inclui uma série de promessas feitas ao santo, que são pagas com a organização da festa. Cada ano, uma família diferente é responsável por liderar as celebrações.</p>
      `,
      traditions: 'Procissão em canoas, pesca comunitária, promessas ao santo, forró pantaneiro',
      festival_date: 'Noite de 23 para 24 de junho'
    },
    {
      id: 4,
      name: 'Comunidade Albuquerque',
      location: 'Corumbá, MS',
      coordinates: { lat: -19.3643, lng: -57.4264 },
      image: '/assets/images/communities/i6d88.jpg',
      description: 'Famosa pelas suas embarcações decoradas para a procissão de São João.',
      fullDescription: `
        <p>O distrito de Albuquerque é conhecido pela sua bela localização às margens do Rio Paraguai e pela sua procissão fluvial de São João, que atrai visitantes de toda a região.</p>
        <p>As embarcações decoradas são o grande destaque da festa, com competições para a mais bem ornamentada. As decorações geralmente utilizam materiais naturais como flores, folhas de palmeiras e frutos da região.</p>
        <p>Após o banho do santo no rio, as celebrações continuam em terra firme com um grande arraial, onde são servidas comidas típicas e acontecem apresentações culturais.</p>
      `,
      traditions: 'Competição de embarcações decoradas, fogos de artifício sobre o rio, danças pantaneiras',
      festival_date: 'De 23 a 25 de junho'
    },
    {
      id: 5,
      name: 'Comunidade Amolar',
      location: 'Corumbá, MS',
      coordinates: { lat: -18.0409, lng: -57.4922 },
      image: '/assets/images/communities/ib451.jpg',
      description: 'Uma das comunidades mais isoladas, com celebrações autênticas e preservadas.',
      fullDescription: `
        <p>A comunidade do Amolar está situada na região da Serra do Amolar, uma das áreas mais preservadas e isoladas do Pantanal. O acesso é quase exclusivamente por barco, em uma viagem que pode durar muitas horas a partir de Corumbá.</p>
        <p>Devido ao seu isolamento, a comunidade mantém tradições muito autênticas do Banho de São João, com pouca influência externa. O ritual inclui elementos indígenas e ribeirinhos que formam uma expressão única de fé e cultura.</p>
        <p>Para os moradores, o Banho de São João representa também um momento de renovação e pedidos de proteção contra enchentes e outros desafios da vida pantaneira.</p>
      `,
      traditions: 'Cantos tradicionais pantaneiros, ritual da água benta, banquete comunitário',
      festival_date: 'Noite de 23 para 24 de junho'
    },
    {
      id: 6,
      name: 'Comunidade Paraguai Mirim',
      location: 'Corumbá, MS',
      coordinates: { lat: -18.5771, lng: -57.3611 },
      image: '/assets/images/communities/i0bab.jpg',
      description: 'Conhecida pela integração das tradições indígenas nas celebrações de São João.',
      fullDescription: `
        <p>A comunidade Paraguai Mirim é um exemplo de como as tradições indígenas e ribeirinhas se integraram ao catolicismo popular. Situada às margens do rio Paraguai, a comunidade tem forte presença de descendentes dos indígenas Guató.</p>
        <p>O Banho de São João nesta comunidade inclui rituais indígenas de purificação e agradecimento ao rio, que é considerado uma entidade sagrada e provedora de vida.</p>
        <p>Os cantos e danças que acompanham a procissão misturam palavras em português e no idioma guató, criando uma expressão cultural única e representativa do sincretismo presente na região.</p>
      `,
      traditions: 'Ritos indígenas de purificação, cerâmica ritual, cantos bilíngues, oferendas ao rio',
      festival_date: 'De 21 a 24 de junho'
    }
  ];
  
  // Abre o modal com a comunidade selecionada
  const openCommunityModal = (community) => {
    setSelectedCommunity(community);
    document.body.style.overflow = 'hidden';
  };
  
  // Fecha o modal
  const closeCommunityModal = () => {
    setSelectedCommunity(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <Container>
      <Title>Comunidades e Festividades</Title>
      
      <Introduction>
        <p>Conheça as comunidades que preservam e celebram as tradições do Banho de São João, especialmente na região do Pantanal Sul-Matogrossense. Cada uma mantém características próprias que enriquecem esse patrimônio cultural.</p>
      </Introduction>
      
      <MapSection>
        <h2>Mapa das Comunidades</h2>
        <MapContainer>
          {/* Aqui seria integrado um componente de mapa como Google Maps ou Leaflet */}
          <p className="map-placeholder">Visualize no mapa as comunidades que celebram o Banho de São João.</p>
        </MapContainer>
      </MapSection>
      
      <CommunityList>
        {communitiesData.map(community => (
          <CommunityCard key={community.id} onClick={() => openCommunityModal(community)}>
            <CardImage src={community.image} alt={community.name} />
            <CardContent>
              <CardTitle>{community.name}</CardTitle>
              <CardLocation>{community.location}</CardLocation>
              <CardDescription>{community.description}</CardDescription>
            </CardContent>
          </CommunityCard>
        ))}
      </CommunityList>
      
      {/* Modal para exibir os detalhes da comunidade */}
      {selectedCommunity && (
        <CommunityModal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{selectedCommunity.name}</ModalTitle>
              <CloseButton onClick={closeCommunityModal}>&times;</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <ModalImage src={selectedCommunity.image} alt={selectedCommunity.name} />
              
              <div dangerouslySetInnerHTML={{ __html: selectedCommunity.fullDescription }} />
              
              <ModalDetailsContainer>
                <ModalDetail>
                  <ModalDetailTitle>Localização:</ModalDetailTitle>
                  <ModalText>{selectedCommunity.location}</ModalText>
                </ModalDetail>
                
                <ModalDetail>
                  <ModalDetailTitle>Tradições:</ModalDetailTitle>
                  <ModalText>{selectedCommunity.traditions}</ModalText>
                </ModalDetail>
                
                <ModalDetail>
                  <ModalDetailTitle>Período Festivo:</ModalDetailTitle>
                  <ModalText>{selectedCommunity.festival_date}</ModalText>
                </ModalDetail>
              </ModalDetailsContainer>
            </ModalBody>
          </ModalContent>
        </CommunityModal>
      )}
    </Container>
  );
};

export default Communities;
