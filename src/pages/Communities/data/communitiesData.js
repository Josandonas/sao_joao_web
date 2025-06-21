// Importando os dados das comunidades do arquivo JSON
import mapeamentoLegado from './mapeamento_legado.json';

// Transformando os dados do formato legado para o formato esperado pelo componente Communities
export const communitiesData = mapeamentoLegado.detalhes_comunidades_imagens.map(community => {
  const galeria = community.galeria_imagens_legado;
  return {
    // Dados básicos
    id: community.id,
    // Mapeando imagem de capa
    image: PUBLIC_URL + community.imagem_capa_legado,
    // Mapeando a galeria de imagens para o uso com o pacote de galeria
    gallery: galeria,
    // Mapeando as coordenadas para o mapa
    coordinates: community.coordinates || null,
    
    // Dados multilíngues
    name: community.name || {
      pt: community.nome_referencia || '',
      en: community.nome_referencia || '',
      es: community.nome_referencia || ''
    },
    location: community.location || {
      pt: community.bairro || '',
      en: community.bairro || '',
      es: community.bairro || ''
    },
    description: community.description || {
      pt: '',
      en: '',
      es: ''
    },
    fullDescription: community.fullDescription || {
      pt: '',
      en: '',
      es: ''
    },
    traditions: community.traditions || {
      pt: '',
      en: '',
      es: ''
    },
    festival_date: community.festival_date || {
      pt: '',
      en: '',
      es: ''
    },
    
    // Dados adicionais que podem ser úteis
    religion: community.religion || {
      pt: '',
      en: '',
      es: ''
    },
    startYear: community.startYear || '',
    currentCelebrant: community.currentCelebrant || {
      pt: '',
      en: '',
      es: ''
    },
    motivation: community.motivation || {
      pt: '',
      en: '',
      es: ''
    },
    grace: community.grace || {
      pt: '',
      en: '',
      es: ''
    }
  };
});

export default communitiesData;
