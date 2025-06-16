import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Hook personalizado para gerenciar os eventos da programação oficial
 * @returns {Object} Objeto contendo os eventos e funções para manipulá-los
 */
export const useProgramacaoEvents = () => {
  const { lang } = useParams();
  const [events, setEvents] = useState([]);
  
  // Dados mockados para eventos da programação
  // Em uma implementação real, esses dados viriam de uma API ou arquivo de dados
  const mockEvents = useMemo(() => {
    // Eventos em português (padrão)
    const ptEvents = [
      {
        id: 1,
        title: 'Abertura Oficial do Banho de São João',
        date: '2025-06-22T18:00:00',
        time: '18:00',
        location: 'Porto Geral',
        description: 'Cerimônia de abertura oficial com apresentação das autoridades e bênção das bandeiras.',
        category: 'religious'
      },
      {
        id: 2,
        title: 'Show de Viola - Raízes Pantaneiras',
        date: '2025-06-22T20:00:00',
        time: '20:00',
        location: 'Palco Principal - Porto Geral',
        description: 'Apresentação de músicas tradicionais pantaneiras com artistas locais.',
        category: 'show'
      },
      {
        id: 3,
        title: 'Procissão Fluvial',
        date: '2025-06-23T16:00:00',
        time: '16:00',
        location: 'Rio Paraguai - Porto Geral',
        description: 'Tradicional procissão fluvial com a imagem de São João Batista pelos rios da região.',
        category: 'religious'
      },
      {
        id: 4,
        title: 'Festival Gastronômico - Sabores do Pantanal',
        date: '2025-06-23T18:00:00',
        time: '18:00 - 22:00',
        location: 'Praça de Alimentação - Porto Geral',
        description: 'Degustação de pratos típicos da culinária pantaneira com chefs locais.',
        category: 'gastronomy'
      },
      {
        id: 5,
        title: 'Banho de São João Coletivo',
        date: '2025-06-23T23:30:00',
        time: '23:30',
        location: 'Praia do Porto Geral',
        description: 'Momento principal da festa com o banho coletivo da imagem de São João nas águas do rio Paraguai.',
        category: 'religious'
      },
      {
        id: 6,
        title: 'Show Pirotécnico',
        date: '2025-06-24T00:00:00',
        time: '00:00',
        location: 'Porto Geral',
        description: 'Espetáculo de fogos de artifício celebrando o dia de São João.',
        category: 'cultural'
      },
      {
        id: 7,
        title: 'Apresentação de Danças Folclóricas',
        date: '2025-06-24T16:00:00',
        time: '16:00',
        location: 'Palco Cultural - Porto Geral',
        description: 'Grupos de dança apresentam coreografias tradicionais da cultura pantaneira.',
        category: 'cultural'
      },
      {
        id: 8,
        title: 'Show de Encerramento',
        date: '2025-06-24T21:00:00',
        time: '21:00',
        location: 'Palco Principal - Porto Geral',
        description: 'Grande show de encerramento com artistas nacionais.',
        category: 'show'
      }
    ];
    
    // Eventos em inglês
    const enEvents = [
      {
        id: 1,
        title: 'Official Opening of Saint John\'s Bath Festival',
        date: '2025-06-22T18:00:00',
        time: '6:00 PM',
        location: 'Porto Geral',
        description: 'Official opening ceremony with presentation of authorities and blessing of flags.',
        category: 'religious'
      },
      {
        id: 2,
        title: 'Viola Show - Pantanal Roots',
        date: '2025-06-22T20:00:00',
        time: '8:00 PM',
        location: 'Main Stage - Porto Geral',
        description: 'Presentation of traditional Pantanal music with local artists.',
        category: 'show'
      },
      {
        id: 3,
        title: 'River Procession',
        date: '2025-06-23T16:00:00',
        time: '4:00 PM',
        location: 'Paraguay River - Porto Geral',
        description: 'Traditional river procession with the image of Saint John the Baptist through the region\'s rivers.',
        category: 'religious'
      },
      {
        id: 4,
        title: 'Gastronomic Festival - Flavors of Pantanal',
        date: '2025-06-23T18:00:00',
        time: '6:00 PM - 10:00 PM',
        location: 'Food Court - Porto Geral',
        description: 'Tasting of typical dishes from Pantanal cuisine with local chefs.',
        category: 'gastronomy'
      },
      {
        id: 5,
        title: 'Collective Saint John\'s Bath',
        date: '2025-06-23T23:30:00',
        time: '11:30 PM',
        location: 'Porto Geral Beach',
        description: 'Main moment of the festival with the collective bathing of Saint John\'s image in the waters of the Paraguay River.',
        category: 'religious'
      },
      {
        id: 6,
        title: 'Fireworks Show',
        date: '2025-06-24T00:00:00',
        time: '12:00 AM',
        location: 'Porto Geral',
        description: 'Fireworks spectacle celebrating Saint John\'s Day.',
        category: 'cultural'
      },
      {
        id: 7,
        title: 'Folk Dance Performance',
        date: '2025-06-24T16:00:00',
        time: '4:00 PM',
        location: 'Cultural Stage - Porto Geral',
        description: 'Dance groups present traditional choreographies from Pantanal culture.',
        category: 'cultural'
      },
      {
        id: 8,
        title: 'Closing Show',
        date: '2025-06-24T21:00:00',
        time: '9:00 PM',
        location: 'Main Stage - Porto Geral',
        description: 'Grand closing show with national artists.',
        category: 'show'
      }
    ];
    
    // Eventos em espanhol
    const esEvents = [
      {
        id: 1,
        title: 'Apertura Oficial del Baño de San Juan',
        date: '2025-06-22T18:00:00',
        time: '18:00',
        location: 'Porto Geral',
        description: 'Ceremonia de apertura oficial con presentación de autoridades y bendición de banderas.',
        category: 'religious'
      },
      {
        id: 2,
        title: 'Show de Viola - Raíces del Pantanal',
        date: '2025-06-22T20:00:00',
        time: '20:00',
        location: 'Escenario Principal - Porto Geral',
        description: 'Presentación de músicas tradicionales del Pantanal con artistas locales.',
        category: 'show'
      },
      {
        id: 3,
        title: 'Procesión Fluvial',
        date: '2025-06-23T16:00:00',
        time: '16:00',
        location: 'Río Paraguay - Porto Geral',
        description: 'Tradicional procesión fluvial con la imagen de San Juan Bautista por los ríos de la región.',
        category: 'religious'
      },
      {
        id: 4,
        title: 'Festival Gastronómico - Sabores del Pantanal',
        date: '2025-06-23T18:00:00',
        time: '18:00 - 22:00',
        location: 'Plaza de Alimentación - Porto Geral',
        description: 'Degustación de platos típicos de la culinaria del Pantanal con chefs locales.',
        category: 'gastronomy'
      },
      {
        id: 5,
        title: 'Baño Colectivo de San Juan',
        date: '2025-06-23T23:30:00',
        time: '23:30',
        location: 'Playa del Porto Geral',
        description: 'Momento principal de la fiesta con el baño colectivo de la imagen de San Juan en las aguas del río Paraguay.',
        category: 'religious'
      },
      {
        id: 6,
        title: 'Show de Fuegos Artificiales',
        date: '2025-06-24T00:00:00',
        time: '00:00',
        location: 'Porto Geral',
        description: 'Espectáculo de fuegos artificiales celebrando el día de San Juan.',
        category: 'cultural'
      },
      {
        id: 7,
        title: 'Presentación de Danzas Folclóricas',
        date: '2025-06-24T16:00:00',
        time: '16:00',
        location: 'Escenario Cultural - Porto Geral',
        description: 'Grupos de danza presentan coreografías tradicionales de la cultura del Pantanal.',
        category: 'cultural'
      },
      {
        id: 8,
        title: 'Show de Clausura',
        date: '2025-06-24T21:00:00',
        time: '21:00',
        location: 'Escenario Principal - Porto Geral',
        description: 'Gran show de clausura con artistas nacionales.',
        category: 'show'
      }
    ];
    
    // Retorna os eventos de acordo com o idioma
    switch(lang) {
      case 'en': return enEvents;
      case 'es': return esEvents;
      case 'pt':
      default: return ptEvents;
    }
  }, [lang]);
  
  // Carrega os eventos mockados quando o componente é montado ou o idioma muda
  useEffect(() => {
    setEvents(mockEvents);
  }, [mockEvents]);
  
  /**
   * Função para obter eventos por data específica
   * @param {string} dateString - Data no formato YYYY-MM-DD
   * @returns {Array} - Array de eventos para a data especificada
   */
  const getEventsByDate = (dateString) => {
    if (!dateString) return [];
    
    // Garantir que estamos comparando apenas a parte da data (YYYY-MM-DD)
    return events.filter(event => {
      const eventDateString = new Date(event.date).toISOString().split('T')[0];
      return eventDateString === dateString;
    });
  };
  
  /**
   * Função para obter eventos por dia específico
   * @param {number} day - Dia do mês
   * @returns {Array} - Array de eventos para o dia especificado
   */
  const getEventsByDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day;
    });
  };
  
  return {
    events,
    getEventsByDate,
    getEventsByDay
  };
};

export default useProgramacaoEvents;
