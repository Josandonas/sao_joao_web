import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

// Assumindo que o script é executado da raiz do projeto
const PROJECT_ROOT = process.cwd();
const COMMUNITIES_DATA_JS_PATH = path.join(PROJECT_ROOT, 'src', 'pages', 'Communities', 'data', 'communitiesData.js');
const MAPPING_JSON_PATH = path.join(PROJECT_ROOT, 'src', 'pages', 'Communities', 'data', 'mapeamento_imagens_legado.json');

async function syncMapping() {
  console.log('Iniciando sincronização de mapeamento_imagens_legado.json a partir de communitiesData.js...');
  console.log(`Lendo communitiesData.js de: ${COMMUNITIES_DATA_JS_PATH}`);
  console.log(`Lendo mapeamento_imagens_legado.json de: ${MAPPING_JSON_PATH}`);

  try {
    // Importar dinamicamente o communitiesData.js
    // pathToFileURL é necessário para import() de caminhos absolutos no Windows
    const communitiesDataModule = await import(pathToFileURL(COMMUNITIES_DATA_JS_PATH).href);
    const communitiesSourceData = communitiesDataModule.communitiesData;

    const mappingFileContent = await fs.readFile(MAPPING_JSON_PATH, 'utf-8');
    const mappingData = JSON.parse(mappingFileContent);

    // Criar um mapa para acesso rápido aos dados de communitiesData.js pelo ID
    const sourceDataMap = new Map();
    for (const community of communitiesSourceData) {
      sourceDataMap.set(String(community.id), community); // ID no JSON é string
    }

    let updatedCount = 0;
    let notFoundCount = 0;

    mappingData.detalhes_comunidades_imagens.forEach(targetCommunity => {
      const sourceCommunity = sourceDataMap.get(targetCommunity.id);
      if (sourceCommunity) {
        let changed = false;
        // Atualizar bairro
        if (sourceCommunity.location && sourceCommunity.location.pt) {
          if (targetCommunity.bairro !== sourceCommunity.location.pt) {
            targetCommunity.bairro = sourceCommunity.location.pt;
            changed = true;
          }
        }

        // Atualizar coordinates
        if (sourceCommunity.coordinates) {
          // Comparar objetos JSON para ver se houve mudança real
          if (JSON.stringify(targetCommunity.coordinates) !== JSON.stringify(sourceCommunity.coordinates)) {
            targetCommunity.coordinates = { ...sourceCommunity.coordinates }; // Copiar o objeto
            changed = true;
          }
        }
        if (changed) {
            console.log(`ID ${targetCommunity.id} (${targetCommunity.nome_referencia}): Dados de bairro e/ou coordenadas atualizados.`);
            updatedCount++;
        }
      } else {
        console.warn(`AVISO: ID ${targetCommunity.id} (${targetCommunity.nome_referencia}) do mapeamento não encontrado em communitiesData.js.`);
        notFoundCount++;
      }
    });

    if (updatedCount > 0) {
      await fs.writeFile(MAPPING_JSON_PATH, JSON.stringify(mappingData, null, 2), 'utf-8');
      console.log(`\nSincronização concluída. ${updatedCount} comunidades atualizadas em ${MAPPING_JSON_PATH}.`);
    } else {
      console.log('\nNenhuma atualização necessária nos dados de bairro ou coordenadas em mapeamento_imagens_legado.json.');
    }
    if (notFoundCount > 0) {
        console.log(`${notFoundCount} IDs do mapeamento não foram encontrados em communitiesData.js.`);
    }

  } catch (error) {
    console.error('Ocorreu um erro durante a sincronização:', error);
  }
}

syncMapping();
