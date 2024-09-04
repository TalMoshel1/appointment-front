import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementHour } from "../functions/incrementHour.js";
import styled, { keyframes, css } from "styled-components";
import { openWhatsApp } from "../functions/sendWhatsApp.js";
import ClipLoader from "react-spinners/ClipLoader";

import SubmitPrivateRequest from "./SubmitPrivateRequest.jsx";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PersonIcon from '@mui/icons-material/Person';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import Header from "../New UI/Header.jsx";


const SlideContainer = styled.div`
  transition: right 0.3s ease;

  input, .custom-select, select{
    cursor: pointer;
    background-color: #E6E5EB !important;
    border-radius: 20px;
  }

  font-size: 1rem;

  ::placeholder {
    color: black;
  }

  box-sizing: border-box;
`;

const Line1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: max-content;
  width: 100%;
      gap: 0.5rem;


  div {
  width: 80%;
  }
`;

const Line2 = styled.div`
margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
      gap: 0.5rem;


    div {
  width: 80%
  }

  height: max-content;
  width: 100%;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Ensures the container spans full width */



  label {
    // visibility: hidden;
  }

  input {
  display: block;
    flex-grow: 1;
    width: 100%; /* Ensures the input spans the container's full width */
    // text-align: center; 
      box-sizing: border-box;

  }

    input::-webkit-date-and-time-value {
    text-align: center!important;
}

  @media (orientation: portrait) {
    width: 100%; 
  }

  @supports (-webkit-touch-callout: none) {
    input {
      width: 100%;
    }
  }

  @supports not (-webkit-touch-callout: none) {
    input {
      width: 100%;
    }
  }
`;

const Hour = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.35rem !important;

  label {
  color: black !important;
  // visibility: hidden
  }

  .custom-select {
    padding-top: 1.35rem;
    padding-bottom: 1.35rem;
    width: 100%;
    // text-align: center;
    // background-color: #fff !important;
  }



  @media (orientation: landscape) {
    width: 3.925625rem;
  }

  @supports (-webkit-touch-callout: none) {
    & {
      width: 7rem;
    }
  }

  @supports not (-webkit-touch-callout: none) {
    & {
      width: 6rem;
    }
  }
`;

const Trainer = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
  height: 3.35rem;

  label {
    visibility: hidden
  }


  select,
  option {
    -webkit-appearance: none;
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
    // text-align: center;
    // background-color: #fff !important;
  }

  select { 
      border: 1px solid black !important;

      }

  input[type="date"]:invalid + span:after {
    content: "Birthday";
    position: absolute;
    left: 0;
    top: 0;
  }

  input[type="date"]:focus:invalid + span:after {
    display: none;
  }

  input:not(:focus):invalid {
    color: transparent;
  }

  @supports (-webkit-touch-callout: none) {
    & {
      width: 7rem;
    }
  }

  @supports not (-webkit-touch-callout: none) {
    & {
      width: 6rem;
    }
  }
`;

const Name = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;

  label {
    visibility: hidden
  }

  input {
  flex-grow: 1
  }

  @supports (-webkit-touch-callout: none) {
    & {
      width: 7rem;
    }
  }

  @supports not (-webkit-touch-callout: none) {
    & {
      width: 6rem;
    }
  }

`;

const Phone = styled.div`

display: flex;
justify-content: center;
align-items: center;

label {
    visibility: hidden
  }

  input {
  flex-grow: 1
  }


  @supports (-webkit-touch-callout: none) {
    & {
      width: 7rem;
    }
  }

  @supports not (-webkit-touch-callout: none) {
    & {
      width: 6rem;
    }
  }
`;

const Mail = styled.div`

display: flex;
justify-content: center;
align-items: center;

label {
   visibility: hidden
  }

  input {
  flex-grow: 1
  }


  @supports (-webkit-touch-callout: none) {
    & {
      width: 7rem;
    }
  }

  @supports not (-webkit-touch-callout: none) {
    & {
      width: 6rem;
    }
  }
`;

export const PrivateForm = styled.form`
  direction: rtl;
  // box-shadow: 52px 46px 104px -77px #38b2ac;
  color: black;

  @media (orientation: portrait) {
  border-top: 5px solid grey;
  border-bottom: 5px solid grey;
  // border-radius: 5px;
    width: 90%;
  }
  @media (orientation: landscape) {
    width: 23rem;
  }

  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;

  input {
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
    // text-align: center;
    // background-color: #fff !important;
  }

  h1 {
    color: #66fcf1;
  }
`;

export const StyledSelectContainer = styled.div`

visibility: visible !important;
color: black !important;
  position: relative;

  .select-disabled {
    color: #ccc;
  }

  .hours-container {
  border: 1px solid black;
  }

  .custom-select {
    border: 1px solid black;
    font-size: 1rem;
  

    @supports (-webkit-touch-callout: none) {
      label {
        font-size: 1.1rem;
        font-weight: 400;
      }
    }

    @supports not (-webkit-touch-callout: none) {
      label {
        font-size: 1rem;
      }
    }
  }

  .options-container {
    color: black;
    position: absolute;
    background-color: #ccc !important;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 200px; /* Adjust height as needed */
    overflow-y: auto;
    border: 1px solid #ccc;
    z-index: 1000;
    display: none;
    color: black !important;
  }

  .options-container.show {
    display: flex;
    flex-direction: column;
    align-items: center;


  }

  .option {
    background-color: #ccc;

    padding: 0.5rem;
    // text-align: center;
    cursor: pointer;

    &.disabled {
      color: #fff;
      cursor: not-allowed;
    }
  }
`;

const scaleAnimation = keyframes`
0% {
  border-color:white;
}
50% {
  color:white;
  border-color:white;

}
100% {
  border-color:white;

}
`;

const ArrowLeft = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: max-content;
  padding: 1rem;
  justify-content: flex-end;
  border: 1px solid black;
  // border-radius: 20px;
  text-align: left;
  font-size: 1rem;
  transition: transform 1s ease-in;
  cursor: pointer;

  animation: ${(props) =>
    props.animate
      ? css`
          ${scaleAnimation} 1s ease-in-out infinite
        `
      : "none"};
`;

const RequestPrivateLesson = () => {
  const trainerPhone = useSelector((state) => state.calendar.trainerPhone);
  const [day, setDay] = useState();
  const [startTime, setStartTime] = useState("");
  const [trainer, setTrainer] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentMail, setStudentMail] = useState("");
  const [cantIn, setCantIn] = useState([]);
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [thisDayLessons, setThisDayLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const dayRef = useRef(null);
  const studentNameRef = useRef(null);
  const studentPhoneRef = useRef(null);
  const studentMailRef = useRef(null);
  const trainerRef = useRef(null);

  const [inputType, setInputType] = useState("text");

  const navigate = useNavigate();

  useEffect(() => {
    if (trainerPhone === "") {
      navigate("/signin", { state: { state: "/requestPrivte" } });
    }
  }, []);

  function isTenDigitNumber(str) {
    return /^\d{10}$/.test(str);
  }

  const handleFowardStep = () => {
    if (!day) {
      return dayRef.current.focus();
    }
    if (!startTime) {
      alert("יש לבחור שעה");
      return;
    }

    if (!studentName) {
      return studentNameRef.current.focus();
    }

    if (!studentPhone || !isTenDigitNumber(studentPhone)) {
      alert("יש להזין מספר טלפון תקין עם עשרה מספרים בלבד");
      studentPhoneRef.current.focus();
      return;
    }
    if (!studentMail) {
      return studentMailRef.current.focus();
    }
    if (!trainer || trainer === "בחר מאמן") {
      alert("יש לבחור מאמן");
      return;
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step === 1) {
      setStep(step - 1);
    }
  };

  const getDayLessons = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/lessons/day",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: day,
          }),
        }
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(data);
      setThisDayLessons(data);
      setLoading(false);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  useEffect(() => {
    if (day) {
      getDayLessons();
    }
  }, [day]);

  useEffect(() => {
    if (thisDayLessons.length > 0) {
      const lessonsArray = thisDayLessons
        .filter((l) => l.isApproved)
        .map((l, index) => (
          <div key={index} style={{ direction: "ltr" }}>
            {l.startTime} - {l.endTime}
            <br />
          </div>
        ));
      setCantIn(lessonsArray);
    } else {
      setCantIn([]);
    }
  }, [thisDayLessons]);

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleInputChange = (e) => {
    const date = new Date(e.target.value);
    setDay(date);
  };

  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  const sendPostPrivateRequest = async () => {
    try {
      const endTime = incrementHour(startTime);
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/lessons/requestPrivateLesson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            day,
            startTime,
            endTime,
            studentName,
            studentPhone,
            studentMail,
            trainer,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      openWhatsApp(data, `${trainerPhone}`, "coach");

      setMessage("אימון נשלח לאישור מאמן");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!startTime) {
      alert("יש לבחור שעה");
      return;
    }
    sendPostPrivateRequest();
  };

  const handleSelectOption = (time) => {
    setStartTime(time);
    setShowOptions(false);
  };

  const generateTimeOptions = () => {
    const options = [];
    let hour = 8;
    let minute = 0;

    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    while (hour < 20 || (hour === 20 && minute === 0)) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`;
      const timeInMinutes = parseTime(time);

      const isDisabled = cantIn.some((l) => {
        const start = l.props.children[0];
        const end = l.props.children[2];
        const startInMinutes = parseTime(start);
        const endInMinutes = parseTime(end);

        return timeInMinutes >= startInMinutes && timeInMinutes < endInMinutes;
      });

      options.push(
        <div
          key={time}
          style={{ textAlign: "center", fontSize: "0.85rem" }}
          className={`option ${isDisabled ? "disabled" : ""}`}
          onClick={() => !isDisabled && handleSelectOption(time)}
        >
          {time}
        </div>
      );
      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour += 1;
      }
    }

    return options;
  };

  const handleFocus = () => {
    setInputType("date");
  };

  const handleBlur = () => {
    if (inputType === "date") {
      setInputType("text");
    }
  };

  if (message) {
    return <p>{message}</p>;
  }

  if (trainerPhone !== "") {
    return (
      <>
        <main
          style={{ height: "88svh", maxHeight: '88svh', overflowX: "hidden", overflowY: "scroll", backgroundColor: '#F2F1F6' }}
        >
          <div className="form-container">


          <SlideContainer
            className="slideContainer"
            style={{
              display: "flex",
              direction: "rtl",
              position: "relative",
              width: "max-content",
              right: `${step === 0 ? "100%" : "0"}`,
            }}
          >
            <div
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                marginTop: '1rem',


              }}
            >
              <PrivateForm>
              <h1 style={{ textAlign: "right", color: "black" }}>
            קביעת אימון פרטי
          </h1>
                <Line1 className="line1">
                  <DateContainer className="date">
                    <label
                      htmlFor="date"
                    >
                      {/* <CalendarMonthIcon/> */}
                    </label>
                    <input
                      type="date"
                      onBlur={handleBlur}
                      style={{
                        fontSize: "1rem",
                        flexGrow: '1',
                        height: "3.35rem",
                        fontSize: "1rem",
                        border: 'none',
                        border: '1px solid black',
                        textAlign: 'right'
                      }}
                      className="date"
                      onChange={handleInputChange}
                      min={formatDateToYYYYMMDD(new Date())}
                      required
                      lang="he"
                      dir="rtl"
                      ref={dayRef}
                    />
                  </DateContainer>

                  <Hour className="hour" style={{height: '3.35rem'}}>
                    <label
                      htmlFor=""
                      alt='hour'
                      
                    >
                      {/* <QueryBuilderIcon/> */}
                    </label>
                    <StyledSelectContainer
                      ref={selectRef}
                      style={{
                        width: "100%",
                        flexGrow: "1",
                        height: "100%",
                        color: 'black !important'
                      }}
                      className='hours-container'
                    >
                      <div
                        className="custom-select"
                        onClick={() => setShowOptions(!showOptions)}
                        style={{
                          height: "100%",
                          maxHeight: "3.35rem",
                          overflow: "hidden",
                        }}
                      >
                        <label
                          htmlFor="time"
                          style={{
                            color: "black !important",
                            cursor: "pointer",
                            textAlign: "center",
                            position: "relative",
                            top: "-40%",
                            left: "0%",
                          }}
                          className={!startTime ? "select-disabled" : ""}
                        >
                          {loading ? (
                            <ClipLoader size={10} />
                          ) : startTime ? (
                            startTime
                          ) : (
                            "בחר שעה"
                          )}
                        </label>
                      </div>
                      <div
                        className={`options-container ${
                          showOptions ? "show" : ""
                        }`}
                        STYLE={{
                          cursor: "pointer",
                        }}
                      >
                        {generateTimeOptions()}
                      </div>
                    </StyledSelectContainer>
                  </Hour>

                  <Trainer className="trainer" style={{height: '3.35rem !important' }}>
                    <label htmlFor="trainer" style={{height: '100%', display: 'flex', alignItems: 'center'}}>
                    </label>
                    <select
                      value={trainer}
                      placeholder="מאמן"
                      onChange={(e) => setTrainer(e.target.value)}
                      required
                      ref={trainerRef}
                      style={{
                        color: "black",
                        height: "3.35rem",
                        width: "100%",
                        textAlign: "center",
                        fontSize: "1rem",
                        lineHeight: "100%",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "-webkit-center",
                        position: "relative",
                        direction: "rtl",
                      }}
                    >
                      <option
                        className="coaches"
                        value=""
                        selected
                        style={{
                          lineHeight: "100%",
                          width: "100%",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          padding: "1rem",
                          border: "1px solid red",
                        }}
                      >מאמן</option>
                      <option value="David">David</option>
                      <option value="Eldad">Eldad</option>
                    </select>
                  </Trainer>
                </Line1>

                <Line2>
                  <Name className="name-container">
                    <label htmlFor="studentName">
                    </label>
                    <input
                      placeholder="שם"
                      type="text"
                      id="studentName"
                      value={studentName}
                      style={{
                        border: 'none',
                        border: '1px solid black',
                        fontSize: "1rem" }}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                      ref={studentNameRef}
                      // placeholder="שם מלא"
                    />
                  </Name>
                  <Phone className="phone-container">
                    {" "}
                    <label htmlFor="studentPhone" alt='student phone'>
                    </label>
                    <input
                      placeholder='מספר פלאפון'
                      type="text"
                      id="studentPhone"
                      value={studentPhone}
                      style={{
                        border: '1px solid black',
                        fontSize: "1rem" }}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      required
                      ref={studentPhoneRef}
                    />
                  </Phone>

                  <Mail className="mail-container">
                    <label htmlFor="studentMail">
                      {/* <AlternateEmailIcon/> */}
                    </label>
                    <input
                      placeholder="כתובת מייל"
                      type="email"
                      id="studentMail"
                      value={studentMail}
                      style={{
                        border: '1px solid black',
                        fontSize: "1rem",
                      }}
                      onChange={(e) => setStudentMail(e.target.value)}
                      required
                      ref={studentMailRef}
                    />
                  </Mail>
                </Line2>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: '0.4rem'
                  }}
                >
                  <ArrowLeft
                    animate={
                      day &&
                      startTime &&
                      trainer !== "בחר מאמן" &&
                      studentName &&
                      studentMail &&
                      isTenDigitNumber(studentPhone)
                    }
                    onClick={handleFowardStep}
                  >
                    המשך
                    <KeyboardArrowLeftIcon />
                  </ArrowLeft>
                </div>
              </PrivateForm>
            </div>

            <div
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SubmitPrivateRequest
                step={step}
                previous={handlePreviousStep}
                body={{
                  day,
                  startTime,
                  studentName,
                  studentPhone,
                  studentMail,
                  trainer,
                }}
              />
            </div>
          </SlideContainer>
          </div>
        </main>
      </>
    );
  }
};

export default RequestPrivateLesson;
