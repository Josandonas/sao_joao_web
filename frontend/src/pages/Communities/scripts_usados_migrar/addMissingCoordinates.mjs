import fs from 'fs/promises';
import path from 'path';

/**
 * Script para adicionar o objeto coordinates em todas as comunidades que não o possuem
 * no arquivo mapeamento_imagens_legado.json.
 * 
 * O coordinates é essencial para a exibição das comunidades no mapa interativo.
 */

const MAPPING_JSON_PATH = path.resolve(process.cwd(), 'src/pages/Communities/data/mapeamento_imagens_legado.json');

// Centro de Corumbá - valor padrão para comunidades sem coordenadas específicas
const DEFAULT_COORDINATES = {
  lat: -19.009,  // Latitude do centro de Corumbá
  lng: -57.652   // Longitude do centro de Corumbá
};

/**
 * Função principal para adicionar o objeto coordinates em comunidades que não o possuem
 */
async function addMissingCoordinates() {
  try {
    // 1. Carregar o arquivo de mapeamento atual
    console.log(`Lendo arquivo de mapeamento JSON: ${MAPPING_JSON_PATH}`);
    const mappingContent = await fs.readFile(MAPPING_JSON_PATH, 'utf-8');
    const mappingData = JSON.parse(mappingContent);
    
    // 2. Verificar e adicionar coordinates em comunidades que não possuem
    let communitiesProcessed = 0;
    let coordinatesAdded = 0;
    
    mappingData.detalhes_comunidades_imagens.forEach(community => {
      communitiesProcessed++;
      
      // Verificar se a comunidade já possui o objeto coordinates
      if (!community.coordinates) {
        // Vamos definir coordinates inicialmente para o centro de Corumbá
        // Estes valores poderão ser atualizados manualmente depois
        community.coordinates = { ...DEFAULT_COORDINATES };
        coordinatesAdded++;
        
        console.log(`Adicionado objeto coordinates para comunidade ID ${community.id} (${community.nome_referencia})`);
      }
    });
    
    // 3. Salvar o arquivo atualizado
    await fs.writeFile(MAPPING_JSON_PATH, JSON.stringify(mappingData, null, 2), 'utf-8');
    
    console.log(`
=== Resumo da Atualização ===
Comunidades processadas: ${communitiesProcessed}
Comunidades com coordinates adicionados: ${coordinatesAdded}
Arquivo salvo em: ${MAPPING_JSON_PATH}
============================
`);
    
  } catch (error) {
    console.error('Erro ao processar arquivo:', error);
  }
}

// Executar a função principal
addMissingCoordinates();
