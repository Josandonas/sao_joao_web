import fs from 'fs';
import path from 'path';

const legacyFilePath = 'c:\\Users\\jmsandonas\\Desktop\\Sao_Joao_app\\banho_c\\indexc5fe.html';

try {
  const htmlContent = fs.readFileSync(legacyFilePath, 'utf-8');
  
  const startIndex = htmlContent.indexOf('var comunidades = [');
  if (startIndex === -1) {
    console.error("Variável 'comunidades' não encontrada no arquivo HTML.");
    process.exit(1);
  }
  
  const arrayContentSearchStart = startIndex + 'var comunidades = '.length;
  let endIndex = -1;
  let openBrackets = 0;
  let inStringSingle = false;
  let inStringDouble = false;
  let escapeNext = false;

  for (let i = arrayContentSearchStart; i < htmlContent.length; i++) {
    const char = htmlContent[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    
    if (char === "'" && !inStringDouble) {
      inStringSingle = !inStringSingle;
    } else if (char === '"' && !inStringSingle) {
      inStringDouble = !inStringDouble;
    }

    if (!inStringSingle && !inStringDouble) {
      if (char === '[') {
        openBrackets++;
      } else if (char === ']') {
        openBrackets--;
        if (openBrackets === 0) {
          endIndex = i;
          break;
        }
      }
    }
  }

  if (endIndex === -1) {
    console.error("Não foi possível encontrar o final do array 'comunidades'. O arquivo pode estar truncado ou malformado.");
    process.exit(1);
  }

  const comunidadesArrayString = htmlContent.substring(arrayContentSearchStart, endIndex + 1);
  
  // Ajustar o caminho de saída para ser relativo à nova localização do script ou um local fixo
  // Por simplicidade, vamos manter na raiz do projeto por enquanto, mas idealmente seria configurável
  fs.writeFileSync(path.join(process.cwd(), '..', '..', '..', '..', 'comunidades_extracted_data.txt'), comunidadesArrayString, 'utf-8');
  console.log("Conteúdo do array 'comunidades' salvo em comunidades_extracted_data.txt (na raiz do projeto)");

} catch (error) {
  console.error('Erro ao ler ou processar o arquivo:', error);
  process.exit(1);
}
