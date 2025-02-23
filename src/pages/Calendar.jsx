import React from "react";
import "../App.css";
import CalendarHeader from "../containers/CalendarHeader.jsx";
import Days from "../containers/Days.jsx";
import "./css/Calendar.css";
import { CalendarContainer, Content } from "./styledComponents/Calendar.jsx";


const Calendar = () => {

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
