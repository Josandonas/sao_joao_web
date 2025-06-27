/**
 * Script para migrar histórias do sistema legado para o formato JSON
 * incluindo traduções em inglês e espanhol, usando título para correspondência
 * 
 * Este script carrega todas as histórias de cada idioma e usa similaridade
 * de título para corresponder as versões em diferentes idiomas
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
const TARGET_JSON = path.join(process.cwd(), 'src', 'pages', 'Stories', 'data', 'stories.json');

// Função auxiliar para ler o conteúdo de um arquivo
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Erro ao ler arquivo ${filePath}:`, error.message);
    return null;
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

// Função para verificar se um arquivo existe
function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

// Função para coletar todos os arquivos HTML em um diretório
function collectHtmlFiles(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      console.log(`Diretório não encontrado: ${dirPath}`);
      return [];
    }
    
    const files = fs.readdirSync(dirPath)
      .filter(file => file.startsWith('index') && file.endsWith('.html') && file !== 'index.html')
      .map(file => path.join(dirPath, file));
      
    return files;
  } catch (error) {
    console.error(`Erro ao listar arquivos em ${dirPath}:`, error.message);
    return [];
  }
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
  
  // Retorna similaridade como proporção de tokens que correspondem
  return tokens1.length > 0 ? matches / tokens1.length : 0;
}

// Função para processar uma história e extrair seu conteúdo
function processStory(filePath, language) {
  try {
    if (!fileExists(filePath)) {
      console.log(`Arquivo de história não encontrado: ${filePath}`);
      return null;
    }
    
    const html = readFile(filePath);
    if (!html) return null;
    
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Extrair título e autor
    const titleElement = document.querySelector('.titulo h1');
    const authorElement = document.querySelector('.autor');
    
    // Extrair conteúdo
    const contentElement = document.querySelector('.texto');
    
    // Se não encontrou elementos essenciais, retorna null
    if (!titleElement || !contentElement) {
      console.log(`Elementos essenciais não encontrados em ${filePath}`);
      return null;
    }
    
    // Extrair dados
    const title = extractText(titleElement);
    const autor = extractText(authorElement);
    const rawContent = extractHTML(contentElement);
    const content = formatHTML(rawContent);
    const excerpt = createExcerpt(content);
    
    return {
      title,
      autor,
      excerpt,
      content,
      language,
      filePath
    };
  } catch (error) {
    console.error(`Erro ao processar ${filePath}:`, error.message);
    return null;
  }
}

// Função principal para migrar as histórias
async function migrateStories() {
  try {
    console.log('Iniciando migração de histórias com correspondência por título...');
    
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
    
    // Coletar e processar histórias de cada idioma
    console.log('Coletando histórias em português...');
    const ptFiles = collectHtmlFiles(PT_PATH);
    const ptStories = [];
    for (const file of ptFiles) {
      const story = processStory(file, 'pt');
      if (story) ptStories.push(story);
    }
    console.log(`${ptStories.length} histórias encontradas em português.`);
    
    console.log('Coletando histórias em inglês...');
    const enFiles = collectHtmlFiles(EN_PATH);
    const enStories = [];
    for (const file of enFiles) {
      const story = processStory(file, 'en');
      if (story) enStories.push(story);
    }
    console.log(`${enStories.length} histórias encontradas em inglês.`);
    
    console.log('Coletando histórias em espanhol...');
    const esFiles = collectHtmlFiles(ES_PATH);
    const esStories = [];
    for (const file of esFiles) {
      const story = processStory(file, 'es');
      if (story) esStories.push(story);
    }
    console.log(`${esStories.length} histórias encontradas em espanhol.`);
    
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
