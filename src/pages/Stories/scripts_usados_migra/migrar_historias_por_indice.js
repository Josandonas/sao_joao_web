/**
 * Script para migrar histórias do sistema legado para o formato JSON
 * incluindo traduções em inglês e espanhol, usando as páginas de índice
 * para encontrar as histórias em cada idioma
 */

const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Caminhos para os diretórios
const BASE_PATH = 'C:\\Users\\josan\\Desktop\\jmcs\\Sao_Joao_app';
const PT_PATH = path.join(BASE_PATH, 'banho_c');
const EN_PATH = path.join(BASE_PATH, 'banho_en');
const ES_PATH = path.join(BASE_PATH, 'banho_es');

// Caminhos para os arquivos de índice
const PT_INDEX = path.join(PT_PATH, 'indexa9c5.html');
const EN_INDEX = path.join(EN_PATH, 'indexa9c5.html');
const ES_INDEX = path.join(ES_PATH, 'indexa9c5.html');

// Caminho para o arquivo JSON de destino
const TARGET_JSON = path.join('C:\\Users\\josan\\Desktop\\sao_joao_web', 'src', 'pages', 'Stories', 'data', 'stories.json');

// Função auxiliar para ler o conteúdo de um arquivo
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Erro ao ler arquivo ${filePath}:`, error.message);
    return null;
  }
}

// Função para verificar se um arquivo existe
function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

// Função para extrair texto de um elemento HTML
function extractText(element) {
  return element ? element.textContent.trim() : '';
}

// Função para extrair o conteúdo HTML formatado
function extractHTML(element) {
  return element ? element.innerHTML : '';
}

// Função para criar um trecho (excerpt) do conteúdo
function createExcerpt(content, maxLength = 100) {
  // Remove tags HTML para o excerpt
  const text = content.replace(/<\/?[^>]+(>|$)/g, "");
  
  // Limita o tamanho e adiciona reticências
  if (text.length <= maxLength) {
    return text;
  }
  
  // Encontra o último espaço antes do limite para não cortar palavras
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace !== -1) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

// Formatar conteúdo HTML para melhor apresentação
function formatHTML(content) {
  if (!content) return '';
  
  // Converte quebras de linha simples em parágrafos
  let formattedContent = content
    .replace(/\r\n|\r|\n/g, '\n')
    .split('\n\n')
    .filter(paragraph => paragraph.trim() !== '')
    .map(paragraph => `<p>${paragraph.trim()}</p>`)
    .join('');
    
  // Se não detectarmos parágrafos, verificamos se já tem tags <p>
  if (!formattedContent.includes('<p>')) {
    // Verifica se o conteúdo já está formatado com tags HTML
    if (content.includes('<p>') || content.includes('<div>')) {
      formattedContent = content;
    } else {
      // Caso contrário, envolve todo o conteúdo em um único parágrafo
      formattedContent = `<p>${content}</p>`;
    }
  }
  
  return formattedContent;
}

// Calcular similaridade entre duas strings (para comparar títulos)
function stringSimilarity(str1, str2) {
  const normalize = s => s.toLowerCase().replace(/[^\w\s]/g, '');
  const s1 = normalize(str1);
  const s2 = normalize(str2);
  
  // Uma implementação simples de similaridade baseada em tokens
  const tokens1 = s1.split(' ').filter(s => s.length > 2);
  const tokens2 = s2.split(' ').filter(s => s.length > 2);
  
  let matches = 0;
  for (const t1 of tokens1) {
    if (tokens2.some(t2 => t2.includes(t1) || t1.includes(t2))) {
      matches++;
    }
  }
  
  // Para evitar divisão por zero
  if (tokens1.length === 0) return 0;
  
  // Retorna similaridade como proporção de tokens que correspondem
  return matches / tokens1.length;
}

// Função para extrair links de histórias da página de índice
function getStoryLinksFromIndex(indexPath, basePath) {
  try {
    if (!fileExists(indexPath)) {
      console.log(`Arquivo de índice não encontrado: ${indexPath}`);
      return [];
    }
    
    const html = readFile(indexPath);
    if (!html) return [];
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Extrair todos os links h3 > a em div#estorias
    const storyLinks = [];
    const storyElements = document.querySelectorAll('#estorias h3 a');
    
    for (const link of storyElements) {
      const href = link.getAttribute('href');
      const title = link.textContent.trim();
      const authorElement = link.parentNode.nextElementSibling;
      const author = authorElement && authorElement.classList.contains('autor') 
        ? authorElement.textContent.trim() 
        : '';
        
      if (href && title) {
        storyLinks.push({
          title,
          author,
          path: path.join(basePath, href)
        });
      }
    }
    
    return storyLinks;
  } catch (error) {
    console.error(`Erro ao extrair links de ${indexPath}:`, error.message);
    return [];
  }
}

// Função para processar uma história e extrair seu conteúdo
function processStory(storyPath, language) {
  try {
    if (!fileExists(storyPath)) {
      console.log(`Arquivo de história não encontrado: ${storyPath}`);
      return null;
    }
    
    const html = readFile(storyPath);
    if (!html) return null;
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Tentar encontrar elementos necessários
    let titleElement, authorElement, contentElement;
    
    // Tentar diferentes seletores com base no idioma e marcação HTML
    titleElement = document.querySelector('.titulo h1') || 
                  document.querySelector('h1') || 
                  document.querySelector('#titulo h1') ||
                  document.querySelector('#title h1');
                  
    authorElement = document.querySelector('.autor') || 
                   document.querySelector('#autor') ||
                   document.querySelector('#estoria .autor');
                   
    contentElement = document.querySelector('.texto') || 
                    document.querySelector('#texto') ||
                    document.querySelector('#estoria .texto') ||
                    document.querySelector('#estoria');
    
    // Se não encontrou elementos essenciais, retorna null
    if (!titleElement && !contentElement) {
      console.log(`Elementos essenciais não encontrados em ${storyPath}`);
      return null;
    }
    
    // Extrair dados
    const title = titleElement ? extractText(titleElement) : '';
    const autor = authorElement ? extractText(authorElement) : '';
    
    // Para o conteúdo, verificar se está em um container ou diretamente
    let rawContent = '';
    if (contentElement) {
      // Se tem um container dedicado para o texto
      rawContent = extractHTML(contentElement);
    } else {
      // Caso não encontre um container específico, tente o conteúdo principal
      const mainContent = document.querySelector('#conteudo_wr2');
      if (mainContent) {
        // Remover elementos não relacionados ao conteúdo principal
        const elementsToRemove = mainContent.querySelectorAll('.titulo, #title, .autor, #autor');
        for (const el of elementsToRemove) {
          if (el && el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
        rawContent = mainContent.innerHTML;
      }
    }
    
    // Formatar conteúdo
    const content = formatHTML(rawContent);
    const excerpt = createExcerpt(content);
    
    return {
      title,
      autor,
      excerpt,
      content,
      language,
      filePath: storyPath
    };
  } catch (error) {
    console.error(`Erro ao processar ${storyPath}:`, error.message);
    return null;
  }
}

// Função principal para migrar as histórias
async function migrateStories() {
  try {
    console.log('Iniciando migração de histórias com correspondência por índice...');
    
    // Carregar o JSON existente se disponível
    let targetData = { stories: [] };
    if (fileExists(TARGET_JSON)) {
      const jsonContent = readFile(TARGET_JSON);
      if (jsonContent) {
        try {
          targetData = JSON.parse(jsonContent);
          console.log(`Arquivo JSON existente carregado: ${targetData.stories.length} histórias encontradas.`);
        } catch (error) {
          console.error('Erro ao carregar JSON existente:', error.message);
        }
      }
    }
    
    // Extrair links das histórias de cada idioma
    console.log('Extraindo links das histórias em português...');
    const ptLinks = getStoryLinksFromIndex(PT_INDEX, PT_PATH);
    console.log(`${ptLinks.length} links encontrados em português.`);
    
    console.log('Extraindo links das histórias em inglês...');
    const enLinks = getStoryLinksFromIndex(EN_INDEX, EN_PATH);
    console.log(`${enLinks.length} links encontrados em inglês.`);
    
    console.log('Extraindo links das histórias em espanhol...');
    const esLinks = getStoryLinksFromIndex(ES_INDEX, ES_PATH);
    console.log(`${esLinks.length} links encontrados em espanhol.`);
    
    // Processar histórias em português (principal)
    console.log('Processando histórias em português...');
    const ptStories = [];
    for (const link of ptLinks) {
      console.log(`Processando ${link.path}...`);
      const story = processStory(link.path, 'pt');
      if (story) {
        ptStories.push(story);
      }
    }
    console.log(`${ptStories.length} histórias processadas em português.`);
    
    // Processar histórias em inglês
    console.log('Processando histórias em inglês...');
    const enStories = [];
    for (const link of enLinks) {
      console.log(`Processando ${link.path}...`);
      const story = processStory(link.path, 'en');
      if (story) {
        enStories.push(story);
      }
    }
    console.log(`${enStories.length} histórias processadas em inglês.`);
    
    // Processar histórias em espanhol
    console.log('Processando histórias em espanhol...');
    const esStories = [];
    for (const link of esLinks) {
      console.log(`Processando ${link.path}...`);
      const story = processStory(link.path, 'es');
      if (story) {
        esStories.push(story);
      }
    }
    console.log(`${esStories.length} histórias processadas em espanhol.`);
    
    // Agrupar histórias por similaridade de título
    console.log('Agrupando histórias por similaridade de título...');
    const groupedStories = [];
    
    // Para cada história em português, procurar correspondentes em outros idiomas
    for (const ptStory of ptStories) {
      const group = {
        pt: ptStory,
        en: null,
        es: null
      };
      
      // Procurar correspondente em inglês
      for (const enStory of enStories) {
        const similarity = stringSimilarity(ptStory.title, enStory.title);
        if (similarity > 0.3) { // Limite de similaridade (ajuste conforme necessário)
          group.en = enStory;
          console.log(`Correspondência EN encontrada: "${ptStory.title}" <-> "${enStory.title}" (${similarity.toFixed(2)})`);
          break;
        }
      }
      
      // Procurar correspondente em espanhol
      for (const esStory of esStories) {
        const similarity = stringSimilarity(ptStory.title, esStory.title);
        if (similarity > 0.3) { // Limite de similaridade (ajuste conforme necessário)
          group.es = esStory;
          console.log(`Correspondência ES encontrada: "${ptStory.title}" <-> "${esStory.title}" (${similarity.toFixed(2)})`);
          break;
        }
      }
      
      groupedStories.push(group);
    }
    
    console.log(`${groupedStories.length} histórias agrupadas por similaridade.`);
    
    // Construir o array final de histórias
    const newStories = [];
    for (const [index, group] of groupedStories.entries()) {
      const { pt, en, es } = group;
      
      // Construir o objeto de história com traduções
      const story = {
        id: index + 1,
        translations: {
          pt: {
            title: pt.title,
            autor: pt.autor,
            excerpt: pt.excerpt,
            content: pt.content
          }
        },
        // Usar a versão portuguesa como padrão para os campos principais
        title: pt.title,
        autor: pt.autor,
        excerpt: pt.excerpt,
        content: pt.content
      };
      
      // Adicionar tradução em inglês se encontrada
      if (en) {
        story.translations.en = {
          title: en.title,
          autor: en.autor,
          excerpt: en.excerpt,
          content: en.content
        };
      }
      
      // Adicionar tradução em espanhol se encontrada
      if (es) {
        story.translations.es = {
          title: es.title,
          autor: es.autor,
          excerpt: es.excerpt,
          content: es.content
        };
      }
      
      newStories.push(story);
    }
    
    // Verificar por histórias existentes para evitar duplicação
    const updatedStories = [];
    const titleMap = new Map();
    
    // Criar um mapa de títulos existentes para verificar duplicações
    for (const existingStory of targetData.stories) {
      const storyTitle = existingStory.title.toLowerCase();
      titleMap.set(storyTitle, existingStory);
    }
    
    // Atualizar histórias existentes ou adicionar novas
    for (const newStory of newStories) {
      const storyTitle = newStory.title.toLowerCase();
      
      if (titleMap.has(storyTitle)) {
        // História já existe, atualizar com as traduções
        const existingStory = titleMap.get(storyTitle);
        existingStory.translations = newStory.translations;
        updatedStories.push(existingStory);
        console.log(`História atualizada: "${newStory.title}"`);
      } else {
        // Nova história para adicionar
        updatedStories.push(newStory);
        console.log(`Nova história adicionada: "${newStory.title}"`);
      }
    }
    
    // Atualizar IDs sequencialmente
    updatedStories.forEach((story, index) => {
      story.id = index + 1;
    });
    
    // Salvar o JSON atualizado
    const updatedData = { stories: updatedStories };
    fs.writeFileSync(TARGET_JSON, JSON.stringify(updatedData, null, 2), 'utf8');
    
    console.log(`Migração concluída: ${updatedStories.length} histórias no total.`);
    console.log(`Arquivo JSON atualizado: ${TARGET_JSON}`);
    
    return updatedStories;
  } catch (error) {
    console.error('Erro durante a migração:', error.message);
    throw error;
  }
}

// Executar a migração
migrateStories()
  .then(() => console.log('Processo finalizado.'))
  .catch(err => console.error('Erro fatal durante a migração:', err));
