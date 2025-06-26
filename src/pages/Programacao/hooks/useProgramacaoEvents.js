import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { programacaoService } from '../../../services';

// Removemos a flag USE_REAL_API pois o serviço padronizado já lida com fallback

/**
 * Hook personalizado para gerenciar os eventos da programação oficial
 * @returns {Object} Objeto contendo os eventos e funções para manipulá-los
 */
export const useProgramacaoEvents = () => {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [proximoEvento, setProximoEvento] = useState(null);
  const [mensagemAviso, setMensagemAviso] = useState('');
  
  // Função para buscar eventos das traduções e/ou da API
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Obter eventos legados de 2025 dos arquivos de tradução
      const eventosLegados = i18n.t('programacao.eventos2025.eventos', { returnObjects: true }) || [];
      
      // Marcar eventos legados
      const eventosLegadosComFlag = eventosLegados.map(evento => ({
        ...evento,
        isLegado: true
      }));
      
      let todosEventos = [];
      
      try {
        // Buscar eventos da API usando o serviço padronizado (que já lida com fallback)
        const { events: eventosAPI } = await programacaoService.getProgramacaoEvents(lang) || { events: [] };
        
        // Criar um mapa de IDs para evitar duplicações
        const eventosMap = new Map();
        
        // Adicionar eventos legados ao mapa
        eventosLegadosComFlag.forEach(evento => {
          const chaveUnica = `${evento.id}-${evento.title}`;
          eventosMap.set(chaveUnica, evento);
        });
        
        // Adicionar ou substituir eventos da API
        eventosAPI.forEach(evento => {
          const chaveUnica = `${evento.id}-${evento.title}`;
          eventosMap.set(chaveUnica, evento);
        });
        
        // Converter o mapa de volta para array
        todosEventos = Array.from(eventosMap.values());
      } catch (apiError) {
        console.error('Erro ao buscar eventos da API:', apiError);
        // Em caso de erro na API, usar apenas eventos legados
        todosEventos = eventosLegadosComFlag;
      }
      
      setEvents(todosEventos);
      
      // Verificar eventos próximos e definir mensagem de aviso
      verificarEventosProximos(todosEventos);
    } catch (err) {
      console.error('Erro ao buscar eventos:', err);
      setError('Erro ao carregar eventos. Tente novamente mais tarde.');
      
      // Em caso de erro, usar apenas eventos legados como fallback
      const eventosLegados = i18n.t('programacao.eventos2025.eventos', { returnObjects: true }) || [];
      const eventosLegadosComFlag = eventosLegados.map(evento => ({
        ...evento,
        isLegado: true
      }));
      
      setEvents(eventosLegadosComFlag);
      verificarEventosProximos(eventosLegadosComFlag);
    } finally {
      setLoading(false);
    }
  }, [lang, i18n, t]);
  
  // Função para verificar eventos próximos e definir mensagem de aviso
  const verificarEventosProximos = useCallback((eventosArray) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    // Filtrar eventos futuros e ordenar por data
    const eventosFuturos = eventosArray
      .filter(evento => {
        const dataEvento = new Date(evento.date);
        return dataEvento >= hoje;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Verificar se há eventos legados para hoje
    const eventosHoje = eventosArray.filter(evento => {
      const dataEvento = new Date(evento.date);
      return (
        dataEvento.getDate() === hoje.getDate() &&
        dataEvento.getMonth() === hoje.getMonth() &&
        dataEvento.getFullYear() === hoje.getFullYear()
      );
    });
    
    const temEventosLegadosHoje = eventosHoje.some(evento => evento.isLegado === true);
    
    if (eventosFuturos.length === 0 && !temEventosLegadosHoje) {
      // Não há eventos futuros nem eventos legados para hoje
      setProximoEvento(null);
      setMensagemAviso(t('programacao.avisos.semEventosProximos'));
      return;
    }
    
    // Pegar o próximo evento
    const proximoEvento = eventosFuturos[0];
    setProximoEvento(proximoEvento);
    
    // Calcular dias até o próximo evento
    const dataProximoEvento = new Date(proximoEvento.date);
    const diffTime = Math.abs(dataProximoEvento - hoje);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Definir mensagem de aviso com base nos dias até o próximo evento
    if (diffDays === 0 || temEventosLegadosHoje) {
      // Evento é hoje ou há eventos legados para hoje, não mostrar mensagem de aviso global
      setMensagemAviso('');
    } else if (diffDays === 1) {
      // Evento é amanhã
      setMensagemAviso(t('programacao.avisos.eventoFuturoSingular'));
    } else if (diffDays <= 10) {
      // Evento nos próximos 10 dias
      setMensagemAviso(t('programacao.avisos.eventoFuturo', { dias: diffDays }));
    } else {
      // Evento em mais de 10 dias, não mostrar mensagem
      setMensagemAviso('');
    }
  }, [t]);
  
  // Efeito para buscar eventos quando o idioma mudar
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  
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
  
  /**
   * Função para verificar se uma data possui eventos
   * @param {Date} date - Objeto Date para verificar
   * @returns {boolean} - True se a data possui eventos, false caso contrário
   */
  const hasEventsOnDate = (date) => {
    if (!date) return false;
    
    const dateString = date.toISOString().split('T')[0];
    return getEventsByDate(dateString).length > 0;
  };

  /**
   * Função para obter datas que possuem eventos
   * @returns {Array} - Array de objetos Date representando datas com eventos
   */
  const getDatesWithEvents = () => {
    const uniqueDates = new Set();
    
    events.forEach(event => {
      const dateString = new Date(event.date).toISOString().split('T')[0];
      uniqueDates.add(dateString);
    });
    
    return Array.from(uniqueDates).map(dateStr => new Date(dateStr));
  };

  /**
   * Função para verificar se um evento é legado
   * @param {Object} event - Objeto do evento
   * @returns {boolean} - True se o evento é legado, false caso contrário
   */
  const isLegacyEvent = (event) => {
    return event.isLegado === true;
  };

  return {
    events,
    loading,
    error,
    proximoEvento,
    mensagemAviso,
    getEventsByDate,
    getEventsByDay,
    hasEventsOnDate,
    getDatesWithEvents,
    isLegacyEvent
  };
};

export default useProgramacaoEvents;
