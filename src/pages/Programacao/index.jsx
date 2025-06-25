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
      // Obter a data atual real
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      console.log('Data atual (hoje):', today.toDateString());
      
      // Verificar se há eventos hoje
      const todayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === today.getDate() &&
          eventDate.getMonth() === today.getMonth() &&
          eventDate.getFullYear() === today.getFullYear()
        );
      });
      
      // Sempre selecionar a data de hoje primeiro, independentemente de haver eventos
      setSelectedDate(today);
      console.log('Data selecionada inicialmente:', today.toDateString());
      
      // Se não houver eventos hoje, podemos mostrar uma mensagem, mas mantemos a data atual selecionada
      if (todayEvents.length === 0) {
        console.log('Não há eventos para hoje');
        
        // Opcionalmente, podemos buscar o próximo evento futuro para exibir informações adicionais
        const futureEvents = events.filter(event => new Date(event.date) > today);
        
        if (futureEvents.length > 0) {
          // Ordenar eventos futuros cronologicamente
          futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
          console.log('Próximo evento será em:', new Date(futureEvents[0].date).toDateString());
        } else {
          console.log('Não há eventos futuros programados');
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
