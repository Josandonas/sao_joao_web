/**
 * Script para corrigir duplicações no arquivo JSON de histórias
 * 
 * Este script remove as duplicações e mantém apenas as histórias com traduções.
 * Para executar: node corrigir_duplicacoes.js
 */

const fs = require('fs');
const path = require('path');

// Caminho do arquivo JSON
const JSON_PATH = path.join(__dirname, '..', 'data', 'stories.json');

// Função principal
async function corrigirDuplicacoes() {
  try {
    console.log('Iniciando correção das duplicações no arquivo JSON...');
    
    // Ler o arquivo JSON
    const jsonContent = fs.readFileSync(JSON_PATH, 'utf8');
    const data = JSON.parse(jsonContent);
    
    if (!data.stories || !Array.isArray(data.stories)) {
      console.error('Formato de arquivo JSON inválido: propriedade "stories" não encontrada ou não é um array');
      return;
    }
    
    console.log(`Total de histórias no arquivo atual: ${data.stories.length}`);
    
    // Mapear histórias por título para identificar duplicados
    const historiasPorTitulo = {};
    
    // Primeiro passo: identificar histórias com e sem traduções
    for (const historia of data.stories) {
      const titulo = historia.title;
      
      if (!historiasPorTitulo[titulo]) {
        historiasPorTitulo[titulo] = [];
      }
      
      historiasPorTitulo[titulo].push(historia);
    }
    
    // Segundo passo: para cada grupo de histórias com o mesmo título,
    // manter apenas a que tem traduções ou a primeira se nenhuma tiver traduções
    const historiasCorrigidas = [];
    let idCounter = 1; // Para renumerar as histórias
    
    for (const titulo in historiasPorTitulo) {
      const historias = historiasPorTitulo[titulo];
      
      // Procurar uma história com traduções
      const historiaComTraducoes = historias.find(h => h.translations && Object.keys(h.translations).length > 0);
      
      // Se encontrou uma com traduções, usar ela; caso contrário, usar a primeira
      const historiaSelecionada = historiaComTraducoes || historias[0];
      
      // Atualizar o ID
      historiaSelecionada.id = idCounter++;
      
      // Adicionar ao array corrigido
      historiasCorrigidas.push(historiaSelecionada);
    }
    
    console.log(`Total de histórias após remoção de duplicações: ${historiasCorrigidas.length}`);
    
    // Salvar o resultado no arquivo JSON
    const resultadoFinal = { stories: historiasCorrigidas };
    
    fs.writeFileSync(
      JSON_PATH, 
      JSON.stringify(resultadoFinal, null, 2),
      'utf8'
    );
    
    console.log('Arquivo JSON atualizado com sucesso!');
    console.log(`Agora o arquivo contém ${historiasCorrigidas.length} histórias únicas.`);
  } catch (err) {
    console.error('Erro ao processar o arquivo JSON:', err);
  }
}

// Executar a função principal
corrigirDuplicacoes()
  .then(() => console.log('Processo finalizado.'))
  .catch(err => console.error('Erro durante a execução:', err));
