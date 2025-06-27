import fs from 'fs/promises';
import path from 'path';

// Assumindo que o script é executado da raiz do projeto
const PROJECT_ROOT = process.cwd(); 
const MAPPING_FILE_PATH = path.join(PROJECT_ROOT, 'mapeamento_imagens_legado.json');
const COMMUNITIES_DATA_PATH = path.join(PROJECT_ROOT, 'src', 'pages', 'Communities', 'data', 'communitiesData.js');

const NO_PHOTO_LEGACY_PATH = "static/tema/no_photo.jpg";
const NO_PHOTO_TARGET_PATH = "/assets/images/communities/no_photo.jpg";

async function syncCommunityData() {
  console.log('Iniciando sincronização de communitiesData.js com o mapeamento de imagens...');
  console.log(`Lendo arquivo de mapeamento: ${MAPPING_FILE_PATH}`);
  console.log(`Lendo arquivo de dados das comunidades: ${COMMUNITIES_DATA_PATH}`);

  try {
    const mappingFileContent = await fs.readFile(MAPPING_FILE_PATH, 'utf-8');
    const mappingData = JSON.parse(mappingFileContent);

    let communitiesJsContent = await fs.readFile(COMMUNITIES_DATA_PATH, 'utf-8');
    let communitiesUpdatedCount = 0;

    for (const mappedCommunity of mappingData.detalhes_comunidades_imagens) {
      const communityId = parseInt(mappedCommunity.id, 10); // ID em communitiesData.js é numérico

      let newImagePath = mappedCommunity.imagem_capa_legado;
      if (newImagePath === NO_PHOTO_LEGACY_PATH) {
        newImagePath = NO_PHOTO_TARGET_PATH;
      }
      // Garante que o caminho da imagem seja uma string formatada para JS
      const newImageJsString = `"${newImagePath}"`;

      const newGalleryArray = mappedCommunity.galeria_imagens_legado || [];
      // Converte o array da galeria para uma string formatada para JS (ex: ["/path1.jpg", "/path2.jpg"])
      const newGalleryJsString = JSON.stringify(newGalleryArray);

      // Regex para encontrar e substituir o valor da propriedade 'image'
      // Captura: (parte antes do valor da imagem)(valor antigo da imagem)
      const imageRegex = new RegExp(`(id:\s*${communityId},[\s\S]*?image:\s*)[^,]+`);
      
      // Regex para encontrar e substituir o valor da propriedade 'gallery'
      // Captura: (parte antes do array da galeria)(array antigo da galeria)
      const galleryRegex = new RegExp(`(id:\s*${communityId},[\s\S]*?gallery:\s*)\[[^\]]*\]`);

      let imageReplaced = false;
      let galleryReplaced = false;
      const originalContentSnapshot = communitiesJsContent;

      communitiesJsContent = communitiesJsContent.replace(imageRegex, (match, p1) => {
        imageReplaced = true;
        return `${p1}${newImageJsString}`;
      });

      communitiesJsContent = communitiesJsContent.replace(galleryRegex, (match, p1) => {
        galleryReplaced = true;
        return `${p1}${newGalleryJsString}`;
      });

      if (imageReplaced || galleryReplaced) {
        if (originalContentSnapshot !== communitiesJsContent) {
            communitiesUpdatedCount++;
            console.log(`ID ${communityId}: Caminhos atualizados (Imagem: ${imageReplaced}, Galeria: ${galleryReplaced}).`);
        } else {
            console.log(`ID ${communityId}: Caminhos já estavam corretos (Imagem: ${imageReplaced}, Galeria: ${galleryReplaced}).`);
        }
      } else {
        console.warn(`AVISO: ID ${communityId} do mapeamento não encontrado ou estrutura inesperada em communitiesData.js.`);
      }
    }

    if (communitiesUpdatedCount > 0) {
      await fs.writeFile(COMMUNITIES_DATA_PATH, communitiesJsContent, 'utf-8');
      console.log(`\nSincronização concluída. ${communitiesUpdatedCount} comunidades tiveram seus dados de imagem atualizados em ${COMMUNITIES_DATA_PATH}`);
    } else {
      console.log('\nNenhuma alteração real foi necessária em communitiesData.js (ou nenhum ID correspondente encontrado para modificação).');
    }

  } catch (error) {
    console.error('Ocorreu um erro durante a sincronização:', error);
  }
}

syncCommunityData();
