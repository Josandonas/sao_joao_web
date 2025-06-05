/**
 * Script para remover todas as tags HTML do JSON de histórias,
 * mantendo apenas o texto puro para evitar problemas futuros
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Caminhos
const jsonPath = path.join(__dirname, '../data/stories.json');
const backupPath = path.join(__dirname, `../data/stories.json.backup_limpo_${Date.now()}`);

/**
 * Remove tags HTML do texto e preserva quebras de parágrafo
 */
function removerTagsHTML(html) {
  if (!html || typeof html !== 'string') return '';
  
  try {
    // Criar um DOM para manipular o HTML corretamente
    const dom = new JSDOM(`<div>${html}</div>`);
    const conteudo = dom.window.document.querySelector('div');
    
    // Processar cada parágrafo para preservar quebras
    const paragrafos = conteudo.querySelectorAll('p');
    if (paragrafos.length > 0) {
      // Se tiver tags <p>, tratar cada parágrafo separadamente
      return Array.from(paragrafos)
        .map(p => p.textContent.trim())
        .filter(texto => texto.length > 0)
        .join('\n\n');
    } else {
      // Caso não tenha parágrafos, usar o texto completo
      return conteudo.textContent.trim();
    }
  } catch (erro) {
    // Em caso de erro, fazer uma limpeza básica por regex
    console.error(`Erro ao processar HTML: ${erro.message}`);
    return html
      .replace(/<[^>]*>/g, '') // Remove tags HTML
      .replace(/&nbsp;/g, ' ') // Substitui &nbsp; por espaços
      .replace(/\s+/g, ' ')    // Normaliza espaços
      .trim();
  }
}

/**
 * Função principal para remover tags HTML do JSON
 */
async function removerTagsHTMLdoJSON() {
  console.log('Iniciando remoção de tags HTML do JSON...');
  
  // Verificar se o arquivo JSON existe
  if (!fs.existsSync(jsonPath)) {
    console.error('Arquivo JSON não encontrado:', jsonPath);
    return;
  }
  
  // Fazer backup do arquivo original
  fs.copyFileSync(jsonPath, backupPath);
  console.log(`Backup do JSON original criado em: ${backupPath}`);
  
  // Carregar dados do JSON
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const historias = data.stories || [];
  
  console.log(`\nProcessando ${historias.length} histórias...`);
  let contadorCamposLimpos = 0;
  
  // Processar cada história
  for (let i = 0; i < historias.length; i++) {
    const historia = historias[i];
    console.log(`\nHistória ${i+1}/${historias.length}: "${historia.title}"`);
    
    // Limpar campos principais da história
    if (historia.content && historia.content.includes('<')) {
      historia.content = removerTagsHTML(historia.content);
      contadorCamposLimpos++;
    }
    
    if (historia.excerpt && historia.excerpt.includes('<')) {
      historia.excerpt = removerTagsHTML(historia.excerpt);
      contadorCamposLimpos++;
    }
    
    // Garantir que o objeto translations existe
    if (historia.translations) {
      // Processar cada idioma
      for (const idioma of Object.keys(historia.translations)) {
        const traducao = historia.translations[idioma];
        
        // Limpar campos da tradução
        if (traducao.content && traducao.content.includes('<')) {
          traducao.content = removerTagsHTML(traducao.content);
          contadorCamposLimpos++;
        }
        
        if (traducao.excerpt && traducao.excerpt.includes('<')) {
          traducao.excerpt = removerTagsHTML(traducao.excerpt);
          contadorCamposLimpos++;
        }
      }
    }
    
    // Mostrar progresso
    if (i % 5 === 4 || i === historias.length - 1) {
      console.log(`  💾 Progresso: ${i+1}/${historias.length} histórias processadas`);
    }
  }
  
  // Salvar JSON limpo
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  
  console.log(`\n✅ Processo concluído com sucesso!`);
  console.log(`✓ ${contadorCamposLimpos} campos limpos de tags HTML`);
  console.log(`✓ JSON salvo com texto puro em: ${jsonPath}`);
}

// Executar o script
removerTagsHTMLdoJSON().catch(erro => {
  console.error('Erro durante a execução:', erro);
});
