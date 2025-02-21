import React from "react";
import { formatThreeLettersMonthAndDaysToHebrew } from "../utils/formatThreeLettersMonthAndDaysToHebrew";
import { DayHeader } from "./css/DayHeader";


const Day = ({ date, lessons, isSelected, onSelectDate, isToday }) => {
  const dayOfTheWeek = date.displayedDate.split(",")[0];

  return (
    <div className="day" onClick={onSelectDate}>
      <DayHeader isSelected={isSelected} isToday={isToday}>
        <h1 style={{ color: "#C5C6C7" }}>
          {formatThreeLettersMonthAndDaysToHebrew("day", dayOfTheWeek)}
        </h1>
        <h1 className="date">{new Date(date.date).getDate()}</h1>
      </DayHeader>
    </div>
  );
};

export default React.memo(Day);
