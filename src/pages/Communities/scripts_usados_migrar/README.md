# Scripts para Migração e Organização de Imagens Legadas das Comunidades

Esta pasta contém scripts Node.js utilizados para migrar, renomear e atualizar os caminhos das imagens legadas associadas às comunidades do projeto São João Web.

## Propósito

O objetivo principal destes scripts é organizar as imagens de capa e galerias das comunidades, que estavam em uma estrutura de pastas antiga (`Sao_Joao_app/static/arquivo/...`), para uma nova estrutura dentro do projeto atual (`public/assets/images/communities/{ID_DA_COMUNIDADE}/`). Além disso, os nomes dos arquivos são padronizados e o arquivo de mapeamento JSON (`mapeamento_imagens_legado.json`) é atualizado para refletir essas mudanças.

## Scripts e Ordem de Execução Recomendada

É crucial executar os scripts na ordem correta para garantir a integridade dos dados e das imagens.

1.  **`extractLegacyData.mjs`**
    *   **Propósito:** Extrai o array `comunidades` do arquivo HTML legado (`indexc5fe.html` - não incluído no repositório, deve ser obtido da aplicação original) e salva os dados brutos em `comunidades_extracted_data.txt` na raiz do projeto. Este script foi usado principalmente para análise inicial e para ajudar a criar o `mapeamento_imagens_legado.json`.
    *   **Observação:** O arquivo `mapeamento_imagens_legado.json` já existe e foi refinado manualmente. A execução deste script atualmente serve mais como um registro histórico do processo de extração inicial.

2.  **`migrateImages.mjs`**
    *   **Propósito:** Copia as imagens do diretório legado (`LEGACY_APP_BASE_PATH`, configurado no script) para a nova estrutura de pastas em `public/assets/images/communities/`. Cada comunidade terá uma pasta nomeada com seu `ID`. As imagens de capa são copiadas diretamente para esta pasta, e as imagens da galeria são copiadas para uma subpasta `{ID}_galeria`.
    *   **Pré-requisitos:**
        *   O arquivo `mapeamento_imagens_legado.json` deve estar presente na raiz do projeto e conter os caminhos corretos para as `imagem_capa_legado` e `galeria_imagens_legado` no formato `static/arquivo/...`.
        *   O diretório legado especificado em `LEGACY_APP_BASE_PATH` (atualmente `c:\Users\jmsandonas\Desktop\Sao_Joao_app`) deve existir e conter as imagens.
    *   **Execução:** `node src/pages/Communities/scripts_usados_migrar_images/migrateImages.mjs` (executado da raiz do projeto).

3.  **`renameMigratedImages.mjs`**
    *   **Propósito:** Renomeia as imagens que foram copiadas pelo script `migrateImages.mjs`. As imagens de capa são renomeadas para `{ID}_capa.{extensao}` e as imagens da galeria são renomeadas sequencialmente para `{ID}_galeria_{indice}.{extensao}` (ex: `12_galeria_01.jpg`).
    *   **Pré-requisitos:** O script `migrateImages.mjs` deve ter sido executado com sucesso, e as imagens devem estar na estrutura `public/assets/images/communities/{ID}/` e `public/assets/images/communities/{ID}/{ID}_galeria/`.
    *   **Execução:** `node src/pages/Communities/scripts_usados_migrar_images/renameMigratedImages.mjs` (executado da raiz do projeto).

4.  **`updateMappingFilePaths.mjs`**
    *   **Propósito:** Atualiza os caminhos das imagens no arquivo `mapeamento_imagens_legado.json` na raiz do projeto. Os caminhos antigos (ex: `static/arquivo/...`) são substituídos pelos novos caminhos relativos à web (ex: `/assets/images/communities/{ID}/{ID}_capa.jpg`).
    *   **Pré-requisitos:** Os scripts `migrateImages.mjs` e `renameMigratedImages.mjs` devem ter sido executados com sucesso.
    *   **Execução:** `node src/pages/Communities/scripts_usados_migrar_images/updateMappingFilePaths.mjs` (executado da raiz do projeto).

## Considerações Adicionais

*   **Backup:** Antes de executar qualquer script que modifique arquivos ou o sistema de arquivos (especialmente `migrateImages.mjs`, `renameMigratedImages.mjs`, `updateMappingFilePaths.mjs`), é altamente recomendável fazer um backup do diretório `public/assets/images/communities` e do arquivo `mapeamento_imagens_legado.json`.
*   **Caminhos:** Os caminhos para o diretório legado (`LEGACY_APP_BASE_PATH`) e para os arquivos de projeto são configurados dentro de cada script. Verifique se estão corretos para o seu ambiente antes da execução.
*   **Execução:** Todos os scripts são projetados para serem executados a partir da raiz do projeto `sao_joao_web`.

Este conjunto de scripts facilita a transição das mídias legadas para a nova plataforma, mantendo a organização e a referência correta dos dados.
