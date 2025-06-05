/**
 * Script para migrar histórias do sistema legado para o formato JSON
 * 
 * Este script lê os arquivos HTML do sistema legado e extrai as histórias
 * para o formato JSON usado no novo sistema.
 * 
 * Para executar: node migrar_historias.js
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Caminhos dos diretórios
const LEGACY_PATH = 'C:\\Users\\josan\\Desktop\\jmcs\\Sao_Joao_app\\banho_c';
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

// Função principal para migrar as histórias
async function migrateStories() {
  try {
    console.log('Iniciando migração das histórias do sistema legado...');
    
    // Verificar se o diretório legado existe
    if (!fileExists(LEGACY_PATH)) {
      console.error(`Diretório legado não encontrado: ${LEGACY_PATH}`);
      return;
    }
    
    // Primeiro, ler o índice de histórias para obter a lista de links
    const indexPath = path.join(LEGACY_PATH, 'indexa9c5.html');
    if (!fileExists(indexPath)) {
      console.error(`Arquivo índice não encontrado: ${indexPath}`);
      return;
    }
    
    const indexContent = readFile(indexPath);
    if (!indexContent) {
      console.error('Não foi possível ler o conteúdo do arquivo índice');
      return;
    }
    
    const indexDom = new JSDOM(indexContent);
    const document = indexDom.window.document;
    
    // Selecionar todos os links de histórias
    const storyLinks = document.querySelectorAll('#estorias h3 a');
    if (!storyLinks || storyLinks.length === 0) {
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
    
    const existingStories = existingJson.stories || [];
    let nextId = existingStories.length > 0 ? 
                Math.max(...existingStories.map(s => s.id || 0)) + 1 : 
                1;
    
    // Array para armazenar as novas histórias migradas
    const newStories = [];
    
    // Para cada link, abrir a página da história e extrair os dados
    for (let i = 0; i < storyLinks.length; i++) {
      const link = storyLinks[i];
      const storyUrl = link.getAttribute('href');
      if (!storyUrl) {
        console.warn(`Link #${i+1} não possui URL`);
        continue;
      }
      
      const storyPath = path.join(LEGACY_PATH, storyUrl);
      if (!fileExists(storyPath)) {
        console.warn(`Arquivo de história não encontrado: ${storyPath}`);
        continue;
      }
      
      try {
        console.log(`[${i+1}/${storyLinks.length}] Processando história: ${storyUrl}`);
        
        // Ler o arquivo HTML da história
        const storyContent = readFile(storyPath);
        if (!storyContent) {
          console.warn(`Não foi possível ler o conteúdo de ${storyUrl}`);
          continue;
        }
        
        const storyDom = new JSDOM(storyContent);
        const storyDocument = storyDom.window.document;
        
        // Extrair os detalhes da história
        const titleElement = storyDocument.querySelector('.estoria h1');
        if (!titleElement) {
          console.warn(`Título não encontrado em ${storyUrl}`);
          continue;
        }
        
        const title = extractText(titleElement);
        const autorElement = storyDocument.querySelector('.estoria p.autor');
        const autor = extractText(autorElement);
        
        const textoElement = storyDocument.querySelector('.estoria p#texto');
        if (!textoElement) {
          console.warn(`Conteúdo não encontrado em ${storyUrl}`);
          continue;
        }
        
        const rawContent = extractHTML(textoElement);
        
        // Formatação do conteúdo como HTML com parágrafos adequados
        const htmlContent = formatHTML(rawContent);
        
        // Criar um resumo (excerpt) do conteúdo
        const excerpt = createExcerpt(rawContent);
        
        // Criar o objeto da história
        const story = {
          id: nextId++,
          title,
          autor,
          excerpt,
          content: htmlContent
        };
        
        newStories.push(story);
        console.log(`✓ História "${title}" processada com sucesso`);
      } catch (err) {
        console.error(`Erro ao processar história ${storyUrl}:`, err);
      }
    }
    
    if (newStories.length === 0) {
      console.warn('Nenhuma história foi migrada com sucesso');
      return;
    }
    
    // Combinar histórias existentes com as novas
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
