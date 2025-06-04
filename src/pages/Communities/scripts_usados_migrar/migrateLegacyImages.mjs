import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to communitiesData.js relative to the script location (project root)
const communitiesDataRelativePath = './src/pages/Communities/data/communitiesData.js';
const communitiesDataJsPath = path.resolve(__dirname, communitiesDataRelativePath);

async function loadCommunitiesData() {
  try {
    // Attempt to dynamically import. Add a timestamp to bypass cache if re-running.
    const dataModule = await import(`${path.toNamespacedPath(communitiesDataJsPath)}?timestamp=${Date.now()}`);
    if (!dataModule.communitiesData || !Array.isArray(dataModule.communitiesData)) {
      console.error('Error: communitiesData export not found or not an array in the module.');
      return null;
    }
    // Return a deep copy to avoid modifying the cached module directly if imported multiple times
    return JSON.parse(JSON.stringify(dataModule.communitiesData));
  } catch (e) {
    console.error(`Error dynamically importing ${communitiesDataJsPath}:`, e);
    console.error('Please ensure the path is correct and the file exports `communitiesData` as an array.');
    console.error('Expected structure: export const communitiesData = [ ... ];');
    return null;
  }
}

async function saveCommunitiesData(data, filePath) {
  // Preserve top comments if possible, or add standard ones.
  const fileHeader = `// Dados das comunidades tradicionais do Banho de São João
// Pronto para internacionalização e expansão futura
// ATENÇÃO: Este arquivo foi modificado automaticamente pelo script migrateLegacyImages.mjs

export const communitiesData = `;
  const fileContent = `${fileHeader}${JSON.stringify(data, null, 2)};
`;
  await fs.writeFile(filePath, fileContent, 'utf-8');
}

function sanitizeFilename(name) {
  if (!name) return 'unknown_image';
  return name
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/[^a-z0-9_.-]/g, '') // Remove non-alphanumeric (keep underscore, dot, hyphen)
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .replace(/^_+|_+$/g, ''); // Trim leading/trailing underscores
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('--- Script de Migração de Imagens Legado ---');
  const legacyBaseDir = await rl.question('Por favor, insira o CAMINHO ABSOLUTO para a pasta principal contendo as subpastas das comunidades (ex: C:\Users\seu_usuario\Desktop\imagens_legado_sao_joao):\n');

  if (!legacyBaseDir) {
    console.error('Nenhum caminho fornecido. Saindo.');
    rl.close();
    return;
  }

  try {
    await fs.access(legacyBaseDir);
  } catch (error) {
    console.error(`Erro: Não foi possível acessar o diretório legado: ${legacyBaseDir}`);
    console.error('Verifique se o caminho está correto e se você tem permissão para acessá-lo.');
    rl.close();
    return;
  }

  const projectRoot = __dirname; // Assumes script is in project root
  const targetImagesDir = path.join(projectRoot, 'public', 'assets', 'images', 'communities');
  const backupCommunitiesDataJsPath = `${communitiesDataJsPath}.bak`;

  try {
    await fs.mkdir(targetImagesDir, { recursive: true });
    console.log(`Diretório de destino das imagens: ${targetImagesDir}`);

    await fs.copyFile(communitiesDataJsPath, backupCommunitiesDataJsPath);
    console.log(`Backup de ${communitiesDataJsPath} criado em ${backupCommunitiesDataJsPath}`);
  } catch (error) {
    console.error('Erro ao preparar diretórios ou criar backup:', error);
    rl.close();
    return;
  }

  let communities = await loadCommunitiesData();
  if (!communities) {
    console.error('Não foi possível carregar os dados das comunidades. Verifique os erros acima. Saindo.');
    rl.close();
    return;
  }

  let changesMadeToData = false;

  try {
    const communityFolders = await fs.readdir(legacyBaseDir, { withFileTypes: true });

    for (const dirent of communityFolders) {
      if (dirent.isDirectory()) {
        const communityNameFromFolder = dirent.name;
        const communityFolderPath = path.join(legacyBaseDir, communityNameFromFolder);

        const communityEntry = communities.find(c => c.name && c.name.pt === communityNameFromFolder);

        if (communityEntry) {
          console.log(`\nProcessando comunidade: ${communityNameFromFolder}`);
          const imageFiles = (await fs.readdir(communityFolderPath)).filter(f =>
            ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(path.extname(f).toLowerCase())
          );
          imageFiles.sort(); // Sort alphabetically for consistent ordering

          if (imageFiles.length === 0) {
            console.log('  Nenhuma imagem encontrada nesta pasta.');
            continue;
          }

          const newGalleryPaths = [];
          let imageCounter = 0;

          for (const imageFile of imageFiles) {
            imageCounter++;
            const originalExtension = path.extname(imageFile);
            const baseSanitizedName = sanitizeFilename(communityNameFromFolder);
            
            // Use _1, _2, etc. for subsequent images. The first image doesn't get a number suffix.
            const newImageName = imageCounter === 1 
              ? `${baseSanitizedName}${originalExtension}` 
              : `${baseSanitizedName}_${imageCounter}${originalExtension}`;
            
            const sourceFilePath = path.join(communityFolderPath, imageFile);
            const targetFilePath = path.join(targetImagesDir, newImageName);

            try {
              await fs.copyFile(sourceFilePath, targetFilePath);
              console.log(`  Copiada: ${imageFile} -> ${newImageName}`);
              newGalleryPaths.push(`/assets/images/communities/${newImageName}`);
            } catch (copyError) {
              console.error(`  ERRO ao copiar ${imageFile} para ${targetFilePath}:`, copyError);
            }
          }

          if (newGalleryPaths.length > 0) {
            communityEntry.image = newGalleryPaths[0]; // First image as main
            communityEntry.gallery = newGalleryPaths;
            changesMadeToData = true;
            console.log(`  Dados de ${communityNameFromFolder} atualizados no communitiesData.`);
          } else {
            console.log(`  Nenhuma imagem copiada com sucesso para ${communityNameFromFolder}. Dados não atualizados.`);
          }
        } else {
          console.warn(`\nAviso: Pasta de comunidade '${communityNameFromFolder}' encontrada no diretório legado, mas nenhuma entrada correspondente (name.pt) em communitiesData.js.`);
        }
      }
    }

    if (changesMadeToData) {
      await saveCommunitiesData(communities, communitiesDataJsPath);
      console.log('\nDados de communitiesData.js atualizados com sucesso!');
    } else {
      console.log('\nNenhuma alteração foi feita nos dados de communitiesData.js.');
    }

  } catch (error) {
    console.error('\nErro durante o processamento das pastas de comunidade:', error);
  } finally {
    rl.close();
    console.log('\n--- Script finalizado ---');
  }
}

main().catch(err => {
  console.error('Erro fatal no script:', err);
  process.exit(1);
});
