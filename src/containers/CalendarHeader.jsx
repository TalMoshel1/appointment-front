import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setView, incrementDate, setMonth } from "../store/calendarSlice.js";
import styled from "styled-components";
import { renderDays } from "../utils/renderDays.js";
import { formatThreeLettersMonthAndDaysToHebrew } from "../utils/formatThreeLettersMonthAndDaysToHebrew.js";
import DateSliderDays from "./DateSliderDays.jsx";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Joyride from "react-joyride";
import { Header } from "./styledComponent/CalendarHeader.js";

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const currentDateString = useSelector((state) => state.calendar.currentDate);
  const view = useSelector((state) => state.calendar.view);
  let [currentDate, setCurrentDate] = useState(null);
  const [runTour, setRunTour] = useState(true);

  const steps = [
    {
      target: ".previous-week",
      content: "לחץ כאן כדי לראות את השבוע הקודם",
      disableBeacon: true,
    },
    {
      target: ".next-week",
      content: "לחץ כאן כדי לראות את השבוע הבא",
      disableBeacon: true,
    },
  ];

  useEffect(() => {
    if (currentDateString) {
      setCurrentDate(new Date(currentDateString));
    }
  }, [currentDateString]);

  const handleNext = () => {
    if (view === "week") {
      dispatch(incrementDate(7));
    } else {
      dispatch(incrementDate(1));
    }
  };

  const handlePrev = () => {
    if (view === "month") {
      dispatch(setMonth(-1));
    } else if (view === "week") {
      dispatch(incrementDate(-7));
    } else {
      dispatch(incrementDate(-1));
    }
  };

  const daysweek = renderDays(new Date(currentDate), "week");

  let firstDate = daysweek[0].displayedDate.split(" ");
  let endDate = daysweek[daysweek.length - 2].displayedDate.split(" ");

  const monthInHebrew = formatThreeLettersMonthAndDaysToHebrew(
    "month",
    endDate[1]
  );
  const startMonthInHebrew = formatThreeLettersMonthAndDaysToHebrew(
    "month",
    firstDate[1]
  );

  if (monthInHebrew === startMonthInHebrew) {
    const DateString = `${startMonthInHebrew} ${endDate[3]}`;
  }
  const DateString =
    monthInHebrew !== startMonthInHebrew
      ? `${startMonthInHebrew} - ${monthInHebrew} ${endDate[3]}`
      : `${startMonthInHebrew} ${endDate[3]}`;

  return (
    <>
      <Header>
        <>
          <button onClick={handlePrev} style={{ marginLeft: "3rem" }}>
            <KeyboardArrowRightIcon className="previous-week" />
          </button>

          <span
            style={{
              direction: "rtl",
              width: "9.431875rem",
              textAlign: "center",
            }}
          >
            {currentDate && <>{DateString}</>}
          </span>
        </>

        <button onClick={handleNext} style={{ marginRight: "3rem" }}>
          <KeyboardArrowLeftIcon className="next-week" />
        </button>
      </Header>
      <Joyride
        steps={steps}
        run={true}
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            setRunTour(false);
          }
        }}
        continuous={false}
      />
    </>
  );
};

export default React.memo(CalendarHeader);
