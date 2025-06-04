import fs from 'fs/promises';
import path from 'path';

// Ajustar caminho para ser relativo à raiz do projeto, não ao local do script
const PROJECT_ROOT = path.resolve(process.cwd(), '..', '..', '..', '..');
const TARGET_COMMUNITIES_IMAGE_PATH = path.join(PROJECT_ROOT, 'public', 'assets', 'images', 'communities');

// Helper function to format index with leading zeros (e.g., 1 -> "01", 10 -> "10")
function formatIndex(number, length = 2) {
  return String(number).padStart(length, '0');
}

async function renameMigratedImages() {
  console.log('Iniciando renomeação de imagens migradas...');
  console.log(`Diretório alvo para renomeação: ${TARGET_COMMUNITIES_IMAGE_PATH}`);

  try {
    const communityIdDirs = await fs.readdir(TARGET_COMMUNITIES_IMAGE_PATH, { withFileTypes: true });

    for (const dirent of communityIdDirs) {
      if (dirent.isDirectory()) {
        const communityId = dirent.name;
        const communityPath = path.join(TARGET_COMMUNITIES_IMAGE_PATH, communityId);
        console.log(`\nProcessando comunidade ID: ${communityId}`);

        // 1. Renomear imagem de capa
        const communityDirItems = await fs.readdir(communityPath, { withFileTypes: true });
        let coverImageProcessed = false;
        for (const itemInCommunityDir of communityDirItems) {
          if (itemInCommunityDir.isFile()) {
            const oldCoverPath = path.join(communityPath, itemInCommunityDir.name);
            const extension = path.extname(itemInCommunityDir.name);
            const newCoverName = `${communityId}_capa${extension}`;
            const newCoverPath = path.join(communityPath, newCoverName);

            if (oldCoverPath !== newCoverPath) {
              try {
                await fs.rename(oldCoverPath, newCoverPath);
                console.log(`Capa renomeada: ${oldCoverPath} -> ${newCoverPath}`);
              } catch (err) {
                console.error(`Erro ao renomear capa ${oldCoverPath} para ${newCoverPath}:`, err);
              }
            } else {
              console.log(`Capa já está com nome correto: ${oldCoverPath}`);
            }
            coverImageProcessed = true;
            break; // Assume only one cover image file directly in the community folder
          }
        }
        if (!coverImageProcessed) {
            const otherItems = communityDirItems.filter(item => item.name !== `${communityId}_galeria`);
            if (otherItems.length === 0 || (otherItems.length === 1 && otherItems[0].isDirectory() && otherItems[0].name === `${communityId}_galeria`)){
                 console.log(`Nenhuma imagem de capa encontrada para renomear em ${communityPath} (provavelmente não foi copiada ou já nomeada).`);
            } else if (otherItems.some(item => item.isFile())) {
                 console.warn(`AVISO: Múltiplos arquivos encontrados em ${communityPath} ou lógica de capa precisa de revisão.`);
            } else {
                 console.log(`Nenhuma imagem de capa encontrada para renomear em ${communityPath}.`);
            }
        }

        // 2. Renomear imagens da galeria
        const galleryDirName = `${communityId}_galeria`;
        const galleryPath = path.join(communityPath, galleryDirName);

        try {
          await fs.access(galleryPath); // Check if gallery directory exists
          const galleryDirItems = await fs.readdir(galleryPath, { withFileTypes: true });
          const imageFiles = galleryDirItems.filter(f => f.isFile());

          imageFiles.sort((a, b) => a.name.localeCompare(b.name));

          let galleryIndex = 1;
          for (const galleryFile of imageFiles) {
            const oldGalleryImagePath = path.join(galleryPath, galleryFile.name);
            const extension = path.extname(galleryFile.name);
            const newGalleryImageName = `${communityId}_galeria_${formatIndex(galleryIndex)}${extension}`;
            const newGalleryImagePath = path.join(galleryPath, newGalleryImageName);

            if (oldGalleryImagePath !== newGalleryImagePath) {
              try {
                await fs.rename(oldGalleryImagePath, newGalleryImagePath);
                console.log(`Imagem da galeria renomeada: ${oldGalleryImagePath} -> ${newGalleryImagePath}`);
              } catch (err) {
                console.error(`Erro ao renomear imagem da galeria ${oldGalleryImagePath} para ${newGalleryImagePath}:`, err);
              }
            } else {
              console.log(`Imagem da galeria já está com nome correto: ${oldGalleryImagePath}`);
            }
            galleryIndex++;
          }
        } catch (error) {
          if (error.code === 'ENOENT') {
            console.log(`Nenhum diretório de galeria '${galleryDirName}' encontrado para ID ${communityId}.`);
          } else {
            console.error(`Erro ao acessar/processar diretório da galeria ${galleryPath}:`, error);
          }
        }
      }
    }
    console.log('\nRenomeação de imagens migradas concluída!');
  } catch (error) {
    console.error('Ocorreu um erro geral durante a renomeação das imagens:', error);
  }
}

renameMigratedImages();
