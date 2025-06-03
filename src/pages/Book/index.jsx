import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Title,
  Introduction,
  BookViewer,
  BookControls,
  PageNavigation,
  NavButton,
  PageCounter,
  BookPages,
  Page,
  PageContent,
  PageImage,
  PageText,
  PageTitle,
  ChapterNavigation,
  ChapterButton
} from './styles';

const Book = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  
  // Conteúdo do livro digital usando as imagens reais migradas da aplicação original
  const bookContent = [
    {
      id: 1,
      chapter: 'Introdução',
      title: 'O Banho de São João',
      image: '/assets/images/book/2.jpg',
      content: `
        <p>O Banho de São João é uma das manifestações culturais mais significativas do Brasil, especialmente na região do Pantanal Sul-Matogrossense. Esta tradição, que mescla elementos religiosos e pagãos, expressa a rica diversidade cultural brasileira.</p>
        <p>Este livro digital busca documentar e preservar os conhecimentos, rituais e histórias associados a esta celebração, que ocorre anualmente na noite de 23 para 24 de junho.</p>
      `
    },
    {
      id: 2,
      chapter: 'Capítulo 1',
      title: 'Origens Históricas',
      image: '/assets/images/book/15.jpg',
      content: `
        <p>As celebrações em torno de São João Batista têm raízes profundas na cultura europeia, particularmente nas festas do solstício de verão no hemisfério norte, que ocorre em junho.</p>
        <p>Quando os colonizadores portugueses chegaram ao Brasil, trouxeram consigo estas tradições, que se fundiram com práticas indígenas e africanas, dando origem a uma manifestação cultural única e sincrética.</p>
        <p>No Pantanal, a relação especial com as águas dos rios deu ao Banho de São João características particulares, associadas à importância vital dos cursos d'água para as comunidades ribeirinhas.</p>
      `
    },
    {
      id: 3,
      chapter: 'Capítulo 2',
      title: 'O Ritual do Banho',
      image: '/assets/images/book/32.jpg',
      content: `
        <p>O ritual central da festividade é o banho da imagem de São João nas águas de rios, córregos ou lagos. De acordo com a tradição, no momento do banho, as águas recebem poderes especiais de cura e purificação.</p>
        <p>Antes do banho, são realizadas novenas e orações específicas. A imagem do santo é carregada em procissão até as margens da água, muitas vezes acompanhada por música e cânticos tradicionais.</p>
        <p>Após o banho do santo, os devotos também se banham nas águas, buscando proteção, curas e bênçãos para o ano que segue.</p>
      `
    },
    {
      id: 4,
      chapter: 'Capítulo 3',
      title: 'Símbolos e Elementos',
      image: '/assets/images/book/48.jpg',
      content: `
        <p>Além do banho, outros elementos caracterizam a celebração. A fogueira de São João é um símbolo central, representando purificação e iluminação.</p>
        <p>As embarcações decoradas, especialmente no Pantanal, são ornamentadas com flores, bandeirolas e luzes, criando um espetáculo visual durante as procissões fluviais noturnas.</p>
        <p>A culinária também é parte fundamental da festa, com pratos típicos como pamonha, canjica, milho verde, pé-de-moleque, entre outras iguarias que variam conforme a região.</p>
      `
    },
    {
      id: 5,
      chapter: 'Capítulo 4',
      title: 'A Música e a Dança',
      image: '/assets/images/book/64.jpg',
      content: `
        <p>As expressões musicais e coreográficas associadas ao Banho de São João variam conforme a região. No Pantanal, encontramos o cururu e o siriri, danças tradicionais que unem influências indígenas, africanas e europeias.</p>
        <p>Os instrumentos tradicionais incluem viola de cocho, ganzá, reco-reco e mocho, produzindo sons característicos que acompanham as celebrações.</p>
        <p>As letras das canções frequentemente narram histórias da vida ribeirinha, louvam o santo e descrevem elementos da natureza pantaneira.</p>
      `
    },
    {
      id: 6,
      chapter: 'Capítulo 5',
      title: 'Crenças e Simpatias',
      image: '/assets/images/book/78.jpg',
      content: `
        <p>Diversas crenças e simpatias estão associadas à noite de São João. Uma das mais conhecidas é a do ovo na água: à meia-noite, quebra-se um ovo dentro de um copo com água e deixa-o ao sereno. Na manhã seguinte, a forma assumida pela clara pode revelar aspectos do futuro.</p>
        <p>Outras simpatias incluem saltar a fogueira sete vezes, plantar sementes na véspera de São João e fazer pedidos ao santo durante o banho ritual.</p>
        <p>Acredita-se também que São João dorme na noite de seu dia, e por isso não se deve chamá-lo, pois poderia acordar e ver as imperfeições do mundo, causando tempestades.</p>
      `
    },
    {
      id: 7,
      chapter: 'Capítulo 6',
      title: 'Transformações e Permanências',
      image: '/assets/images/book/120.jpg',
      content: `
        <p>Ao longo do tempo, as celebrações do Banho de São João passaram por transformações, adaptando-se às mudanças sociais, ambientais e tecnológicas.</p>
        <p>Em algumas localidades, preocupações ambientais levaram à adaptação de certos rituais, como a substituição de materiais não biodegradáveis usados na decoração das embarcações.</p>
        <p>Apesar das mudanças, o núcleo central da tradição permanece vivo, transmitido de geração a geração como parte fundamental da identidade cultural das comunidades pantaneiras.</p>
      `
    },
    {
      id: 8,
      chapter: 'Conclusão',
      title: 'Património Imaterial',
      image: '/assets/images/book/184.jpg',
      content: `
        <p>O Banho de São João representa um rico patrimônio cultural imaterial brasileiro, expressando a relação profunda entre as comunidades, suas crenças e o ambiente natural que as cerca.</p>
        <p>A preservação e valorização desta tradição é fundamental não apenas para a memória cultural do país, mas também como expressão viva da diversidade e criatividade do povo brasileiro.</p>
        <p>Este livro é uma contribuição para o registro e difusão deste conhecimento, na esperança de que as futuras gerações possam continuar a celebrar e reinventar esta rica tradição.</p>
      `
    }
  ];

  // Navegação entre páginas
  const totalPages = bookContent.length;
  
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToChapter = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  
  // Efeito para rolagem ao topo quando a página muda
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <Container>
      <Title>O Livro do Banho de São João</Title>
      
      <Introduction>
        <p>Este livro digital apresenta a rica tradição do Banho de São João, abordando suas origens, rituais, simbolismo e importância cultural para as comunidades pantaneiras.</p>
      </Introduction>
      
      <BookViewer>
        <BookControls>
          <PageNavigation>
            <NavButton 
              onClick={goToPrevPage} 
              disabled={currentPage === 0}
              title="Página anterior"
            >
              &larr;
            </NavButton>
            
            <PageCounter>
              Página {currentPage + 1} de {totalPages}
            </PageCounter>
            
            <NavButton 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages - 1}
              title="Próxima página"
            >
              &rarr;
            </NavButton>
          </PageNavigation>
        </BookControls>
        
        <BookPages>
          {bookContent.map((page, index) => (
            <Page key={page.id} isActive={index === currentPage}>
              <PageContent>
                <PageTitle>
                  <span className="chapter">{page.chapter}</span>
                  <h2>{page.title}</h2>
                </PageTitle>
                
                <PageImage src={page.image} alt={page.title} />
                
                <PageText dangerouslySetInnerHTML={{ __html: page.content }} />
              </PageContent>
            </Page>
          ))}
        </BookPages>
        
        <ChapterNavigation>
          <h3>Capítulos</h3>
          <div>
            {bookContent.map((page, index) => (
              <ChapterButton
                key={page.id}
                isActive={index === currentPage}
                onClick={() => goToChapter(index)}
              >
                {page.chapter}
              </ChapterButton>
            ))}
          </div>
        </ChapterNavigation>
      </BookViewer>
    </Container>
  );
};

export default Book;
