import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CalendarContainer, 
  CalendarHeader,
  MonthTitle,
  CalendarGrid,
  DayCell,
  NavigationButton,
  DayNumber,
  EventIndicator
} from '../styles/ProgramacaoCalendar.styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useProgramacaoEvents } from '../hooks/useProgramacaoEvents';

/**
 * Componente de calendário para visualização dos eventos da programação
 * @param {Object} props - Propriedades do componente
 * @param {Date} props.selectedDate - Data selecionada
 * @param {Function} props.onDateSelect - Função chamada quando uma data é selecionada
 * @returns {JSX.Element} - Componente renderizado
 */
const ProgramacaoCalendar = ({ selectedDate, onDateSelect }) => {
  const { t } = useTranslation();
  const { events, getEventsByDate } = useProgramacaoEvents();
  
  // Estado para controlar o mês e ano exibidos
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // Junho de 2025
  
  // Atualizar o mês exibido quando a data selecionada mudar
  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    }
  }, [selectedDate]);
  
  // Função para avançar para o próximo mês
  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  
  // Função para voltar para o mês anterior
  const prevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  // Função para obter o nome do mês
  const getMonthName = (date) => {
    const month = date.getMonth();
    const monthNames = {
      0: t('programacao.calendar.january', 'Janeiro'),
      1: t('programacao.calendar.february', 'Fevereiro'),
      2: t('programacao.calendar.march', 'Março'),
      3: t('programacao.calendar.april', 'Abril'),
      4: t('programacao.calendar.may', 'Maio'),
      5: t('programacao.calendar.june', 'Junho'),
      6: t('programacao.calendar.july', 'Julho'),
      7: t('programacao.calendar.august', 'Agosto'),
      8: t('programacao.calendar.september', 'Setembro'),
      9: t('programacao.calendar.october', 'Outubro'),
      10: t('programacao.calendar.november', 'Novembro'),
      11: t('programacao.calendar.december', 'Dezembro')
    };
    return monthNames[month];
  };
  
  // Função para lidar com clique em um dia
  const handleDayClick = (dayInfo) => {
    if (dayInfo) {
      // Verificar novamente se o dia tem eventos
      const dateString = dayInfo.date.toISOString().split('T')[0];
      const dayEvents = getEventsByDate(dateString);
      
      if (dayEvents && dayEvents.length > 0) {
        console.log(`Selecionando data ${dateString} com ${dayEvents.length} eventos`);
        onDateSelect(dayInfo.date);
      } else {
        console.log(`Dia ${dateString} não possui eventos`);
      }
    }
  };
  
  // Função para verificar se uma data está selecionada
  const isDateSelected = (date) => {
    if (!selectedDate || !date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };
  
  // Função para gerar os dias do mês atual
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1);
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0);
    
    // Dia da semana do primeiro dia (0 = Domingo, 1 = Segunda, etc)
    const firstDayOfWeek = firstDay.getDay();
    
    // Total de dias no mês
    const daysInMonth = lastDay.getDate();
    
    // Array para armazenar os dias
    const days = [];
    
    // Adicionar dias vazios para alinhar com o dia da semana correto
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Pré-processar todos os eventos do mês para melhor performance
    const eventsByDay = {};
    events.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate.getMonth() === month && eventDate.getFullYear() === year) {
        const day = eventDate.getDate();
        if (!eventsByDay[day]) eventsByDay[day] = [];
        eventsByDay[day].push(event);
      }
    });
    
    // Adicionar os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = eventsByDay[day] || [];
      
      days.push({
        day,
        date,
        hasEvents: dayEvents.length > 0,
        events: dayEvents
      });
    }
    
    return days;
  };
  
  // Dias da semana
  const weekDays = [
    t('programacao.calendar.sunday', 'Dom'),
    t('programacao.calendar.monday', 'Seg'),
    t('programacao.calendar.tuesday', 'Ter'),
    t('programacao.calendar.wednesday', 'Qua'),
    t('programacao.calendar.thursday', 'Qui'),
    t('programacao.calendar.friday', 'Sex'),
    t('programacao.calendar.saturday', 'Sáb')
  ];
  
  // Renderizar os dias da semana
  const renderWeekDays = () => {
    const weekDays = [
      t('programacao.calendar.sunday', 'Dom'),
      t('programacao.calendar.monday', 'Seg'),
      t('programacao.calendar.tuesday', 'Ter'),
      t('programacao.calendar.wednesday', 'Qua'),
      t('programacao.calendar.thursday', 'Qui'),
      t('programacao.calendar.friday', 'Sex'),
      t('programacao.calendar.saturday', 'Sáb')
    ];
    
    return weekDays.map((day, index) => (
      <DayCell key={`weekday-${index}`} $isHeader>
        {day}
      </DayCell>
    ));
  };
  
  // Gerar os dias do calendário
  const calendarDays = generateCalendarDays();
  
  // Verificar se o mês atual é junho de 2025 (mês da festa)
  const isJune2025 = currentDate.getMonth() === 5 && currentDate.getFullYear() === 2025;
  
  // Atualizar o idioma quando ele mudar
  useEffect(() => {
    // Forçar uma re-renderização quando o idioma mudar
    setCurrentDate(new Date(currentDate));
  }, [t]);

  return (
    <CalendarContainer>
      <h2>{t('programacao.calendar.title', 'Calendário de Eventos')}</h2>
      <CalendarHeader>
        <NavigationButton onClick={prevMonth}>
          <FaChevronLeft />
        </NavigationButton>
        <MonthTitle>
          {getMonthName(currentDate)} {currentDate.getFullYear()}
        </MonthTitle>
        <NavigationButton onClick={nextMonth}>
          <FaChevronRight />
        </NavigationButton>
      </CalendarHeader>
      
      <CalendarGrid>
        {renderWeekDays()}
        
        {/* Dias do mês */}
        {calendarDays.map((dayInfo, index) => (
          <DayCell 
            key={`day-${index}`}
            $isEmpty={!dayInfo}
            $isToday={dayInfo && dayInfo.date.toDateString() === new Date().toDateString()}
            $hasEvents={dayInfo && dayInfo.hasEvents}
            $isActive={isJune2025 && dayInfo && dayInfo.day >= 22 && dayInfo.day <= 24}
            $isSelected={dayInfo && isDateSelected(dayInfo.date)}
            onClick={() => dayInfo && handleDayClick(dayInfo)}
          >
            {dayInfo && (
              <>
                <DayNumber>{dayInfo.day}</DayNumber>
                {dayInfo.hasEvents && <EventIndicator />}
              </>
            )}
          </DayCell>
        ))}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default ProgramacaoCalendar;
