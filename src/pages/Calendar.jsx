import React from "react";
import "../App.css";
import styled from "styled-components";
import CalendarHeader from "../containers/CalendarHeader.jsx";
import Days from "../containers/Days.jsx";
import "./css/Calendar.css";


const Calendar = () => {


  const CalendarContainer = styled.div`
    width: 100%;
    direction: rtl;


    display: flex;
    flex-direction: column;
  `;

  const Content = styled.div`
    display: flex;
    direction: rtl;
    flex-direction: column;
    height: 73svh;
    overflow-x: none;
    overflow-y: scroll;
    gap: 1rem;
    direction: rtl;
    overflow: scroll;
    scrollbar-width: none;
    overflow: auto;

    &::-webkit-scrollbar {
      overflow: hidden;
    }

    &::-ms-scrollbar {
      display: none;
    }

    &::-webkit-scrollbar {
      width: 102px;
    }

    @media (orientation: portrait) {
      height: 73svh;
    }

    @media (orientation: landscape) {
      height: 68svh;
    }
  `;
  return (
    <CalendarContainer className="calendar">
      <CalendarHeader className="calendar header" />
      <Content className="content">
        <Days className="days" />
      </Content>
    </CalendarContainer>
  );
};

export default React.memo(Calendar);
