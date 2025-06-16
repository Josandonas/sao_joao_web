import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Container, ContentLayout, CalendarSection, EventsSection } from './styles';

// Componentes
import ProgramacaoBanner from './components/ProgramacaoBanner';
import ProgramacaoCalendar from './components/ProgramacaoCalendar';
import ProgramacaoEventList from './components/ProgramacaoEventList';
import { useProgramacaoEvents } from './hooks/useProgramacaoEvents';

/**
 * Página de Programação Oficial do Banho de São João
 */
const Programacao = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const { events, getEventsByDate } = useProgramacaoEvents();
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Função para encontrar a data de hoje ou o próximo evento
  useEffect(() => {
    if (events.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Verificar se há eventos hoje
      const todayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === today.getDate() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getFullYear() === today.getFullYear()
        );
      });
      
      if (todayEvents.length > 0) {
        // Se houver eventos hoje, selecione a data de hoje
        console.log('Eventos encontrados para hoje:', todayEvents.length);
        setSelectedDate(today);
      } else {
        // Caso contrário, encontre o próximo evento futuro
        const futureEvents = events.filter(event => new Date(event.date) >= today);
        
        if (futureEvents.length > 0) {
          // Ordenar eventos futuros cronologicamente
          futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
          
          // Selecionar a data do próximo evento
          const nextEventDate = new Date(futureEvents[0].date);
          nextEventDate.setHours(0, 0, 0, 0);
          setSelectedDate(nextEventDate);
        } else {
          // Se não houver eventos futuros, mostrar o último evento passado
          const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
          const lastEventDate = new Date(sortedEvents[0].date);
          lastEventDate.setHours(0, 0, 0, 0);
          setSelectedDate(lastEventDate);
        }
      }
    }
  }, [events]);
  
  // Handler para quando uma data é selecionada no calendário
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  return (
    <Container>
      <ProgramacaoBanner lang={lang} />
      <ContentLayout>
        <CalendarSection>
          <ProgramacaoCalendar 
            selectedDate={selectedDate} 
            onDateSelect={handleDateSelect} 
          />
        </CalendarSection>
        <EventsSection>
          <ProgramacaoEventList selectedDate={selectedDate} />
        </EventsSection>
      </ContentLayout>
    </Container>
  );
};

export default Programacao;
