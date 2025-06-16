import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  EventListContainer,
  EventListHeader,
  EventsGrid,
  EventCard,
  EventDate,
  EventTime,
  EventTitle,
  EventLocation,
  EventDescription,
  NoEventsMessage,
  DayHeader,
  AnimatedEventCard
} from '../styles/ProgramacaoEventList.styles';
import { useProgramacaoEvents } from '../hooks/useProgramacaoEvents';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

/**
 * Componente de lista de eventos da programação oficial
 * @param {Object} props - Propriedades do componente
 * @param {Date} props.selectedDate - Data selecionada para filtrar eventos
 * @returns {JSX.Element} - Componente renderizado
 */
const ProgramacaoEventList = ({ selectedDate }) => {
  const { t, i18n } = useTranslation();
  const { events } = useProgramacaoEvents();
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Atualizar eventos quando a data selecionada mudar
  useEffect(() => {
    if (selectedDate) {
      // Iniciar animação de saída
      setIsAnimating(true);
      
      // Aguardar a animação de saída terminar antes de atualizar os eventos
      const timer = setTimeout(() => {
        try {
          // Filtrar eventos para a data selecionada
          const filteredEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return (
              eventDate.getDate() === selectedDate.getDate() &&
              eventDate.getMonth() === selectedDate.getMonth() &&
              eventDate.getFullYear() === selectedDate.getFullYear()
            );
          });
          
          console.log(
            `Data selecionada: ${selectedDate.toLocaleDateString()}, ` +
            `Eventos encontrados: ${filteredEvents.length}`
          );
          
          setDisplayedEvents(filteredEvents);
        } catch (error) {
          console.error('Erro ao filtrar eventos:', error);
          setDisplayedEvents([]);
        } finally {
          // Iniciar animação de entrada
          setIsAnimating(false);
        }
      }, 300); // Tempo da animação de saída
      
      return () => clearTimeout(timer);
    } else {
      // Se não houver data selecionada, limpar os eventos exibidos
      setDisplayedEvents([]);
    }
  }, [selectedDate, events]);
  
  // Formatar data para exibição
  const formatDate = (date) => {
    if (!date) return '';
    
    // Definir o locale correto com base no idioma atual
    const locale = i18n.language === 'pt' ? 'pt-BR' : i18n.language === 'es' ? 'es-ES' : 'en-US';
    
    // Verificar se é hoje
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return t('programacao.eventList.today', 'Hoje') + ' - ' + 
        date.toLocaleDateString(locale, {
          day: 'numeric',
          month: 'long'
        });
    }
    
    // Verificar se é amanhã
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    ) {
      return t('programacao.eventList.tomorrow', 'Amanhã') + ' - ' + 
        date.toLocaleDateString(locale, {
          day: 'numeric',
          month: 'long'
        });
    }
    
    // Outros dias
    return date.toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };
  
  return (
    <EventListContainer>
      <EventListHeader>
        <h2>{t('programacao.eventList.title', 'Eventos Programados')}</h2>
      </EventListHeader>
      
      {selectedDate && (
        <DayHeader>{formatDate(selectedDate)}</DayHeader>
      )}
      
      {displayedEvents.length > 0 ? (
        <EventsGrid>
          {displayedEvents.map((event, eventIndex) => (
            <AnimatedEventCard 
              key={`event-${event.id}`} 
              $category={event.category}
              $isAnimating={isAnimating}
              $delay={eventIndex * 0.1} // Escalonar as animações
            >
              <EventDate>{new Date(event.date).toLocaleDateString(i18n.language === 'pt' ? 'pt-BR' : i18n.language === 'es' ? 'es-ES' : 'en-US')}</EventDate>
              <EventTitle>{event.title}</EventTitle>
              <EventTime>
                <FaClock /> {event.time}
              </EventTime>
              <EventLocation>
                <FaMapMarkerAlt /> {event.location}
              </EventLocation>
              <EventDescription>{event.description}</EventDescription>
            </AnimatedEventCard>
          ))}
        </EventsGrid>
      ) : (
        <NoEventsMessage>
          {selectedDate 
            ? t('programacao.eventList.noEventsForDate', 'Nenhum evento encontrado para esta data.') 
            : t('programacao.eventList.selectDate', 'Selecione uma data para ver os eventos.')}
        </NoEventsMessage>
      )}
    </EventListContainer>
  );
};

export default ProgramacaoEventList;
