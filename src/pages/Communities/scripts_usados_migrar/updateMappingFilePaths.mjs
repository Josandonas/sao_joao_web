import fs from 'fs/promises';
import path from 'path';

// Ajustar caminho para ser relativo à raiz do projeto, não ao local do script
const PROJECT_ROOT = path.resolve(process.cwd(), '..', '..', '..', '..');
const MAPPING_FILE_PATH = path.join(PROJECT_ROOT, 'mapeamento_imagens_legado.json');
const NEW_WEB_BASE_PATH = '/assets/images/communities'; // Caminho base para a web, usado na string final

// Helper function to format index with leading zeros (e.g., 1 -> "01", 10 -> "10")
function formatIndex(number, length = 2) {
  return String(number).padStart(length, '0');
}

async function updateMappingFilePaths() {
  console.log('Iniciando atualização dos caminhos no arquivo de mapeamento...');
  console.log(`Arquivo de mapeamento a ser atualizado: ${MAPPING_FILE_PATH}`);

  try {
    const mappingFileContent = await fs.readFile(MAPPING_FILE_PATH, 'utf-8');
    const mappingData = JSON.parse(mappingFileContent);

    const updatedCommunities = mappingData.detalhes_comunidades_imagens.map(community => {
      const communityId = community.id;
      let newCoverPath = community.imagem_capa_legado;
      let newGalleryPaths = community.galeria_imagens_legado;

      // Atualizar imagem_capa_legado
      // Só atualiza se o caminho ainda estiver no formato legado 'static/arquivo/'
      if (community.imagem_capa_legado && typeof community.imagem_capa_legado === 'string' && community.imagem_capa_legado.startsWith('static/arquivo/')) {
        const originalCoverFileName = path.basename(community.imagem_capa_legado);
        const originalExtension = path.extname(originalCoverFileName);
        newCoverPath = `${NEW_WEB_BASE_PATH}/${communityId}/${communityId}_capa${originalExtension}`;
      }

      // Atualizar galeria_imagens_legado
      // Só atualiza se o caminho ainda estiver no formato legado 'static/arquivo/'
      if (Array.isArray(community.galeria_imagens_legado) && community.galeria_imagens_legado.length > 0) {
        newGalleryPaths = community.galeria_imagens_legado.map((originalGalleryImagePath, index) => {
          if (typeof originalGalleryImagePath === 'string' && originalGalleryImagePath.startsWith('static/arquivo/')) {
            const originalGalleryFileName = path.basename(originalGalleryImagePath);
            const originalExtension = path.extname(originalGalleryFileName);
            const galleryIndex = formatIndex(index + 1); // Index baseado em 1
            return `${NEW_WEB_BASE_PATH}/${communityId}/${communityId}_galeria/${communityId}_galeria_${galleryIndex}${originalExtension}`;
          }
          return originalGalleryImagePath; // Mantém o caminho original se não for processado ou já estiver no novo formato
        });
      }

      return {
        ...community,
        imagem_capa_legado: newCoverPath,
        galeria_imagens_legado: newGalleryPaths,
      };
    });

    const updatedMappingData = {
      ...mappingData,
      detalhes_comunidades_imagens: updatedCommunities,
    };

    await fs.writeFile(MAPPING_FILE_PATH, JSON.stringify(updatedMappingData, null, 2));
    console.log(`Arquivo de mapeamento atualizado com sucesso: ${MAPPING_FILE_PATH}`);

  } catch (error) {
    console.error('Ocorreu um erro ao atualizar os caminhos no arquivo de mapeamento:', error);
  }
}

updateMappingFilePaths();
