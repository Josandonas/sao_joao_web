import fs from 'fs/promises';
import path from 'path';

/**
 * Script para extrair dados adicionais do sistema legado (arquivo HTML) e enriquecer
 * o arquivo mapeamento_imagens_legado.json com campos que estão faltando.
 * 
 * Campos a adicionar:
 * - religion (religião)
 * - startYear (ano de início)
 * - currentCelebrant (festeiro atual)
 * - motivation (motivação)
 * - grace (graça alcançada)
 */

// Caminhos para os arquivos
const LEGACY_HTML_PATH = 'C:/Users/jmsandonas/Desktop/Sao_Joao_app/banho_c/indexc5fe.html';
const MAPPING_JSON_PATH = path.resolve(process.cwd(), 'src/pages/Communities/data/mapeamento_imagens_legado.json');

/**
 * Função para extrair manualmente os dados das comunidades do HTML
 */
async function extractLegacyCommunities() {
  try {
    console.log(`Lendo arquivo HTML legado: ${LEGACY_HTML_PATH}`);
    const htmlContent = await fs.readFile(LEGACY_HTML_PATH, 'utf-8');
    
    // Vamos extrair diretamente a parte do script que contém os dados das comunidades
    console.log('Extraindo os dados das comunidades do HTML...');
    
    // Encontrar as linhas que contêm os dados das comunidades
    const startMarker = 'var comunidades = [';
    const endMarker = '];';
    
    const startIndex = htmlContent.indexOf(startMarker);
    if (startIndex === -1) {
      throw new Error('Não foi possível encontrar o início dos dados das comunidades');
    }
    
    let endIndex = htmlContent.indexOf(endMarker, startIndex);
    if (endIndex === -1) {
      throw new Error('Não foi possível encontrar o fim dos dados das comunidades');
    }
    endIndex += endMarker.length - 1;
    
    // Dados brutos
    const rawData = htmlContent.substring(startIndex + startMarker.length - 1, endIndex);
    
    // Vamos criar uma estrutura de dados simplificada manualmente
    console.log('Fazendo parsing manual dos dados...');
    
    // Abordagem manual para extrair as comunidades
    const communities = [];
    const communitiesData = rawData.split('},{')
      .map((item, index) => {
        // Ajusta o primeiro e último item
        if (index === 0) return item.replace('[{', '{') + '}';
        return '{' + item + '}';
      });
    
    for (const commData of communitiesData) {
      try {
        // Extrair os campos que nos interessam
        const id = extractField(commData, 'id');
        const nome = extractField(commData, 'nome');
        const religiao = extractField(commData, 'religiao');
        const ano_inicio = extractField(commData, 'ano_inicio');
        const festeiro = extractField(commData, 'festeiro');
        const motivacao = extractField(commData, 'motivacao');
        const graca = extractField(commData, 'graca');
        const local = extractField(commData, 'local');
        
        if (id) {
          communities.push({
            id,
            nome,
            religiao,
            ano_inicio,
            festeiro,
            motivacao,
            graca,
            local
          });
        }
      } catch (err) {
        console.error('Erro ao processar comunidade:', err);
      }
    }
    
    console.log(`Dados extraídos com sucesso: ${communities.length} comunidades`);
    return communities;
  } catch (error) {
    console.error('Erro ao extrair dados legados:', error);
    throw error;
  }
}

/**
 * Função auxiliar para extrair o valor de um campo
 */
function extractField(dataStr, fieldName) {
  const regex = new RegExp(`['"]${fieldName}['"]\\s*:\\s*['"]([^'"]*)['"]`);
  const match = regex.exec(dataStr);
  return match ? match[1] : '';
}

/**
 * Função para criar um campo multilíngue
 */
function createI18nField(value, i18nOptions = {}) {
  if (!value) return { pt: '', en: '', es: '' };
  
  // Valores padrão para traduções básicas
  const translations = {
    // Religião
    'Católica': { en: 'Catholic', es: 'Católica' },
    'Afro-Brasileira': { en: 'Afro-Brazilian', es: 'Afro-Brasileña' },
    
    // Graça
    'Cura': { en: 'Healing', es: 'Curación' },
    'Não declarada': { en: 'Not declared', es: 'No declarada' },
    
    // Motivação comum
    'Fé': { en: 'Faith', es: 'Fe' },
    'Tradição familiar': { en: 'Family tradition', es: 'Tradición familiar' },
    ...i18nOptions
  };

  // Se temos uma tradução pré-definida
  if (translations[value]) {
    return {
      pt: value,
      en: translations[value].en,
      es: translations[value].es
    };
  }
  
  // Se não temos uma tradução pré-definida, usamos o mesmo valor
  return {
    pt: value,
    en: value,
    es: value
  };
}

/**
 * Função principal para enriquecer o arquivo de mapeamento com os dados legados
 */
async function enrichMappingWithLegacyData() {
  try {
    // 1. Extrair os dados legados
    const legacyCommunities = await extractLegacyCommunities();
    
    // 2. Carregar o arquivo de mapeamento atual
    console.log(`Lendo arquivo de mapeamento JSON: ${MAPPING_JSON_PATH}`);
    const mappingContent = await fs.readFile(MAPPING_JSON_PATH, 'utf-8');
    const mappingData = JSON.parse(mappingContent);
    
    // 3. Criar um mapa para acesso rápido aos dados legados
    const legacyMap = new Map();
    legacyCommunities.forEach(comm => {
      legacyMap.set(comm.id, comm);
    });
    
    console.log(`Mapeados ${legacyMap.size} comunidades do sistema legado`);
    
    // 4. Enriquecer os dados do mapeamento com os dados legados
    let enrichedCount = 0;
    let communitiesProcessed = 0;
    
    mappingData.detalhes_comunidades_imagens.forEach(community => {
      communitiesProcessed++;
      const legacyCommunity = legacyMap.get(community.id);
      
      if (!legacyCommunity) {
        console.log(`Comunidade ID ${community.id} não encontrada nos dados legados.`);
        return;
      }
      
      let fieldsAdded = 0;
      
      // Adicionar campos que estão faltando (sem alterar as referências de imagens)
      
      // Campo: religion (religião)
      if (!community.religion && legacyCommunity.religiao) {
        community.religion = createI18nField(legacyCommunity.religiao);
        fieldsAdded++;
      }
      
      // Campo: startYear (ano de início)
      if (!community.startYear && legacyCommunity.ano_inicio) {
        community.startYear = legacyCommunity.ano_inicio;
        fieldsAdded++;
      }
      
      // Campo: currentCelebrant (festeiro atual)
      if (!community.currentCelebrant && legacyCommunity.festeiro) {
        community.currentCelebrant = createI18nField(legacyCommunity.festeiro);
        fieldsAdded++;
      }
      
      // Campo: motivation (motivação)
      if (!community.motivation && legacyCommunity.motivacao) {
        community.motivation = createI18nField(legacyCommunity.motivacao);
        fieldsAdded++;
      }
      
      // Campo: grace (graça alcançada)
      if (!community.grace && legacyCommunity.graca) {
        community.grace = createI18nField(legacyCommunity.graca);
        fieldsAdded++;
      }
      
      if (fieldsAdded > 0) {
        console.log(`Comunidade ID ${community.id} (${community.nome_referencia}): ${fieldsAdded} campos adicionados.`);
        enrichedCount++;
      }
    });
    
    // 5. Salvar o arquivo de mapeamento atualizado
    await fs.writeFile(MAPPING_JSON_PATH, JSON.stringify(mappingData, null, 2), 'utf-8');
    
    console.log(`
=== Resumo da Migração ===
Comunidades processadas: ${communitiesProcessed}
Comunidades enriquecidas: ${enrichedCount}
Arquivo salvo em: ${MAPPING_JSON_PATH}
========================
`);
    
  } catch (error) {
    console.error('Erro ao enriquecer o mapeamento:', error);
  }
}

// Executar a função principal
enrichMappingWithLegacyData();
