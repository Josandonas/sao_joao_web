import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getProgramacaoEvents } from '../../../services/api';
import { mockProgramacaoEvents } from '../../../services/mockApi';

// Flag para controlar se deve usar a API real ou o mock
const USE_MOCK_API = true; // Altere para false quando a API real estiver disponível

/**
 * Hook personalizado para gerenciar os eventos da programação oficial
 * @returns {Object} Objeto contendo os eventos e funções para manipulá-los
 */
export const useProgramacaoEvents = () => {
  const { lang } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Função para buscar eventos da API ou do mock
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let data;
      
      if (USE_MOCK_API) {
        const response = await mockProgramacaoEvents(lang);
        data = response.events;
      } else {
        data = await getProgramacaoEvents(lang);
      }
      
      setEvents(data);
    } catch (err) {
      console.error('Erro ao buscar eventos:', err);
      setError('Erro ao carregar eventos. Tente novamente mais tarde.');
      // Em caso de erro, usar eventos mockados como fallback
      setEvents(getMockEvents());
    } finally {
      setLoading(false);
    }
  }, [lang]);
  
  // Efeito para buscar eventos quando o idioma mudar
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  
  // Função para obter eventos mockados como fallback
  const getMockEvents = () => {
    const currentLang = lang || 'pt'; // Usar o idioma atual ou pt como padrão
    // Eventos em português (padrão)
    const ptEvents = [
      {
        id: 1,
        title: 'Tríduo de São João',
        date: '2025-06-20T17:00:00',
        time: '17:00',
        location: 'Capela de São João Batista, Ladeira Cunha e Cruz',
        description: 'Celebração religiosa do Tríduo de São João Batista.',
        category: 'religious'
      },
      {
        id: 2,
        title: 'Tríduo de São João',
        date: '2025-06-21T17:00:00',
        time: '17:00',
        location: 'Capela de São João Batista, Ladeira Cunha e Cruz',
        description: 'Segundo dia da celebração religiosa do Tríduo de São João Batista.',
        category: 'religious'
      },
      {
        id: 3,
        title: 'Tríduo de São João',
        date: '2025-06-22T17:00:00',
        time: '17:00',
        location: 'Capela de São João Batista, Ladeira Cunha e Cruz',
        description: 'Terceiro dia da celebração religiosa do Tríduo de São João Batista.',
        category: 'religious'
      },
      {
        id: 4,
        title: 'Abertura da praça de alimentação e estande de artesanato',
        date: '2025-06-20T18:00:00',
        time: '18:00',
        location: 'Porto Geral',
        description: 'Abertura da praça de alimentação e do estande de artesanato, shows locais e Concurso de Andores.',
        category: 'cultural'
      },
      {
        id: 5,
        title: 'Show Regional: Victor Gregório e Marco Aurélio',
        date: '2025-06-20T22:30:00',
        time: '22:30',
        location: 'Porto Geral',
        description: 'Apresentação da dupla Victor Gregório e Marco Aurélio.',
        category: 'show'
      },
      {
        id: 6,
        title: 'Concurso de Quadrilhas Infantis',
        date: '2025-06-21T19:00:00',
        time: '19:00',
        location: 'Porto Geral',
        description: 'Concurso de Quadrilhas Infantis, apresentação do Coral Infantil Bem te Vi, além de shows locais.',
        category: 'cultural'
      },
      {
        id: 7,
        title: 'Show Nacional: Bruninho e Davi',
        date: '2025-06-22T01:00:00',
        time: '01:00',
        location: 'Porto Geral',
        description: 'Apresentação da dupla Bruninho e Davi.',
        category: 'show'
      },
      {
        id: 8,
        title: 'Concurso de Quadrilhas Juninas',
        date: '2025-06-22T19:00:00',
        time: '19:00',
        location: 'Porto Geral',
        description: 'Concurso de Quadrilhas Juninas com grupos locais.',
        category: 'cultural'
      },
      {
        id: 9,
        title: 'Show Regional: Loubet',
        date: '2025-06-22T22:30:00',
        time: '22:30',
        location: 'Porto Geral',
        description: 'Apresentação do cantor Loubet.',
        category: 'show'
      },
      {
        id: 10,
        title: 'Visitação dos fiéis na Capela de São João Batista',
        date: '2025-06-23T08:00:00',
        time: '08:00',
        location: 'Capela de São João Batista, Ladeira Cunha e Cruz',
        description: 'Visitação dos fiéis na Capela de São João Batista.',
        category: 'religious'
      },
      {
        id: 11,
        title: 'Concentração do andor da Prefeitura e Missa Solene',
        date: '2025-06-23T20:00:00',
        time: '20:00',
        location: 'Capela de São João Batista',
        description: 'Concentração do andor da Prefeitura e a Missa Solene em louvor a São João Batista.',
        category: 'religious'
      },
      {
        id: 12,
        title: 'Elevação do mastro de São João',
        date: '2025-06-23T23:30:00',
        time: '23:30',
        location: 'Porto Geral',
        description: 'Elevação do mastro de São João e a tradicional roda de Cururu e Siriri.',
        category: 'religious'
      },
      {
        id: 13,
        title: 'Show Nacional: Michel Teló',
        date: '2025-06-24T00:30:00',
        time: '00:30',
        location: 'Porto Geral',
        description: 'Apresentação do cantor Michel Teló.',
        category: 'show'
      }
    ];
    
    // Eventos em inglês
    const enEvents = [
      {
        id: 1,
        title: 'Saint John\'s Triduum',
        date: '2025-06-20T17:00:00',
        time: '5:00 PM',
        location: 'Saint John the Baptist Chapel, Ladeira Cunha e Cruz',
        description: 'Religious celebration of Saint John the Baptist Triduum.',
        category: 'religious'
      },
      {
        id: 2,
        title: 'Saint John\'s Triduum',
        date: '2025-06-21T17:00:00',
        time: '5:00 PM',
        location: 'Saint John the Baptist Chapel, Ladeira Cunha e Cruz',
        description: 'Second day of the religious celebration of Saint John the Baptist Triduum.',
        category: 'religious'
      },
      {
        id: 3,
        title: 'Saint John\'s Triduum',
        date: '2025-06-22T17:00:00',
        time: '5:00 PM',
        location: 'Saint John the Baptist Chapel, Ladeira Cunha e Cruz',
        description: 'Third day of the religious celebration of Saint John the Baptist Triduum.',
        category: 'religious'
      },
      {
        id: 4,
        title: 'Opening of the food court and craft stand',
        date: '2025-06-20T18:00:00',
        time: '6:00 PM',
        location: 'Porto Geral',
        description: 'Opening of the food court and craft stand, local shows and Shrine Contest.',
        category: 'cultural'
      },
      {
        id: 5,
        title: 'Regional Show: Victor Gregório and Marco Aurélio',
        date: '2025-06-20T22:30:00',
        time: '10:30 PM',
        location: 'Porto Geral',
        description: 'Performance by the duo Victor Gregório and Marco Aurélio.',
        category: 'show'
      },
      {
        id: 6,
        title: 'Children\'s Square Dance Contest',
        date: '2025-06-21T19:00:00',
        time: '7:00 PM',
        location: 'Porto Geral',
        description: 'Children\'s Square Dance Contest, presentation of the Bem te Vi Children\'s Choir, and local shows.',
        category: 'cultural'
      },
      {
        id: 7,
        title: 'National Show: Bruninho and Davi',
        date: '2025-06-22T01:00:00',
        time: '1:00 AM',
        location: 'Porto Geral',
        description: 'Performance by the duo Bruninho and Davi.',
        category: 'show'
      },
      {
        id: 8,
        title: 'Square Dance Contest',
        date: '2025-06-22T19:00:00',
        time: '7:00 PM',
        location: 'Porto Geral',
        description: 'Square Dance Contest with local groups.',
        category: 'cultural'
      },
      {
        id: 9,
        title: 'Regional Show: Loubet',
        date: '2025-06-22T22:30:00',
        time: '10:30 PM',
        location: 'Porto Geral',
        description: 'Performance by singer Loubet.',
        category: 'show'
      },
      {
        id: 10,
        title: 'Visitation of the faithful to Saint John the Baptist Chapel',
        date: '2025-06-23T08:00:00',
        time: '8:00 AM',
        location: 'Saint John the Baptist Chapel, Ladeira Cunha e Cruz',
        description: 'Visitation of the faithful to Saint John the Baptist Chapel.',
        category: 'religious'
      },
      {
        id: 11,
        title: 'Concentration of the City Hall shrine and Solemn Mass',
        date: '2025-06-23T20:00:00',
        time: '8:00 PM',
        location: 'Saint John the Baptist Chapel',
        description: 'Concentration of the City Hall shrine and the Solemn Mass in honor of Saint John the Baptist.',
        category: 'religious'
      },
      {
        id: 12,
        title: 'Raising of Saint John\'s pole',
        date: '2025-06-23T23:30:00',
        time: '11:30 PM',
        location: 'Porto Geral',
        description: 'Raising of Saint John\'s pole and the traditional Cururu and Siriri circle.',
        category: 'religious'
      },
      {
        id: 13,
        title: 'National Show: Michel Teló',
        date: '2025-06-24T00:30:00',
        time: '12:30 AM',
        location: 'Porto Geral',
        description: 'Performance by singer Michel Teló.',
        category: 'show'
      }
    ];
    
    // Eventos em espanhol
    const esEvents = [
      {
        id: 1,
        title: 'Triduo de San Juan',
        date: '2025-06-20T17:00:00',
        time: '17:00',
        location: 'Capilla de San Juan Bautista, Ladeira Cunha e Cruz',
        description: 'Celebración religiosa del Triduo de San Juan Bautista.',
        category: 'religious'
      },
      {
        id: 2,
        title: 'Triduo de San Juan',
        date: '2025-06-21T17:00:00',
        time: '17:00',
        location: 'Capilla de San Juan Bautista, Ladeira Cunha e Cruz',
        description: 'Segundo día de la celebración religiosa del Triduo de San Juan Bautista.',
        category: 'religious'
      },
      {
        id: 3,
        title: 'Triduo de San Juan',
        date: '2025-06-22T17:00:00',
        time: '17:00',
        location: 'Capilla de San Juan Bautista, Ladeira Cunha e Cruz',
        description: 'Tercer día de la celebración religiosa del Triduo de San Juan Bautista.',
        category: 'religious'
      },
      {
        id: 4,
        title: 'Apertura de la plaza de alimentación y puesto de artesanía',
        date: '2025-06-20T18:00:00',
        time: '18:00',
        location: 'Porto Geral',
        description: 'Apertura de la plaza de alimentación y del puesto de artesanía, shows locales y Concurso de Andores.',
        category: 'cultural'
      },
      {
        id: 5,
        title: 'Show Regional: Victor Gregório y Marco Aurélio',
        date: '2025-06-20T22:30:00',
        time: '22:30',
        location: 'Porto Geral',
        description: 'Presentación del dúo Victor Gregório y Marco Aurélio.',
        category: 'show'
      },
      {
        id: 6,
        title: 'Concurso de Cuadrillas Infantiles',
        date: '2025-06-21T19:00:00',
        time: '19:00',
        location: 'Porto Geral',
        description: 'Concurso de Cuadrillas Infantiles, presentación del Coro Infantil Bem te Vi, además de shows locales.',
        category: 'cultural'
      },
      {
        id: 7,
        title: 'Show Nacional: Bruninho y Davi',
        date: '2025-06-22T01:00:00',
        time: '01:00',
        location: 'Porto Geral',
        description: 'Presentación del dúo Bruninho y Davi.',
        category: 'show'
      },
      {
        id: 8,
        title: 'Concurso de Cuadrillas Juninas',
        date: '2025-06-22T19:00:00',
        time: '19:00',
        location: 'Porto Geral',
        description: 'Concurso de Cuadrillas Juninas con grupos locales.',
        category: 'cultural'
      },
      {
        id: 9,
        title: 'Show Regional: Loubet',
        date: '2025-06-22T22:30:00',
        time: '22:30',
        location: 'Porto Geral',
        description: 'Presentación del cantante Loubet.',
        category: 'show'
      },
      {
        id: 10,
        title: 'Visitación de los fieles a la Capilla de San Juan Bautista',
        date: '2025-06-23T08:00:00',
        time: '08:00',
        location: 'Capilla de San Juan Bautista, Ladeira Cunha e Cruz',
        description: 'Visitación de los fieles a la Capilla de San Juan Bautista.',
        category: 'religious'
      },
      {
        id: 11,
        title: 'Concentración del andor del Ayuntamiento y Misa Solemne',
        date: '2025-06-23T20:00:00',
        time: '20:00',
        location: 'Capilla de San Juan Bautista',
        description: 'Concentración del andor del Ayuntamiento y la Misa Solemne en honor a San Juan Bautista.',
        category: 'religious'
      },
      {
        id: 12,
        title: 'Elevación del mástil de San Juan',
        date: '2025-06-23T23:30:00',
        time: '23:30',
        location: 'Porto Geral',
        description: 'Elevación del mástil de San Juan y la tradicional rueda de Cururu y Siriri.',
        category: 'religious'
      },
      {
        id: 13,
        title: 'Show Nacional: Michel Teló',
        date: '2025-06-24T00:30:00',
        time: '00:30',
        location: 'Porto Geral',
        description: 'Presentación del cantante Michel Teló.',
        category: 'show'
      }
    ];
    
    // Retorna os eventos de acordo com o idioma
    switch(currentLang) {
      case 'en': return enEvents;
      case 'es': return esEvents;
      case 'pt':
      default: return ptEvents;
    }
  };
  
  // Nota: Este efeito foi substituído pelo fetchEvents acima
  
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
