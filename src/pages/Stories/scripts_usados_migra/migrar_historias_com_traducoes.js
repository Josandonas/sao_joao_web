/**
 * Script para migrar histórias do sistema legado para o formato JSON
 * incluindo traduções em inglês e espanhol
 * 
 * Este script lê os arquivos HTML do sistema legado em português, inglês e espanhol
 * e extrai as histórias para o formato JSON usado no novo sistema.
 * 
 * Para executar: node migrar_historias_com_traducoes.js
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Caminhos dos diretórios
const LEGACY_PATH_PT = 'C:\\Users\\josan\\Desktop\\jmcs\\Sao_Joao_app\\banho_c';
const LEGACY_PATH_EN = 'C:\\Users\\josan\\Desktop\\jmcs\\Sao_Joao_app\\banho_en';
const LEGACY_PATH_ES = 'C:\\Users\\josan\\Desktop\\jmcs\\Sao_Joao_app\\banho_es';
const TARGET_JSON_PATH = path.join(__dirname, '..', 'data', 'stories.json');

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
  // Remove tags HTML
  const textContent = content.replace(/<[^>]+>/g, '').replace(/\n/g, ' ').trim();
  
  if (textContent.length <= maxLength) {
    return textContent;
  }
  
  // Corta o texto e adiciona reticências
  let truncated = textContent.substring(0, maxLength).trim();
  // Não cortar no meio de uma palavra
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.8) { // Se o último espaço estiver próximo do final
    truncated = truncated.substring(0, lastSpace);
  }
  return truncated + '...';
}

// Formatar conteúdo HTML para melhor apresentação
function formatHTML(content) {
  if (!content) return '';
  
  // Substituir quebras de linha por parágrafos
  let formatted = content
    .replace(/\r?\n/g, '\n') // Normalizar quebras de linha
    .replace(/<br \/?>/gi, '\n') // Substituir <br> por quebras de linha
    .replace(/<br>/gi, '\n');
  
  // Dividir em parágrafos
  const paragraphs = formatted.split('\n\n');
  
  // Criar HTML com parágrafos
  return paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    return `<p>${trimmed}</p>`;
  }).join('');
}

// Função para verificar se um arquivo existe
function fileExists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

// Função para coletar links das histórias do arquivo índice
async function getStoryLinksFromIndex(indexPath) {
  if (!fileExists(indexPath)) {
    console.error(`Arquivo índice não encontrado: ${indexPath}`);
    return [];
  }
  
  const indexContent = readFile(indexPath);
  if (!indexContent) {
    console.error('Não foi possível ler o conteúdo do arquivo índice');
    return [];
  }
  
  const indexDom = new JSDOM(indexContent);
  const document = indexDom.window.document;
  
  // Selecionar todos os links de histórias
  const storyLinks = document.querySelectorAll('#estorias h3 a');
  if (!storyLinks || storyLinks.length === 0) {
    console.error('Não foram encontrados links de histórias no arquivo índice');
    return [];
  }
  
  return Array.from(storyLinks).map(link => ({
    url: link.getAttribute('href'),
    title: link.textContent.trim()
  }));
}

// Função para processar uma história e extrair seu conteúdo
async function processStory(storyPath, language) {
  try {
    if (!fileExists(storyPath)) {
      console.warn(`Arquivo de história não encontrado: ${storyPath}`);
      return null;
    }
    
    // Ler o arquivo HTML da história
    const storyContent = readFile(storyPath);
    if (!storyContent) {
      console.warn(`Não foi possível ler o conteúdo de ${storyPath}`);
      return null;
    }
    
    const storyDom = new JSDOM(storyContent);
    const storyDocument = storyDom.window.document;
    
    // Extrair os detalhes da história
    const titleElement = storyDocument.querySelector('.estoria h1');
    if (!titleElement) {
      console.warn(`Título não encontrado em ${storyPath}`);
      return null;
    }
    
    const title = extractText(titleElement);
    const autorElement = storyDocument.querySelector('.estoria p.autor');
    const autor = extractText(autorElement);
    
    const textoElement = storyDocument.querySelector('.estoria p#texto');
    if (!textoElement) {
      console.warn(`Conteúdo não encontrado em ${storyPath}`);
      return null;
    }
    
    const rawContent = extractHTML(textoElement);
    
    // Formatação do conteúdo como HTML com parágrafos adequados
    const htmlContent = formatHTML(rawContent);
    
    // Criar um resumo (excerpt) do conteúdo
    const excerpt = createExcerpt(rawContent);
    
    // Retornar os dados da história
    return {
      title,
      autor,
      excerpt,
      content: htmlContent
    };
  } catch (err) {
    console.error(`Erro ao processar história ${storyPath}:`, err);
    return null;
  }
}

// Função principal para migrar as histórias
async function migrateStories() {
  try {
    console.log('Iniciando migração das histórias do sistema legado com traduções...');
    
    // Verificar se os diretórios legados existem
    const ptExists = fileExists(LEGACY_PATH_PT);
    const enExists = fileExists(LEGACY_PATH_EN);
    const esExists = fileExists(LEGACY_PATH_ES);
    
    if (!ptExists && !enExists && !esExists) {
      console.error(`Nenhum dos diretórios legados encontrado`);
      return;
    }
    
    // Vamos usar o português como base, se disponível
    let baseLanguagePath = ptExists ? LEGACY_PATH_PT : enExists ? LEGACY_PATH_EN : LEGACY_PATH_ES;
    let baseLanguage = ptExists ? 'pt' : enExists ? 'en' : 'es';
    
    console.log(`Usando ${baseLanguage.toUpperCase()} como idioma base`);
    
    // Primeiro, ler o índice de histórias do idioma base para obter a lista de links
    const indexPath = path.join(baseLanguagePath, 'indexa9c5.html'); // Arquivo índice das histórias
    const storyLinks = await getStoryLinksFromIndex(indexPath);
    
    if (storyLinks.length === 0) {
      console.error('Não foram encontrados links de histórias no arquivo índice');
      return;
    }
    
    console.log(`Encontradas ${storyLinks.length} histórias para migrar`);
    
    // Ler o JSON existente para manter os dados já presentes
    let existingJson = { stories: [] };
    
    if (fileExists(TARGET_JSON_PATH)) {
      try {
        const existingContent = readFile(TARGET_JSON_PATH);
        if (existingContent) {
          existingJson = JSON.parse(existingContent);
        }
      } catch (err) {
        console.warn('Erro ao processar arquivo JSON existente:', err.message);
        console.log('Criando novo arquivo JSON...');
      }
    }
    
    // Determinar o próximo ID
    const existingStories = existingJson.stories || [];
    let nextId = existingStories.length > 0 ? 
                Math.max(...existingStories.map(s => s.id || 0)) + 1 : 
                1;
    
    // Array para armazenar as novas histórias migradas
    const newStories = [];
    
    // Para cada link, processar a história em cada idioma
    for (let i = 0; i < storyLinks.length; i++) {
      const link = storyLinks[i];
      if (!link.url) {
        console.warn(`Link #${i+1} não possui URL`);
        continue;
      }
      
      console.log(`[${i+1}/${storyLinks.length}] Processando história: ${link.title}`);
      
      // Objeto para armazenar a história com suas traduções
      const story = {
        id: nextId++,
        translations: {}
      };
      
      // Processar cada idioma
      if (ptExists) {
        const ptStoryPath = path.join(LEGACY_PATH_PT, link.url);
        const ptStory = await processStory(ptStoryPath, 'pt');
        if (ptStory) {
          // Usar os campos principais (sem traduções) para os valores padrão
          story.title = ptStory.title;
          story.autor = ptStory.autor;
          story.excerpt = ptStory.excerpt;
          story.content = ptStory.content;
          
          // Adicionar também às traduções
          story.translations.pt = {
            title: ptStory.title,
            autor: ptStory.autor,
            excerpt: ptStory.excerpt,
            content: ptStory.content
          };
          console.log(`  ✓ Versão PT processada com sucesso`);
        } else {
          console.warn(`  ✗ Não foi possível processar a versão PT`);
        }
      }
      
      if (enExists) {
        const enStoryPath = path.join(LEGACY_PATH_EN, link.url);
        const enStory = await processStory(enStoryPath, 'en');
        if (enStory) {
          // Se não temos conteúdo em português, usar inglês como padrão
          if (!story.title) {
            story.title = enStory.title;
            story.autor = enStory.autor;
            story.excerpt = enStory.excerpt;
            story.content = enStory.content;
          }
          
          story.translations.en = {
            title: enStory.title,
            autor: enStory.autor,
            excerpt: enStory.excerpt,
            content: enStory.content
          };
          console.log(`  ✓ Versão EN processada com sucesso`);
        } else {
          console.warn(`  ✗ Não foi possível processar a versão EN`);
        }
      }
      
      if (esExists) {
        const esStoryPath = path.join(LEGACY_PATH_ES, link.url);
        const esStory = await processStory(esStoryPath, 'es');
        if (esStory) {
          // Se não temos conteúdo em português ou inglês, usar espanhol como padrão
          if (!story.title) {
            story.title = esStory.title;
            story.autor = esStory.autor;
            story.excerpt = esStory.excerpt;
            story.content = esStory.content;
          }
          
          story.translations.es = {
            title: esStory.title,
            autor: esStory.autor,
            excerpt: esStory.excerpt,
            content: esStory.content
          };
          console.log(`  ✓ Versão ES processada com sucesso`);
        } else {
          console.warn(`  ✗ Não foi possível processar a versão ES`);
        }
      }
      
      // Adicionar a história apenas se tiver pelo menos uma versão
      if (Object.keys(story.translations).length > 0) {
        newStories.push(story);
        console.log(`✓ História "${story.title}" migrada com sucesso em ${Object.keys(story.translations).length} idiomas`);
      } else {
        console.warn(`✗ A história não foi adicionada porque não foi possível processar nenhuma versão`);
      }
    }
    
    if (newStories.length === 0) {
      console.warn('Nenhuma história foi migrada com sucesso');
      return;
    }
    
    // Combinar histórias existentes com as novas
    // Nota: Podemos decidir substituir histórias existentes ou apenas adicionar novas
    const allStories = [...existingStories, ...newStories];
    
    // Salvar o resultado no arquivo JSON
    const resultJson = { stories: allStories };
    try {
      fs.writeFileSync(
        TARGET_JSON_PATH, 
        JSON.stringify(resultJson, null, 2),
        'utf8'
      );
      console.log(`Migração concluída. ${newStories.length} histórias migradas com sucesso.`);
      console.log(`Total de histórias no arquivo JSON: ${allStories.length}`);
    } catch (err) {
      console.error('Erro ao salvar arquivo JSON:', err.message);
    }
  } catch (err) {
    console.error('Erro durante migração:', err);
  }
}

// Executar a migração
migrateStories()
  .then(() => console.log('Processo finalizado.'))
  .catch(err => console.error('Erro fatal durante a migração:', err));
