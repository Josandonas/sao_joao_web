import fs from 'fs/promises';
import path from 'path';

const LEGACY_APP_BASE_PATH = 'c:\\Users\\jmsandonas\\Desktop\\Sao_Joao_app';
// Ajustar caminhos para serem relativos à raiz do projeto, não ao local do script
const PROJECT_ROOT = path.resolve(process.cwd(), '..', '..', '..', '..');
const TARGET_COMMUNITIES_IMAGE_PATH = path.join(PROJECT_ROOT, 'public', 'assets', 'images', 'communities');
const MAPPING_FILE_PATH = path.join(PROJECT_ROOT, 'mapeamento_imagens_legado.json');

async function migrateImages() {
  console.log('Iniciando migração de imagens...');
  console.log(`Caminho base das imagens legadas: ${LEGACY_APP_BASE_PATH}`);
  console.log(`Caminho de destino das imagens: ${TARGET_COMMUNITIES_IMAGE_PATH}`);
  console.log(`Arquivo de mapeamento: ${MAPPING_FILE_PATH}`);

  try {
    // Garante que o diretório base de destino exista
    await fs.mkdir(TARGET_COMMUNITIES_IMAGE_PATH, { recursive: true });

    const mappingDataContent = await fs.readFile(MAPPING_FILE_PATH, 'utf-8');
    const mappingData = JSON.parse(mappingDataContent);

    const communities = mappingData.detalhes_comunidades_imagens;

    for (const community of communities) {
      const communityId = community.id;
      const communityDirName = String(communityId);
      const communityTargetPath = path.join(TARGET_COMMUNITIES_IMAGE_PATH, communityDirName);

      console.log(`\nProcessando comunidade ID: ${communityId} (${community.nome_referencia})`);

      // Criar diretório para a comunidade
      await fs.mkdir(communityTargetPath, { recursive: true });
      console.log(`Diretório criado/verificado: ${communityTargetPath}`);

      // Processar imagem da capa
      if (community.imagem_capa_legado) {
        const legacyCoverImagePath = community.imagem_capa_legado;
        // O mapeamento já pode ter caminhos atualizados, então verificamos o formato legado
        if (typeof legacyCoverImagePath === 'string' && legacyCoverImagePath.startsWith('static/')) {
          const relativeCoverPath = legacyCoverImagePath.substring('static/'.length);
          const sourceCoverPath = path.join(LEGACY_APP_BASE_PATH, relativeCoverPath);
          const coverFileName = path.basename(sourceCoverPath);
          const targetCoverPath = path.join(communityTargetPath, coverFileName);

          try {
            await fs.copyFile(sourceCoverPath, targetCoverPath);
            console.log(`Capa copiada: ${sourceCoverPath} -> ${targetCoverPath}`);
          } catch (err) {
            if (err.code === 'ENOENT') {
              console.warn(`AVISO: Imagem da capa não encontrada na origem: ${sourceCoverPath}`);
            } else {
              console.error(`Erro ao copiar capa ${sourceCoverPath}:`, err);
            }
          }
        } else if (!legacyCoverImagePath.startsWith('/assets/images/communities')) {
          // Se não for o formato legado 'static/' nem o novo formato '/assets/...', logar aviso
          console.warn(`AVISO: Caminho da imagem da capa não esperado: ${legacyCoverImagePath} para comunidade ID ${communityId}. Pulando cópia.`);
        }
      }

      // Processar galeria de imagens
      if (community.galeria_imagens_legado && Array.isArray(community.galeria_imagens_legado) && community.galeria_imagens_legado.length > 0) {
        const galleryDirName = `${communityDirName}_galeria`;
        const galleryTargetPath = path.join(communityTargetPath, galleryDirName);

        await fs.mkdir(galleryTargetPath, { recursive: true });
        console.log(`Diretório da galeria criado/verificado: ${galleryTargetPath}`);

        for (const legacyGalleryImagePath of community.galeria_imagens_legado) {
          // O mapeamento já pode ter caminhos atualizados, então verificamos o formato legado
          if (typeof legacyGalleryImagePath === 'string' && legacyGalleryImagePath.startsWith('static/')) {
            const relativeGalleryPath = legacyGalleryImagePath.substring('static/'.length);
            const sourceGalleryPath = path.join(LEGACY_APP_BASE_PATH, relativeGalleryPath);
            const galleryFileName = path.basename(sourceGalleryPath);
            const targetGalleryPath = path.join(galleryTargetPath, galleryFileName);

            try {
              await fs.copyFile(sourceGalleryPath, targetGalleryPath);
              console.log(`Imagem da galeria copiada: ${sourceGalleryPath} -> ${targetGalleryPath}`);
            } catch (err) {
              if (err.code === 'ENOENT') {
                console.warn(`AVISO: Imagem da galeria não encontrada na origem: ${sourceGalleryPath}`);
              } else {
                console.error(`Erro ao copiar imagem da galeria ${sourceGalleryPath}:`, err);
              }
            }
          } else if (typeof legacyGalleryImagePath === 'string' && !legacyGalleryImagePath.startsWith('/assets/images/communities')){
             // Se não for o formato legado 'static/' nem o novo formato '/assets/...', logar aviso
            console.warn(`AVISO: Caminho da imagem da galeria não esperado: ${legacyGalleryImagePath} para comunidade ID ${communityId}. Pulando cópia.`);
          }
        }
      }
    }

    console.log('\nMigração de imagens concluída!');

  } catch (error) {
    console.error('Ocorreu um erro durante a migração das imagens:', error);
  }
}

migrateImages();
