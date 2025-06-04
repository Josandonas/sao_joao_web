import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

// Assumindo que o script é executado da raiz do projeto
const PROJECT_ROOT = process.cwd();
const COMMUNITIES_DATA_JS_PATH = path.join(PROJECT_ROOT, 'src', 'pages', 'Communities', 'data', 'communitiesData.js');
const MAPPING_JSON_PATH = path.join(PROJECT_ROOT, 'src', 'pages', 'Communities', 'data', 'mapeamento_imagens_legado.json');

async function enrichMappingFile() {
  console.log('Iniciando enriquecimento do mapeamento_imagens_legado.json com dados de communitiesData.js...');
  console.log(`Lendo communitiesData.js de: ${COMMUNITIES_DATA_JS_PATH}`);
  console.log(`Lendo mapeamento_imagens_legado.json de: ${MAPPING_JSON_PATH}`);

  try {
    const communitiesDataModule = await import(pathToFileURL(COMMUNITIES_DATA_JS_PATH).href);
    const communitiesSourceData = communitiesDataModule.communitiesData;

    const mappingFileContent = await fs.readFile(MAPPING_JSON_PATH, 'utf-8');
    const mappingData = JSON.parse(mappingFileContent);

    const sourceDataMap = new Map();
    for (const community of communitiesSourceData) {
      sourceDataMap.set(String(community.id), community);
    }

    let enrichedCount = 0;
    let notFoundInSourceCount = 0;
    let changesMade = false;

    mappingData.detalhes_comunidades_imagens.forEach(targetCommunity => {
      const sourceCommunity = sourceDataMap.get(targetCommunity.id);
      const targetIdNum = parseInt(targetCommunity.id, 10);
      let itemChanged = false;

      // Preserve original nome_referencia, imagem_capa_legado, galeria_imagens_legado
      // These are not touched by data from sourceCommunity.

      if (sourceCommunity) {
        // --- Enrich/Update general text fields ---
        const newName = { ...(sourceCommunity.name || { pt: targetCommunity.nome_referencia, en: targetCommunity.nome_referencia, es: targetCommunity.nome_referencia }) };
        if (JSON.stringify(targetCommunity.name) !== JSON.stringify(newName)) { targetCommunity.name = newName; itemChanged = true; }

        const newDescription = { ...(sourceCommunity.description || { pt: '', en: '', es: '' }) };
        if (JSON.stringify(targetCommunity.description) !== JSON.stringify(newDescription)) { targetCommunity.description = newDescription; itemChanged = true; }
        
        const newFullDescription = { ...(sourceCommunity.fullDescription || { pt: '', en: '', es: '' }) };
        if (JSON.stringify(targetCommunity.fullDescription) !== JSON.stringify(newFullDescription)) { targetCommunity.fullDescription = newFullDescription; itemChanged = true; }

        const newTraditions = { ...(sourceCommunity.traditions || { pt: '', en: '', es: '' }) };
        if (JSON.stringify(targetCommunity.traditions) !== JSON.stringify(newTraditions)) { targetCommunity.traditions = newTraditions; itemChanged = true; }

        const newFestivalDate = { ...(sourceCommunity.festival_date || { pt: '', en: '', es: '' }) };
        if (JSON.stringify(targetCommunity.festival_date) !== JSON.stringify(newFestivalDate)) { targetCommunity.festival_date = newFestivalDate; itemChanged = true; }

        // --- Handle 'coordinates' ---
        // (Assumes previous script syncMappingFromCommunityData.mjs already set these as desired from communitiesData.js)
        const newCoordinates = { ...(sourceCommunity.coordinates || targetCommunity.coordinates) };
        if (JSON.stringify(targetCommunity.coordinates) !== JSON.stringify(newCoordinates)) { targetCommunity.coordinates = newCoordinates; itemChanged = true; }

        // --- Handle 'location' (which includes 'bairro' as 'location.pt') ---
        const originalJsonBairro = targetCommunity.bairro; // Bairro as it is in JSON before this script's logic
        
        // Initialize newLocation with existing values from JSON or sensible defaults
        let newLocation = { 
            pt: originalJsonBairro,
            en: (targetCommunity.location && targetCommunity.location.en) ? targetCommunity.location.en : originalJsonBairro,
            es: (targetCommunity.location && targetCommunity.location.es) ? targetCommunity.location.es : originalJsonBairro
        };

        if (sourceCommunity.location) { // If source has location data
            if (targetIdNum > 55) {
                // For ID > 55, update all parts of location from source if they exist
                newLocation.pt = sourceCommunity.location.pt || originalJsonBairro; // Prioritize source, fallback to original JSON
                newLocation.en = sourceCommunity.location.en || newLocation.pt;    // Fallback to new .pt
                newLocation.es = sourceCommunity.location.es || newLocation.pt;    // Fallback to new .pt
            } else {
                // For ID <= 55, keep existing .pt (bairro from JSON). 
                // Update .en and .es from source if they exist, otherwise default to original JSON bairro.
                newLocation.pt = originalJsonBairro; // Explicitly keep original JSON bairro for .pt
                newLocation.en = sourceCommunity.location.en || originalJsonBairro;
                newLocation.es = sourceCommunity.location.es || originalJsonBairro;
            }
        }
        // If sourceCommunity.location doesn't exist, newLocation remains based on targetCommunity.bairro.
        
        if (JSON.stringify(targetCommunity.location) !== JSON.stringify(newLocation)) { targetCommunity.location = newLocation; itemChanged = true; }
        
        // Ensure targetCommunity.bairro field is consistent with location.pt
        if (targetCommunity.bairro !== newLocation.pt) { targetCommunity.bairro = newLocation.pt; itemChanged = true; }

        if (itemChanged) {
            console.log(`ID ${targetCommunity.id} (${targetCommunity.nome_referencia}): Enriquecido/Atualizado com dados de communitiesData.js.`);
            enrichedCount++;
            changesMade = true;
        }

      } else { // Community from JSON not found in communitiesData.js
        // Ensure i18n structure for consistency, using existing nome_referencia and bairro.
        let missingStructureChanged = false;
        if (!targetCommunity.name) { targetCommunity.name = { pt: targetCommunity.nome_referencia, en: targetCommunity.nome_referencia, es: targetCommunity.nome_referencia }; missingStructureChanged = true; }
        if (!targetCommunity.location) { targetCommunity.location = { pt: targetCommunity.bairro, en: targetCommunity.bairro, es: targetCommunity.bairro }; missingStructureChanged = true; }
        else { // ensure .pt matches bairro if location exists
            if (targetCommunity.location.pt !== targetCommunity.bairro) {targetCommunity.location.pt = targetCommunity.bairro; missingStructureChanged = true;}
            if (!targetCommunity.location.en) {targetCommunity.location.en = targetCommunity.bairro; missingStructureChanged = true;}
            if (!targetCommunity.location.es) {targetCommunity.location.es = targetCommunity.bairro; missingStructureChanged = true;}
        }
        if (!targetCommunity.description) { targetCommunity.description = { pt: '', en: '', es: '' }; missingStructureChanged = true; }
        if (!targetCommunity.fullDescription) { targetCommunity.fullDescription = { pt: '', en: '', es: '' }; missingStructureChanged = true; }
        if (!targetCommunity.traditions) { targetCommunity.traditions = { pt: '', en: '', es: '' }; missingStructureChanged = true; }
        if (!targetCommunity.festival_date) { targetCommunity.festival_date = { pt: '', en: '', es: '' }; missingStructureChanged = true; }
        // Coordinates should already exist. imagem_capa_legado and galeria_imagens_legado are preserved.

        if (missingStructureChanged) {
            console.warn(`AVISO: ID ${targetCommunity.id} (${targetCommunity.nome_referencia}) do mapeamento não encontrado em communitiesData.js. Estrutura i18n padronizada.`);
            changesMade = true;
        }
        notFoundInSourceCount++; // Still counts as "not found in source" for reporting
      }
    });

    if (changesMade) {
      await fs.writeFile(MAPPING_JSON_PATH, JSON.stringify(mappingData, null, 2), 'utf-8');
      console.log(`\nEnriquecimento concluído.`);
      if (enrichedCount > 0) console.log(`${enrichedCount} comunidades foram enriquecidas/atualizadas com base em communitiesData.js.`);
      console.log(`${notFoundInSourceCount} comunidades do mapeamento não foram encontradas em communitiesData.js (algumas podem ter tido apenas a estrutura i18n padronizada).`);
      console.log(`Arquivo atualizado: ${MAPPING_JSON_PATH}`);
    } else {
      console.log('\nNenhuma alteração foi necessária no arquivo de mapeamento.');
    }

  } catch (error) {
    console.error('Ocorreu um erro durante o enriquecimento do arquivo de mapeamento:', error);
  }
}

enrichMappingFile();