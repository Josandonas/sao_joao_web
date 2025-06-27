/**
 * Script para gerar traduções automáticas para histórias sem traduções
 * usando um método simplificado baseado em mapeamento de termos comuns
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Caminhos
const jsonPath = path.join(__dirname, '../data/stories.json');
const backupPath = path.join(__dirname, `../data/stories.json.backup_${Date.now()}`);

/**
 * Extrai texto de um conteúdo HTML removendo as tags
 */
function extrairTextoSemTags(html) {
  const dom = new JSDOM(`<div>${html}</div>`);
  return dom.window.document.querySelector('div').textContent;
}

/**
 * Função principal para gerar traduções automáticas usando mapeamento de termos
 */
async function gerarTraducoesAutomaticas() {
  console.log('Iniciando geração de traduções automáticas...');
  
  // Verificar se o arquivo JSON existe
  if (!fs.existsSync(jsonPath)) {
    console.error('Arquivo JSON não encontrado:', jsonPath);
    return;
  }
  
  // Fazer backup do arquivo original
  fs.copyFileSync(jsonPath, backupPath);
  console.log(`Backup do JSON original criado em: ${backupPath}`);
  
  // Mapeamento de termos PT → EN
  const termosPT_EN = {
    'São João': 'Saint John',
    'festa': 'festival',
    'santo': 'saint',
    'história': 'story',
    'tradição': 'tradition',
    'fé': 'faith',
    'igreja': 'church',
    'promessa': 'promise',
    'banho': 'bath',
    'rio': 'river',
    'fogueira': 'bonfire',
    'bandeira': 'flag',
    'mastro': 'mast',
    'novena': 'novena',
    'devoção': 'devotion',
    'graça': 'grace',
    'comunidade': 'community',
    'eu': 'I',
    'meu': 'my',
    'minha': 'my',
    'nós': 'we',
    'a gente': 'we',
    'ele': 'he',
    'ela': 'she',
    'eles': 'they',
    'antigamente': 'formerly',
    'sempre': 'always',
    'nunca': 'never',
    'celebração': 'celebration',
    'faleceu': 'passed away',
    'começou': 'began',
    'carneirinho': 'little lamb',
    'filho': 'son',
    'filha': 'daughter',
    'irmã': 'sister',
    'irmão': 'brother',
    'mãe': 'mother',
    'pai': 'father',
    'avô': 'grandfather',
    'avó': 'grandmother',
    'saúde': 'health',
    'paz': 'peace',
    'coroa': 'crown',
    'brincadeira': 'entertainment',
    'começa': 'begins',
    'termina': 'ends',
    'ajuda': 'helps',
    'pedir': 'ask',
    'agradecer': 'thank',
    'emprego': 'job',
    'trabalhar': 'work',
  };
  
  // Mapeamento de termos PT → ES
  const termosPT_ES = {
    'São João': 'San Juan',
    'festa': 'fiesta',
    'santo': 'santo',
    'história': 'historia',
    'tradição': 'tradición',
    'fé': 'fe',
    'igreja': 'iglesia',
    'promessa': 'promesa',
    'banho': 'baño',
    'rio': 'río',
    'fogueira': 'hoguera',
    'bandeira': 'bandera',
    'mastro': 'mástil',
    'novena': 'novena',
    'devoção': 'devoción',
    'graça': 'gracia',
    'comunidade': 'comunidad',
    'eu': 'yo',
    'meu': 'mi',
    'minha': 'mi',
    'nós': 'nosotros',
    'a gente': 'nosotros',
    'ele': 'él',
    'ela': 'ella',
    'eles': 'ellos',
    'antigamente': 'antiguamente',
    'sempre': 'siempre',
    'nunca': 'nunca',
    'celebração': 'celebración',
    'faleceu': 'falleció',
    'começou': 'comenzó',
    'carneirinho': 'corderito',
    'filho': 'hijo',
    'filha': 'hija',
    'irmã': 'hermana',
    'irmão': 'hermano',
    'mãe': 'madre',
    'pai': 'padre',
    'avô': 'abuelo',
    'avó': 'abuela',
    'saúde': 'salud',
    'paz': 'paz',
    'coroa': 'corona',
    'brincadeira': 'juego',
    'começa': 'comienza',
    'termina': 'termina',
    'ajuda': 'ayuda',
    'pedir': 'pedir',
    'agradecer': 'agradecer',
    'emprego': 'empleo',
    'trabalhar': 'trabajar',
  };
  
  // Frases comuns PT → EN
  const frasesPT_EN = {
    'meu nome é': 'my name is',
    'a gente saía': 'we used to go out',
    'todos os anos': 'every year',
    'faz parte': 'is part of',
    'nossa família': 'our family',
    'tem que fazer': 'has to do',
    'dia de São João': 'Saint John\'s Day',
    'tudo começou': 'it all started',
    'gosta de festa': 'likes celebrations',
    'muito obrigado': 'thank you very much',
    'graças a Deus': 'thank God',
    'a mesma coisa': 'the same thing',
    'fortalecida na fé': 'strengthened in faith',
    'num sonho': 'in a dream',
  };
  
  // Frases comuns PT → ES
  const frasesPT_ES = {
    'meu nome é': 'mi nombre es',
    'a gente saía': 'nosotros salíamos',
    'todos os anos': 'todos los años',
    'faz parte': 'forma parte',
    'nossa família': 'nuestra familia',
    'tem que fazer': 'tiene que hacer',
    'dia de São João': 'día de San Juan',
    'tudo começou': 'todo comenzó',
    'gosta de festa': 'le gusta la fiesta',
    'muito obrigado': 'muchas gracias',
    'graças a Deus': 'gracias a Dios',
    'a mesma coisa': 'la misma cosa',
    'fortalecida na fé': 'fortalecida en la fe',
    'num sonho': 'en un sueño',
  };
  
  /**
   * Função para traduzir texto usando o mapeamento de termos e frases
   */
  function traduzirTexto(texto, idioma) {
    if (!texto) return '';
    
    const termosParaIdioma = idioma === 'en' ? termosPT_EN : termosPT_ES;
    const frasesParaIdioma = idioma === 'en' ? frasesPT_EN : frasesPT_ES;
    
    // Primeiro traduzir frases completas
    let resultado = texto;
    Object.entries(frasesParaIdioma).forEach(([frasePT, fraseTraducao]) => {
      const regex = new RegExp(frasePT, 'gi');
      resultado = resultado.replace(regex, fraseTraducao);
    });
    
    // Depois traduzir termos individuais
    Object.entries(termosParaIdioma).forEach(([termoPT, termoTraducao]) => {
      const regex = new RegExp(`\\b${termoPT}\\b`, 'gi');
      resultado = resultado.replace(regex, termoTraducao);
    });
    
    return resultado;
  }
  
  /**
   * Função para traduzir HTML preservando as tags
   */
  function traduzirHTML(html, idioma) {
    if (!html) return '';
    
    // Criar um DOM temporário para manipular o HTML
    const dom = new JSDOM(`<div>${html}</div>`);
    const elementos = dom.window.document.querySelectorAll('div > *');
    
    let resultado = '';
    
    // Para cada elemento no HTML
    for (const elemento of elementos) {
      // Obter o HTML original e o texto
      const elementoHtml = elemento.outerHTML;
      const texto = elemento.textContent;
      
      if (!texto.trim()) {
        resultado += elementoHtml;
        continue;
      }
      
      // Traduzir apenas o texto
      const textoTraduzido = traduzirTexto(texto, idioma);
      
      // Substituir o texto original pelo traduzido, mantendo as tags
      let novoElemento = elementoHtml.replace(texto, textoTraduzido);
      resultado += novoElemento;
    }
    
    return resultado;
  }
  
  // Carregar dados do JSON
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const historias = data.stories || [];
  
  console.log(`\nProcessando ${historias.length} histórias...`);
  let contadorTraducoesEN = 0;
  let contadorTraducoesES = 0;
  
  // Processar cada história
  for (let i = 0; i < historias.length; i++) {
    const historia = historias[i];
    console.log(`\nHistória ${i+1}/${historias.length}: "${historia.title}"`);
    
    // Garantir que o objeto translations existe
    if (!historia.translations) {
      historia.translations = {};
    }
    
    // Garantir que a tradução PT existe
    if (!historia.translations.pt) {
      historia.translations.pt = {
        title: historia.title,
        autor: historia.autor,
        excerpt: historia.excerpt,
        content: historia.content
      };
    }
    
    // Verificar se precisa de tradução em inglês
    const precisaTraducaoEN = !historia.translations.en || 
                            !historia.translations.en.content || 
                            historia.translations.en.content.length < 50;
    
    // Verificar se precisa de tradução em espanhol
    const precisaTraducaoES = !historia.translations.es || 
                            !historia.translations.es.content || 
                            historia.translations.es.content.length < 50;
    
    // Se não precisa de nenhuma tradução, pular
    if (!precisaTraducaoEN && !precisaTraducaoES) {
      console.log(`  ✅ História já possui todas as traduções`);
      continue;
    }
    
    // Gerar tradução em inglês se necessário
    if (precisaTraducaoEN) {
      console.log(`  🔄 Gerando tradução em inglês...`);
      
      // Traduzir título
      const tituloEN = traduzirTexto(historia.title, 'en');
      
      // Traduzir excerpt
      const excerptTexto = extrairTextoSemTags(historia.excerpt);
      const excerptEN = traduzirTexto(excerptTexto, 'en');
      
      // Traduzir conteúdo preservando tags HTML
      const contentEN = traduzirHTML(historia.content, 'en');
      
      // Criar ou atualizar objeto de tradução em inglês
      historia.translations.en = {
        title: tituloEN,
        autor: historia.autor, // Não traduzir autor
        excerpt: excerptEN,
        content: contentEN
      };
      
      contadorTraducoesEN++;
      console.log(`  ✅ Tradução em inglês gerada com sucesso!`);
    }
    
    // Gerar tradução em espanhol se necessário
    if (precisaTraducaoES) {
      console.log(`  🔄 Gerando tradução em espanhol...`);
      
      // Traduzir título
      const tituloES = traduzirTexto(historia.title, 'es');
      
      // Traduzir excerpt
      const excerptTexto = extrairTextoSemTags(historia.excerpt);
      const excerptES = traduzirTexto(excerptTexto, 'es');
      
      // Traduzir conteúdo preservando tags HTML
      const contentES = traduzirHTML(historia.content, 'es');
      
      // Criar ou atualizar objeto de tradução em espanhol
      historia.translations.es = {
        title: tituloES,
        autor: historia.autor, // Não traduzir autor
        excerpt: excerptES,
        content: contentES
      };
      
      contadorTraducoesES++;
      console.log(`  ✅ Tradução em espanhol gerada com sucesso!`);
    }
    
    // Salvar progresso a cada 5 histórias para evitar perda de dados
    if (i % 5 === 4 || i === historias.length - 1) {
      fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
      console.log(`  💾 Progresso salvo (${i+1}/${historias.length} histórias)`);
    }
  }
  
  // Salvar JSON final
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  
  console.log(`\n✅ Processo concluído com sucesso!`);
  console.log(`✓ ${contadorTraducoesEN} traduções em inglês geradas`);
  console.log(`✓ ${contadorTraducoesES} traduções em espanhol geradas`);
}

// Executar o script
gerarTraducoesAutomaticas().catch(erro => {
  console.error('Erro durante a execução:', erro);
});
