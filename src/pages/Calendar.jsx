import React from 'react';
import styled from 'styled-components';
import CalendarHeader from '../components/CalendarHeader.jsx';
import Days from '../components/Days.jsx';
import { useSelector } from 'react-redux';
import '../css-pages/Calendar.css';
import DateSliderDays from '../components/DateSliderDays.jsx';

// Define styled-components outside of the component
const CalendarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  @media (orientation: landscape) {
    // margin-top: 5rem;
    // min-height: calc(100svh - 5rem);
  }

  @media (orientation: portrait) {
    min-height: calc(100svh - 3rem);
  }
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;

  @media (orientation: landscape) {
    margin-top: 0.5rem;
  }
`;

const DayContainer = styled.ul`
  all: unset;
`;

const Calendar = () => {
  const view = useSelector((state) => state.calendar.view);
  const lessonsToDisplay = useSelector((state) => state.calendar.lessonsToDisplay);

  return (
    <CalendarContainer className="calendar">
      <CalendarHeader className="calendar header" />
      {view === 'week' ? (
        <Content className="content">
          <Days />
        </Content>
      ) : (
        <>
          <DateSliderDays className="dateSliderDays" style={{ border: '1px solid red' }} />
        </>
      )}
    </CalendarContainer>
  );
};

// Wrap the component with React.memo to prevent unnecessary re-renders
export default React.memo(Calendar);
