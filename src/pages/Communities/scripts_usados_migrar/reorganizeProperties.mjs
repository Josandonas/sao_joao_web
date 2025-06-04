import fs from 'fs/promises';
import path from 'path';

/**
 * Script para reorganizar as propriedades dos objetos de comunidades
 * no arquivo JSON, garantindo uma ordem consistente para todos os registros.
 * 
 * A ordem seguirá o exemplo das primeiras comunidades (ID 9).
 */

// Caminho para o arquivo de mapeamento
const MAPPING_JSON_PATH = path.resolve(process.cwd(), 'src/pages/Communities/data/mapeamento_imagens_legado.json');

/**
 * Ordem padrão das propriedades, baseada nas primeiras comunidades
 */
const PROPERTY_ORDER = [
  'id',
  'nome_referencia',
  'bairro',
  'imagem_capa_legado',
  'galeria_imagens_legado',
  'coordinates',
  'name',
  'description',
  'fullDescription',
  'traditions',
  'festival_date',
  'location',
  'religion',
  'startYear',
  'currentCelebrant',
  'motivation',
  'grace'
];

/**
 * Função para reorganizar as propriedades de um objeto na ordem desejada
 */
function reorderProperties(obj) {
  const orderedObj = {};
  
  // Adiciona as propriedades na ordem definida (se existirem no objeto original)
  PROPERTY_ORDER.forEach(prop => {
    if (obj.hasOwnProperty(prop)) {
      orderedObj[prop] = obj[prop];
    }
  });
  
  // Adiciona quaisquer propriedades adicionais que não estejam na ordem definida
  Object.keys(obj).forEach(prop => {
    if (!orderedObj.hasOwnProperty(prop)) {
      orderedObj[prop] = obj[prop];
    }
  });
  
  return orderedObj;
}

/**
 * Função principal para reorganizar as propriedades das comunidades
 */
async function reorganizeCommunityProperties() {
  try {
    console.log(`Lendo arquivo de mapeamento JSON: ${MAPPING_JSON_PATH}`);
    const mappingContent = await fs.readFile(MAPPING_JSON_PATH, 'utf-8');
    const mappingData = JSON.parse(mappingContent);
    
    console.log('Reorganizando propriedades das comunidades...');
    
    let reorganizedCount = 0;
    let targetCommunityId = '56'; // A partir do ID 56
    let targetFound = false;
    
    // Reorganiza as propriedades de todas as comunidades a partir do ID 56
    mappingData.detalhes_comunidades_imagens = mappingData.detalhes_comunidades_imagens.map(community => {
      if (community.id === targetCommunityId) {
        targetFound = true;
      }
      
      if (targetFound) {
        reorganizedCount++;
        return reorderProperties(community);
      }
      
      return community;
    });
    
    // Salva o arquivo JSON reorganizado
    const formattedJson = JSON.stringify(mappingData, null, 2);
    await fs.writeFile(MAPPING_JSON_PATH, formattedJson, 'utf-8');
    
    console.log(`
=== Resumo da Reorganização ===
Comunidades reorganizadas: ${reorganizedCount}
Arquivo salvo em: ${MAPPING_JSON_PATH}
============================
`);
    
  } catch (error) {
    console.error('Erro ao reorganizar propriedades:', error);
  }
}

// Executa a função principal
reorganizeCommunityProperties();
