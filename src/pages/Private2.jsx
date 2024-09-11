import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { incrementHour } from "../functions/incrementHour.js";
import styled, { keyframes, css } from "styled-components";
import { openWhatsApp } from "../functions/sendWhatsApp.js";
import ClipLoader from "react-spinners/ClipLoader";
import SubmitPrivateRequest from "./SubmitPrivateRequest.jsx";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export const StyledBox = styled(Box)(({}) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    width: "100%",
    height: "100%",
    
  },

  "& .MuiInputBase-root": {
    paddingRight: "0rem",
    width: '100%',
    position: 'relative'
  },
   "& .MuiButtonBase-root": { 
    position:'absolute',
    left: '0%',
    top: '50%',
    transform: 'translate(0, -50%)',
    margin:'0',
    backgroundColor: '#E6E5EB !important',
    paddingLeft: '1rem'


   },
  "& .MuiInputAdornment-root": {
    position: 'relative !important',
  },
  "& .MuiSvgIcon-root": {
    position:'absolute',
    left: '0%',
    marginLeft: '1rem',
    color: 'grey',
  },
  "& .MuiInputBase-input": {
    color: "black !important",
  },
  
}));

const SlideContainer = styled.div`
  transition: right 0.3s ease;

  @media (orientation: landscape) {
  
  }

  input,
  .custom-select,
  select {
    cursor: pointer;
    background-color: #e6e5eb !important;
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
    width: 90%;
  }
`;

const Line2 = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  div {
    width: 90%;
  }

  height: max-content;
  width: 100%;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; 

  .date-picker-container {
    direction: rtl;
    width: 100%;
    font-size: 1rem;
    flex-grow: 1;
    height: 2.35rem;
    border-radius: 20px;
    cursor: pointer;
    background-color: #e6e5eb !important;
    text-align: right;
    padding-right: 1rem;
    vertical-align: baseline;
  }

  .MuiInputBase-root {
    border: none !important;
  }

  .date-picker-container > * {
    width: 100%;
    height: 100%;
    color: black;
  }

  .MuiFormControl-root {
    -webkit-flex-direction: none;
    width: 100%;
  }

  .MuiInputBase-input {
    display: block;
    border: none;
    width: 100%;
    color: black;
  }

  @media (orientation: landscape) {
    label {
      right: 16%;
    }
  }

  @media (orientation: portrait) {
    label {
      right: 2rem;
    }
  }

  input {
    display: block;
    flex-grow: 1;
    text-align: right;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 1rem !important;
    color: black;
  }

  .has-value {
    color: black !important;
  }

  input[type="date"]:required:invalid::-webkit-datetime-edit {
    color: transparent;
  }
  input[type="date"]:focus::-webkit-datetime-edit {
    color: black !important;
  }

  input::-webkit-date-and-time-value {
    text-align: right !important;
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
  height: 2.35rem !important;

  label {
    color: black !important;
  }

  .custom-select {

    width: 100%;
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
  height: 2.35rem;

  select,
  option {
    -webkit-appearance: none;
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
  }

  select {
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

  input::placeholder {
    color: grey;
  }

  label {
    visibility: hidden;
  }

  input {
    flex-grow: 1;
    height: 2.35rem;
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

  input::placeholder {
    color: grey;
  }

  label {
    visibility: hidden;
  }

  input {
    flex-grow: 1;
    height: 2.35rem;
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

  input::placeholder {
    color: grey;
  }

  label {
    visibility: hidden;
  }

  input {
    flex-grow: 1;
    height: 2.35rem;
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
  color: black;

  @media (orientation: portrait) {

    width: 90%;
  }
  @media (orientation: landscape) {
    width: max-content;
  }

  display: flex;
  flex-direction: column;
  font-family: "Roboto", sans-serif;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
  justify-content: center;
  height: 100%;

  input,
  .date-picker-container 
  {
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    box-sizing: border-box;
    border: none;
    color: black !important;
    cursor: pointer;
    border-radius: 20px;
    font-size: 1rem;
    height: 2.35rem;

    &::placeholder {
      color: grey;
      opacity: 1;
    }

  }

  input {
      font-size: 3rem;

  }

  h1 {
    color: #66fcf1;
  }
`;

export const StyledSelectContainer = styled.div`
  visibility: visible !important;
  color: black !important;
  position: relative;


  .custom-select {
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
    top: 2.85rem;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    // border: 1px solid black;
    border-radius: 20px;
    z-index: 1000;
    display: none;
    color: black !important;
  }

  .options-container.show {
    display: flex;
    flex-direction: column;
    align-items: center;
    display: block;
    overflow: scroll;
    scrollbar-width: none; 
    overflow: auto;

  }


  .options-container::-webkit-scrollbar {
    overflow: hidden;
  }

  .options-container {
    scrollbar-width: none; 

  }

  .options-container::-ms-scrollbar {
  display: none; 
}


  .option {
    background-color: #e6e5eb;
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 1rem;
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
  font-weight: 400;
  justify-content: flex-end;
  border-radius: 20px;
  text-align: left;
  font-size: 1rem;
  transition: transform 1s ease-in;
  cursor: pointer;
  padding: 1rem;
  border-radius: 20px;
  background-color: #F0F0F0;

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
  const [showTrainerOptions, setShowTrainerOptions] = useState(false); // New state for trainer options

  const dayRef = useRef(null);
  const studentNameRef = useRef(null);
  const studentPhoneRef = useRef(null);
  const studentMailRef = useRef(null);
  const trainerRef = useRef(null);

  const inputRef = useRef(null);
  const labelRef = useRef(null);

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
      return alert("יש לבחור תאריך");
    }
    if (!startTime) {
      alert("יש לבחור שעה");
      return;
    }
    if (!trainer || trainer === "בחר מאמן") {
      alert("יש לבחור מאמן");
      return;
    }

    if (!studentName) {
      return alert("יש לכתוב שם");
    }

    if (!studentPhone || !isTenDigitNumber(studentPhone)) {
      alert("יש להזין מספר טלפון תקין עם עשרה מספרים בלבד");
      studentPhoneRef.current.focus();
      return;
    }
    if (!studentMail) {
      // return studentMailRef.current.focus();
      return alert("יש לכתוב מייל");
    }

    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step === 1) {
      setStep(step - 1);
    }
  };

  const getDayLessons = async () => {
    let fixedDay = new Date(day.$d);
    fixedDay.setDate(fixedDay.getDate() + 1);
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
            date: fixedDay,
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


  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
      if (trainerRef.current && !trainerRef.current.contains(event.target)) {
        setShowTrainerOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef, trainerRef]);

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

  const handleSelectTrainerOption = (trainer) => {
    setTrainer(trainer);
    setShowTrainerOptions(false);
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
          style={{}}
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
    if (labelRef.current) {
      labelRef.current.style.visibility = "hidden";
    }
  };

  const handleBlur = (e) => {
    if (e.target.value) {
      labelRef.current.style.visibility = "hidden";
    } else {
      labelRef.current.style.visibility = "visible";
    }
  };

  if (message) {
    return <p>{message}</p>;
  }

  const styles = (theme) => ({
    datePickerInput: {
      color: "black",
    },
  });

  const handleInputRef = (ref) => {
    if (ref) {
      dayRef.current = ref;
    }
  };

  if (trainerPhone !== "") {
    return (
      <>
        <main
          style={{
            height: "100%",
            overflowX: "hidden",
            overflowY: "scroll",
            backgroundColor: "#F2F1F6",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div className="form-container">
            <SlideContainer
              className="slideContainer"
              style={{
                display: "flex",
                direction: "rtl",
                position: "relative",
                width: "max-content",
                height: '100%',
                right: `${step === 0 ? "100%" : "0"}`,
                // top: '50%'
              }}
            >
              <div
                style={{
                  width: "100vw",
                  height: '100%',
                  display: "flex",
                  justifyContent: "center",
                  // marginTop: "1rem",
                }}
              >
                <PrivateForm>
                <div className="line" style={{content:'', width: '100%', height: '3px', backgroundColor:'#e6e5eb', marginBottom: '0.5rem'}}></div>

                  <h1 style={{ textAlign: "right", color: "black",     marginBlockStart: '0rem',
    marginBlockEnd: '0.5rem' 
    }}>
                    קביעת אימון פרטי
                  </h1>

                  <Line1 className="line1">
                    <DateContainer className="date">
                      <label
                        className="date-label"
                        htmlFor="date"
                        style={{ backgroundColor: "transparent" }}
                        ref={labelRef}
                      ></label>

                      <Box
                        className="date-picker-container"
                        style={{
                          direction: "rtl",
                          width: "100%",
                          fontSize: "1rem",
                          flexGrow: "1",
                          height: "2.35rem",
                          textAlign: "right",
                          // paddingRight: "1rem",
                          verticalAlign: "baseline",
                        }}
                      >
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          style={{ width: "100% !important" }}
                        >
                          <StyledBox>
                            <DatePicker
                              value={day}
                              onAccept={(e) => {
                                const value = dayjs(e.$d);
                                setDay(value);
                              }}
                              slotProps={{
                                textField: {
                                  placeholder: "תאריך",
                                  sx: { color: "black" },
                                },
                              }}
                              renderInput={(params) => (
                                <TextField
                                  label="שמוליק"
                                  {...params}
                                  // placeholder="תאריך"
                                  // slotProps={{
                                  sx={{
                                    "& .MuiInputBase-root": {
                                      color: "black !important",
                                      
                                    },
                                    "& .MuiInputBase-input": {
                                      color: "black !important",

                                    },
                                    "& .MuiButtonBase-root": {
                                      // display: 'none'
                                      // visibility: 'hidden'
                                      color: "black",

                                    },
                                    "& .MuiFilledInput-root": {
                                      // display: 'none'
                                      // visibility: 'hidden'
                                      color: "black",

                                    },
                                    "& .MuiInputBase-input-MuiOutlinedInput-input":
                                      {
                                        color: "black",
                                        
                                      },
                                  }}
                                  // }}
                                />
                              )}
                            />
                          </StyledBox>
                        </LocalizationProvider>
                      </Box>
                    </DateContainer>

                    <Hour className="hour" style={{ height: "2.35rem" }}>
                      <label htmlFor="" alt="hour"></label>
                      <StyledSelectContainer
                        ref={selectRef}
                        style={{
                          width: "100%",
                          flexGrow: "1",
                          height: "100%",
                          color: "black !important",
                        }}
                        className="hours-container"
                      >
                        <div
                          className="custom-select"
                          onClick={() => setShowOptions(!showOptions)}
                          style={{
                            height: "100%",
                            maxHeight: "2.35rem",
                            overflow: "hidden",
                            position: "relative",
                          }}
                        >
                          <label
                            htmlFor="time"
                            style={{
                              color: "black !important",
                              cursor: "pointer",
                              paddingRight: "1rem",
                              position: "absolute",
                              top: "50%",
                              right: "0%",
                              transform: "translate(0, -50%)",
                            }}
                            className={!startTime ? "select-disabled" : ""}
                          >
                            {loading ? (
                              <ClipLoader size={10} />
                            ) : startTime ? (
                              startTime
                            ) : (
                              <span style={{ color: "grey" }}>בחר שעה</span>
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

                    {/* <Trainer
                      className="trainer"
                      style={{ height: "2.35rem !important" }}
                    >
                      <label
                        htmlFor="trainer"
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      ></label>
                      
                      <select
                        value={trainer}
                        placeholder="מאמן"
                        onChange={(e) => setTrainer(e.target.value)}
                        required
                        ref={trainerRef}
                        style={{
                          color: "black",
                          height: "2.35rem",
                          paddingRight: "1rem",
                          textAlign: "right",
                          fontSize: "1rem",
                          lineHeight: "100%",
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "-webkit-right",
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
                            textAlign: "right",
                            display: "flex",
                            justifyContent: "center",
                            padding: "1rem",
                            border: "1px solid red",
                            backgroundColor: '#e6e5eb !important',
                            borderRadius: '20px'
                          }}
                        >
                          מאמן
                        </option>
                        <option value="David" >דוד</option>
                        <option value="Eldad">אלדד</option>
                      </select>
                    </Trainer> */}

                    <Trainer
                      className="trainer"
                      style={{ height: "2.35rem !important" }}
                    >
                      <label
                        htmlFor="trainer"
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      ></label>
                      <StyledSelectContainer
                        style={{
                          width: "100%",
                          flexGrow: "1",
                          height: "100%",
                          color: "black !important",
                        }}
                        className="trainer-container"
                        ref={trainerRef}
                      >
                        <div
                          className="custom-select"
                          onClick={() =>
                            setShowTrainerOptions(!showTrainerOptions)
                          }
                          style={{
                            height: "100%",
                            maxHeight: "2.35rem",
                            overflow: "hidden",
                            width: "100%",
                            position: "relative",
                          }}
                        >
                          <label
                            htmlFor="trainer"
                            style={{
                              color: "black !important",
                              cursor: "pointer",
                              paddingRight: "1rem",
                              position: "absolute",
                              top: "50%",
                              right: "0%",
                              transform: "translate(0px, -50%)",
                            }}
                            className={!trainer ? "select-disabled" : ""}
                          >
                            {trainer ? (
                              trainer
                            ) : (
                              <span style={{ color: "grey" }}>בחר מאמן</span>
                            )}
                          </label>
                        </div>
                        <div
                          className={`options-container ${
                            showTrainerOptions ? "show" : ""
                          }`}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="option"
                            onClick={() => handleSelectTrainerOption("דוד")}
                          >
                            דוד
                          </div>
                          <div
                            className="option"
                            onClick={() => handleSelectTrainerOption("אלדד")}
                          >
                            אלדד
                          </div>
                        </div>
                      </StyledSelectContainer>
                    </Trainer>
                  </Line1>

                  <Line2>
                    <Name className="name-container">
                      <label htmlFor="studentName"></label>
                      <input
                        placeholder="שם"
                        type="text"
                        id="studentName"
                        value={studentName}
                        style={{
                          border: "none",
                          paddingRight: "1rem",
                          fontSize: "1rem",
                        }}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                        ref={studentNameRef}
                        // placeholder="שם מלא"
                      />
                    </Name>
                    <Phone className="phone-container">
                      {" "}
                      <label htmlFor="studentPhone" alt="student phone"></label>
                      <input
                        placeholder="מספר פלאפון"
                        type="text"
                        id="studentPhone"
                        value={studentPhone}
                        style={{
                          border: "none",
                          fontSize: "1rem",
                          paddingRight: "1rem",
                        }}
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
                          border: "none",
                          fontSize: "1rem",
                          paddingRight: "1rem",
                        }}
                        onChange={(e) => setStudentMail(e.target.value)}
                        required
                        ref={studentMailRef}
                      />
                    </Mail>
                    <div className="line" style={{content:'', width: '100%', height: '3px', backgroundColor:'#e6e5eb'}}></div>

                  </Line2>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      marginTop: "0.5rem",
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
                      <span>המשך</span>
                    </ArrowLeft>
                  </div>
                  <div className="line" style={{content:'', width: '100%', height: '3px', backgroundColor:'#e6e5eb', marginTop: '0.5rem'}}></div>

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
