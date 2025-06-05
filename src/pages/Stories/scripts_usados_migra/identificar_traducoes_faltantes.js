/**
 * Script para identificar traduções faltantes comparando apenas as primeiras palavras do texto
 * Esta abordagem simplificada usa "assinaturas" de texto para correspondência
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Diretórios e arquivos
const baseDir = 'C:/Users/josan/Desktop/jmcs/Sao_Joao_app';
const dirs = {
  pt: path.join(baseDir, 'banho_c'),
  en: path.join(baseDir, 'banho_en'),
  es: path.join(baseDir, 'banho_es')
};

const jsonPath = path.join(__dirname, '../data/stories.json');
const outputPath = path.join(__dirname, 'traducoes_faltantes.json');
const mapaTextoPath = path.join(__dirname, 'mapa_textos.json');

/**
 * Extrai assinatura de texto (primeiras palavras) de um conteúdo HTML
 */
function extrairAssinaturaDeTexto(conteudoHTML, idioma) {
  const dom = new JSDOM(conteudoHTML);
  const documento = dom.window.document;
  
  // Tentar diferentes seletores para o conteúdo principal
  const seletores = [
    '.texto',
    '.content',
    '.text-content',
    '.conteudo',
    'p'
  ];
  
  let texto = '';
  
  // Procurar conteúdo usando os seletores
  for (const seletor of seletores) {
    const elemento = documento.querySelector(seletor);
    if (elemento) {
      texto = elemento.textContent.trim();
      break;
    }
  }
  
  if (!texto && documento.body) {
    texto = documento.body.textContent.trim();
  }
  
  // Obter as primeiras palavras (assinatura)
  const palavras = texto.split(/\s+/);
  const assinatura = palavras.slice(0, 5).join(' ').toLowerCase();
  
  return {
    assinatura,
    textoCompleto: texto,
    titulo: extrairTitulo(documento)
  };
}

/**
 * Extrai o título de um documento HTML
 */
function extrairTitulo(documento) {
  const seletores = [
    '.titulo h1',
    'h1',
    'h2',
    'title'
  ];
  
  for (const seletor of seletores) {
    const elemento = documento.querySelector(seletor);
    if (elemento) {
      return elemento.textContent.trim();
    }
  }
  
  return '';
}

/**
 * Cria mapa de assinaturas para todos os arquivos HTML em um diretório
 */
function criarMapaDeAssinaturas(diretorio, idioma) {
  console.log(`Criando mapa de assinaturas para ${idioma.toUpperCase()}...`);
  const mapa = {};
  
  // Listar todos os arquivos HTML
  const arquivos = fs.readdirSync(diretorio)
    .filter(arquivo => arquivo.endsWith('.html'))
    .filter(arquivo => arquivo.startsWith('index') && arquivo !== 'index.html');
  
  console.log(`Encontrados ${arquivos.length} arquivos em ${idioma.toUpperCase()}`);
  
  // Processar cada arquivo
  arquivos.forEach(arquivo => {
    const caminhoArquivo = path.join(diretorio, arquivo);
    
    try {
      const conteudoHTML = fs.readFileSync(caminhoArquivo, 'utf-8');
      const { assinatura, textoCompleto, titulo } = extrairAssinaturaDeTexto(conteudoHTML, idioma);
      
      if (assinatura) {
        mapa[assinatura] = {
          arquivo,
          titulo,
          caminho: caminhoArquivo,
          textoCompleto
        };
      }
    } catch (erro) {
      console.error(`Erro ao processar ${arquivo}: ${erro.message}`);
    }
  });
  
  return mapa;
}

/**
 * Analisa o JSON atual para identificar traduções existentes
 */
function analisarJSON() {
  if (!fs.existsSync(jsonPath)) {
    console.error('Arquivo JSON não encontrado:', jsonPath);
    return { stories: [] };
  }
  
  try {
    return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  } catch (erro) {
    console.error('Erro ao analisar JSON:', erro);
    return { stories: [] };
  }
}

/**
 * Identifica traduções faltantes comparando o JSON atual com os mapas de assinaturas
 */
async function identificarTraducoesFaltantes() {
  // Criar mapas de assinaturas para cada idioma
  const mapas = {};
  for (const idioma of Object.keys(dirs)) {
    mapas[idioma] = criarMapaDeAssinaturas(dirs[idioma], idioma);
    console.log(`Criado mapa com ${Object.keys(mapas[idioma]).length} assinaturas para ${idioma.toUpperCase()}`);
  }
  
  // Salvar mapa completo de textos para referência
  fs.writeFileSync(mapaTextoPath, JSON.stringify(mapas, null, 2));
  console.log(`Mapa de textos completo salvo em: ${mapaTextoPath}`);
  
  // Analisar JSON atual
  const data = analisarJSON();
  const historias = data.stories || [];
  
  console.log(`JSON atual tem ${historias.length} histórias`);
  
  // Para cada história no JSON, verificar traduções existentes
  const traducoesFaltantes = [];
  
  historias.forEach((historia, index) => {
    // Obter assinatura do texto em português
    const textoPT = historia.content;
    const docPT = new JSDOM(textoPT).window.document;
    const textoLimpoPT = docPT.body.textContent.trim();
    const assinaturaPT = textoLimpoPT.split(/\s+/).slice(0, 5).join(' ').toLowerCase();
    
    // Verificar quais idiomas estão faltando
    const idiomasFaltantes = [];
    
    // Verificar se tem tradução em inglês
    const temTraducaoEN = historia.translations && historia.translations.en && 
                          historia.translations.en.content && 
                          historia.translations.en.content.length > 50;
    
    if (!temTraducaoEN) {
      idiomasFaltantes.push('en');
    }
    
    // Verificar se tem tradução em espanhol
    const temTraducaoES = historia.translations && historia.translations.es && 
                          historia.translations.es.content && 
                          historia.translations.es.content.length > 50;
    
    if (!temTraducaoES) {
      idiomasFaltantes.push('es');
    }
    
    // Se faltar alguma tradução, procurar no mapa de assinaturas
    if (idiomasFaltantes.length > 0) {
      // Procurar nos mapas de assinaturas correspondências para esta história
      const correspondencias = {};
      
      // Comparar assinatura PT com todas as assinaturas dos outros idiomas
      for (const idioma of idiomasFaltantes) {
        const assinaturasMapa = Object.keys(mapas[idioma]);
        
        // Encontrar a assinatura mais próxima no idioma faltante
        let melhorCorrespondencia = null;
        let maiorSimilaridade = 0;
        
        for (const assinatura of assinaturasMapa) {
          const similaridade = calcularSimilaridadeDeTexto(assinaturaPT, assinatura);
          if (similaridade > maiorSimilaridade && similaridade > 0.3) {
            maiorSimilaridade = similaridade;
            melhorCorrespondencia = assinatura;
          }
        }
        
        if (melhorCorrespondencia) {
          correspondencias[idioma] = {
            arquivo: mapas[idioma][melhorCorrespondencia].arquivo,
            caminho: mapas[idioma][melhorCorrespondencia].caminho,
            titulo: mapas[idioma][melhorCorrespondencia].titulo,
            similaridade: maiorSimilaridade
          };
        }
      }
      
      // Adicionar à lista de traduções faltantes
      traducoesFaltantes.push({
        id: historia.id,
        titulo: historia.title,
        idiomasFaltantes,
        correspondenciasEncontradas: correspondencias
      });
    }
  });
  
  // Salvar resultado em um arquivo JSON
  fs.writeFileSync(outputPath, JSON.stringify({
    totalHistorias: historias.length,
    historiasComTraducoesFaltantes: traducoesFaltantes.length,
    traducoesFaltantes
  }, null, 2));
  
  console.log(`Análise concluída. Encontradas ${traducoesFaltantes.length} histórias com traduções faltantes.`);
  console.log(`Resultado salvo em: ${outputPath}`);
}

/**
 * Calcula similaridade entre duas strings (0 a 1)
 */
function calcularSimilaridadeDeTexto(textoA, textoB) {
  // Normalizar textos
  function normalizar(texto) {
    return texto.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, '');
  }
  
  const a = normalizar(textoA);
  const b = normalizar(textoB);
  
  // Dividir em tokens (palavras)
  const tokensA = a.split(/\s+/).filter(t => t.length > 2);
  const tokensB = b.split(/\s+/).filter(t => t.length > 2);
  
  // Contar tokens correspondentes
  const correspondencias = tokensA.filter(tokenA => 
    tokensB.some(tokenB => tokenB.includes(tokenA) || tokenA.includes(tokenB))
  ).length;
  
  // Calcular similaridade como proporção de correspondências
  const total = Math.max(tokensA.length, tokensB.length);
  return total > 0 ? correspondencias / total : 0;
}

/**
 * Função principal
 */
async function main() {
  console.log('Iniciando identificação de traduções faltantes...');
  await identificarTraducoesFaltantes();
}

// Executar
main().catch(console.error);
