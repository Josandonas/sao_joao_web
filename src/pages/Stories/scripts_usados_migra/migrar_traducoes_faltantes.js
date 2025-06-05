/**
 * Script para migrar automaticamente traduções faltantes 
 * baseado na análise anterior
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Caminhos dos arquivos
const faltantesPath = path.join(__dirname, 'traducoes_faltantes.json');
const jsonStoriesPath = path.join(__dirname, '../data/stories.json');
const mapaTextosPath = path.join(__dirname, 'mapa_textos.json');

/**
 * Extrai conteúdo completo de uma história a partir do arquivo HTML
 */
function extrairConteudoHistoria(caminhoArquivo) {
  if (!fs.existsSync(caminhoArquivo)) {
    console.error(`Arquivo não encontrado: ${caminhoArquivo}`);
    return { titulo: '', autor: '', content: '', excerpt: '' };
  }
  
  const conteudoHTML = fs.readFileSync(caminhoArquivo, 'utf-8');
  const dom = new JSDOM(conteudoHTML);
  const documento = dom.window.document;
  
  // Extrair título
  let titulo = '';
  const seletoresTitulo = ['.titulo h1', 'h1', 'h2', 'title'];
  for (const seletor of seletoresTitulo) {
    const elemento = documento.querySelector(seletor);
    if (elemento) {
      titulo = elemento.textContent.trim();
      break;
    }
  }
  
  // Extrair autor
  let autor = '';
  const seletoresAutor = ['.autor', 'p.autor', '.info'];
  for (const seletor of seletoresAutor) {
    const elemento = documento.querySelector(seletor);
    if (elemento) {
      autor = elemento.textContent.trim();
      break;
    }
  }
  
  // Extrair conteúdo
  let content = '';
  const seletoresConteudo = ['.texto', '.content', '.text-content', '.conteudo'];
  for (const seletor of seletoresConteudo) {
    const elemento = documento.querySelector(seletor);
    if (elemento) {
      content = elemento.innerHTML;
      break;
    }
  }
  
  // Se não encontrou conteúdo específico, tentar extrair todos os parágrafos
  if (!content) {
    const paragrafos = documento.querySelectorAll('p');
    if (paragrafos.length > 0) {
      content = Array.from(paragrafos)
        .map(p => p.outerHTML)
        .join('');
    }
  }
  
  // Extrair trecho (excerpt)
  let textoCompleto = '';
  if (content) {
    const tempDiv = documento.createElement('div');
    tempDiv.innerHTML = content;
    textoCompleto = tempDiv.textContent;
  }
  
  const excerpt = textoCompleto
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 100) + '...';
  
  return {
    titulo,
    autor,
    content,
    excerpt
  };
}

/**
 * Migra as traduções faltantes e atualiza o JSON
 */
async function migrarTraducoesFaltantes() {
  // Verificar se arquivo de análise existe
  if (!fs.existsSync(faltantesPath)) {
    console.error('Arquivo de análise não encontrado. Execute primeiro o script identificar_traducoes_faltantes.js');
    return;
  }
  
  // Carregar resultados da análise
  const analise = JSON.parse(fs.readFileSync(faltantesPath, 'utf-8'));
  const { traducoesFaltantes } = analise;
  
  console.log(`Processando ${traducoesFaltantes.length} histórias com traduções faltantes...`);
  
  // Carregar JSON atual
  const storiesData = JSON.parse(fs.readFileSync(jsonStoriesPath, 'utf-8'));
  const historias = storiesData.stories;
  
  let contadorAtualizacoes = 0;
  
  // Para cada história com traduções faltantes
  for (const faltante of traducoesFaltantes) {
    console.log(`\nProcessando história ID ${faltante.id}: "${faltante.titulo}"`);
    
    // Encontrar a história no JSON
    const historia = historias.find(h => h.id === faltante.id);
    if (!historia) {
      console.warn(`História ID ${faltante.id} não encontrada no JSON.`);
      continue;
    }
    
    // Garantir que o objeto translations existe
    if (!historia.translations) {
      historia.translations = {};
    }
    
    // Para cada idioma faltante
    for (const idioma of faltante.idiomasFaltantes) {
      const correspondencia = faltante.correspondenciasEncontradas[idioma];
      
      if (correspondencia) {
        console.log(`  Encontrada correspondência para ${idioma.toUpperCase()}: "${correspondencia.titulo}" (similaridade: ${correspondencia.similaridade.toFixed(2)})`);
        
        try {
          // Extrair conteúdo completo da correspondência
          const { titulo, autor, content, excerpt } = extrairConteudoHistoria(correspondencia.caminho);
          
          if (content && content.length > 50) {  // Verificação básica de conteúdo
            // Atualizar tradução
            historia.translations[idioma] = {
              title: titulo || correspondencia.titulo,
              autor: autor || historia.autor,
              excerpt: excerpt,
              content: content
            };
            
            console.log(`  ✅ Tradução ${idioma.toUpperCase()} adicionada com sucesso!`);
            contadorAtualizacoes++;
          } else {
            console.warn(`  ⚠️ Conteúdo extraído muito pequeno ou vazio para ${idioma.toUpperCase()}`);
          }
        } catch (erro) {
          console.error(`  ❌ Erro ao processar arquivo ${correspondencia.caminho}: ${erro.message}`);
        }
      } else {
        console.warn(`  ❌ Nenhuma correspondência encontrada para ${idioma.toUpperCase()}`);
      }
    }
  }
  
  // Salvar JSON atualizado
  if (contadorAtualizacoes > 0) {
    const backupPath = `${jsonStoriesPath}.backup_${Date.now()}`;
    fs.copyFileSync(jsonStoriesPath, backupPath);
    console.log(`\nBackup do JSON original criado em: ${backupPath}`);
    
    fs.writeFileSync(jsonStoriesPath, JSON.stringify(storiesData, null, 2));
    console.log(`\n✅ JSON atualizado com ${contadorAtualizacoes} novas traduções!`);
  } else {
    console.log('\nNenhuma tradução foi adicionada ao JSON.');
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('Iniciando migração automática de traduções faltantes...');
  await migrarTraducoesFaltantes();
}

// Executar
main().catch(console.error);
