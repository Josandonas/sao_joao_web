/**
 * Script para mapear os índices de histórias em cada idioma
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Diretórios para cada idioma
const baseDir = 'C:/Users/josan/Desktop/jmcs/Sao_Joao_app';
const dirs = {
  pt: path.join(baseDir, 'banho_c'),
  en: path.join(baseDir, 'banho_en'),
  es: path.join(baseDir, 'banho_es')
};

// Arquivo de saída
const outputFile = path.join(__dirname, 'mapeamento_indices.json');

/**
 * Extrai links e títulos do arquivo de índice
 */
function extrairIndice(caminhoIndice, idioma) {
  if (!fs.existsSync(caminhoIndice)) {
    console.error(`Arquivo de índice não encontrado: ${caminhoIndice}`);
    return [];
  }

  const conteudoHTML = fs.readFileSync(caminhoIndice, 'utf-8');
  const dom = new JSDOM(conteudoHTML);
  const documento = dom.window.document;
  
  // Tenta diferentes seletores para encontrar os links das histórias
  const seletores = [
    '#estorias h3 a',             // Estrutura observada no inglês
    '.texto-home h3 a',           // Possível estrutura alternativa
    '.conteudo a[href*="index"]', // Links genéricos para histórias
    'a[href*="index"]'            // Último recurso: qualquer link para arquivo index
  ];
  
  let links = [];
  
  // Tenta cada seletor até encontrar links
  for (const seletor of seletores) {
    const elementos = documento.querySelectorAll(seletor);
    if (elementos.length > 0) {
      elementos.forEach(link => {
        const href = link.getAttribute('href');
        const titulo = link.textContent.trim();
        
        // Encontrar autor se disponível (geralmente em um parágrafo próximo)
        let autor = '';
        const proximoElemento = link.closest('h3')?.nextElementSibling;
        if (proximoElemento && proximoElemento.classList.contains('autor')) {
          autor = proximoElemento.textContent.trim();
        }
        
        links.push({
          href,
          titulo,
          autor,
          idioma,
          caminhoCompleto: path.join(dirs[idioma], href)
        });
      });
      
      break; // Se encontrou links com este seletor, não precisa testar os outros
    }
  }
  
  return links;
}

/**
 * Função principal para mapear índices em todos os idiomas
 */
async function mapearIndices() {
  const indicesPorIdioma = {};
  
  // Para cada idioma, encontrar e processar o arquivo de índice
  for (const idioma of Object.keys(dirs)) {
    console.log(`Processando índice para o idioma: ${idioma.toUpperCase()}`);
    
    // Tentar diferentes nomes para o arquivo de índice
    const possiveisIndices = [
      'indexa9c5.html',  // Observado no inglês
      'index7597.html',  // Alternativa comum
      'index.html'       // Padrão
    ];
    
    let indiceEncontrado = false;
    
    for (const nomeIndice of possiveisIndices) {
      const caminhoIndice = path.join(dirs[idioma], nomeIndice);
      
      if (fs.existsSync(caminhoIndice)) {
        console.log(`Usando índice: ${caminhoIndice}`);
        indicesPorIdioma[idioma] = extrairIndice(caminhoIndice, idioma);
        console.log(`Encontradas ${indicesPorIdioma[idioma].length} histórias no índice ${idioma.toUpperCase()}`);
        indiceEncontrado = true;
        break;
      }
    }
    
    // Se não encontrou um arquivo de índice, buscar todos os arquivos HTML e extrair títulos
    if (!indiceEncontrado) {
      console.log(`Nenhum índice encontrado para ${idioma.toUpperCase()}, buscando histórias individualmente...`);
      indicesPorIdioma[idioma] = [];
      
      const arquivosHTML = fs.readdirSync(dirs[idioma])
        .filter(arquivo => arquivo.startsWith('index') && arquivo.endsWith('.html') && arquivo !== 'index.html');
      
      console.log(`Encontrados ${arquivosHTML.length} possíveis arquivos de histórias`);
      
      for (const arquivo of arquivosHTML) {
        const caminhoArquivo = path.join(dirs[idioma], arquivo);
        
        try {
          const conteudoHTML = fs.readFileSync(caminhoArquivo, 'utf-8');
          const dom = new JSDOM(conteudoHTML);
          const documento = dom.window.document;
          
          // Tentar extrair título da história
          const seletoresTitulo = [
            '.titulo h1',
            'h1',
            'h2',
            'title'
          ];
          
          let titulo = '';
          for (const seletor of seletoresTitulo) {
            const elementoTitulo = documento.querySelector(seletor);
            if (elementoTitulo) {
              titulo = elementoTitulo.textContent.trim();
              break;
            }
          }
          
          if (titulo) {
            indicesPorIdioma[idioma].push({
              href: arquivo,
              titulo,
              autor: '',
              idioma,
              caminhoCompleto: caminhoArquivo
            });
          }
        } catch (erro) {
          console.error(`Erro ao processar arquivo ${arquivo}: ${erro.message}`);
        }
      }
      
      console.log(`Extraídos ${indicesPorIdioma[idioma].length} títulos de histórias para ${idioma.toUpperCase()}`);
    }
  }
  
  // Salvar mapeamento em JSON
  fs.writeFileSync(outputFile, JSON.stringify(indicesPorIdioma, null, 2));
  console.log(`Mapeamento de índices salvo em: ${outputFile}`);
  
  return indicesPorIdioma;
}

// Executar função principal
mapearIndices()
  .then(() => console.log('Processo de mapeamento de índices concluído'))
  .catch(erro => console.error('Erro ao mapear índices:', erro));
