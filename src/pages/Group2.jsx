import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toggleSetGroupModal } from "../redux/calendarSlice.js";
import { repeatEndDate } from "../functions/repeatEndDate.js";
import ClipLoader from "react-spinners/ClipLoader";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StyledBox } from "./Private2.jsx";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
// import { StyledSelectContainer } from "./Private2.jsx";

export const StyledSelectContainer = styled.div`
  visibility: visible !important;
  // color: black !important;
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
    color: grey;
    position: absolute;
    background-color: #ccc !important;
    top: 2.85rem;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border-radius: 20px;
    z-index: 1000;
    display: none;
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
    background-color: #e6e5eb !important;
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    cursor: pointer;
  }
`;

const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  position: relative;
  width: 100%;
  .scroll {
    overflow-y: hidden;
  }

  .date-picker-container {
    direction: rtl;
    width: 100%;
    font-size: 1rem;
    flex-grow: 1;
    height: 2.35rem;
    // border: 1px solid black;
    border-radius: 20px;
    cursor: pointer;
    background-color: #e6e5eb !important;
    text-align: right;
    vertical-align: baseline;
  }

  .MuiInputBase-root,
  .MuiButtonBase-root {
    border: none !important;
  }

  .date-picker-container > * {
    height: 100%;
    color: black;
  }

  .MuiFormControl-root {
    -webkit-flex-direction: none;
    width: 100%;
  }

  .MuiInputAdornment-root {
  position: relative;
  }

  .MuiInputBase-input {
    position:'absolute',
    left: '0%',
    top: '50%',
    transform: 'translate(0, -50%)'
  }


  input::placeholder {
    color: grey;
  }
`;

const RequestForm = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 1rem;
  gap: 0.5rem;
  direction: rtl;
  left: 50%;
  width: max-content;
  transform: translate(-50%);
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  position: relative;
  color: black;
  font-family: "Roboto", sans-serif;

  textarea {
    resize: none;
          -webkit-resize: none; /* For Safari and older Chrome */
  -moz-resize: none; /* For older Firefox */
  -ms-resize: none; /* For older IE */
  }


  textarea,
  input,
  select {
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 1rem;
    box-sizing: border-box;
    border: none;
    color: black !important;
    cursor: pointer;
    border-radius: 20px;
    // background-color: #38b2ac;
    font-size: 1rem;
    height: 2.35rem;

    &::placeholder {
      color: grey;
      opacity: 1;
    }
  }

  textarea,
  input:not([type="checkbox"]),
  select:not([name="repeatMonth"]) {
    background-color: #e6e5eb;
    width: 100%;
  }

  select([name="repeatMonth"]) {
    background-color: ${(props) => (props.checked ? "#e6e5eb !important" : "")};
  }

  .custom-select {
    cursor: pointer;
    background-color: #e6e5eb !important;
    border-radius: 20px;
    // min-width: 2.35rem;
  }

  label:not([name="months"]) {
    display: none;
  }

  button {
    padding: 1rem;
    font-size: 1rem;
    // border: 1px solid black;
    border-radius: 20px;
    cursor: pointer;
    // margin-top: 0.5rem;
  }

  .line3 {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 90%;
  }

  .line3 div {
  }
`;

const Main = styled.main`
  margin-top: 10svh;
`;

const Group2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    trainer: "דוד",
    name: "",
    description: "",
    day: "",
    startTime: "",
    endTime: "",
    repeatsWeekly: false,
    repeatMonth: "1",
    isApproved: true,
    type: "group",
  });
  const [message, setMessage] = useState("");
  const [displayPage, setDisplayPage] = useState(false);
  const [showMonthsOptions, setShowMonthsOptions] = useState(false);
  const monthRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const dayRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const timePattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

  const textColor = formData.repeatsWeekly ? 'black' : 'grey';


  const handleDisplayMonth = () => {
    if (formData.repeatsWeekly && !showMonthsOptions) {
      return setShowMonthsOptions(true);
    }
    setShowMonthsOptions(false);

  };

  const handleMonthChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      repeatMonth: value,
    }));
    setShowMonthsOptions(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monthRef.current && !monthRef.current.contains(event.target)) {
        setShowMonthsOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [monthRef]);

  const generateMonthOptions = () => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return months.map((month) => (
      <div
        key={month}
        className="option"
        onClick={() => {
          handleMonthChange(month);
        }}
      >
        {month}
      </div>
    ));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      day: e.$d,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      nameRef.current.focus();
      return;
    }
    if (!formData.description) {
      descriptionRef.current.focus();
      return;
    }
    if (!formData.day) {
      dayRef.current.focus();
      return;
    }
    if (!timePattern.test(formData.startTime)) {
      startTimeRef.current.focus();
      return;
    }
    if (!timePattern.test(formData.endTime)) {
      endTimeRef.current.focus();
      return;
    }

    const { repeatMonth, ...formDataToSend } = formData;
    let day = new Date(formData.day);
    day.setDate(day.getDate() + 1);

    const repeatEnd = repeatEndDate(day, parseInt(repeatMonth, 10));

    try {
      const token = JSON.parse(localStorage.getItem("boxing"))?.token;
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/lessons/group",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
          body: JSON.stringify({
            ...formDataToSend,
            repeatEndDate: repeatEnd,
            day: day,
          }),
        }
      );
      const data = await response.json();
      if (!data.message) {
        return navigate("/calendar");
      }
      setMessage(data.message);
      handleCloseCreateGroupLesson();
    } catch (error) {
      console.error("Error creating group lesson:", error);
      setMessage("Error");
      handleCloseCreateGroupLesson();
    }
  };

  const handleCloseCreateGroupLesson = () => {
    dispatch(toggleSetGroupModal());
  };

  const handleCloseError = () => {
    setMessage("");
  };

  const authenticateRequest = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("boxing"))?.token;
      if (!token) throw new Error("No token found");
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/auth/verify-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.message !== "Token is valid") {
        navigate("/signin", { state: { state: "/setgrouplesson" } });
      } else {
        setDisplayPage(true);
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      navigate("/signin", { state: { state: "/setgrouplesson" } });
    }
  };

  useEffect(() => {
    authenticateRequest();
  }, []);


  if (message) {
    return (
      <Main>
        <div onClick={handleCloseError} style={{ direction: "rtl" }}>
          X
        </div>
        <strong>{message}</strong>
      </Main>
    );
  }

  // if (!displayPage) {
  //   return <ClipLoader color="#66FCF1" loading={true} size={150} />;
  // }

  return (
    <>
      <RequestForm onSubmit={handleSubmit}>
        <div
          className="line"
          style={{
            content: "",
            width: "100%",
            height: "3px",
            backgroundColor: "#e6e5eb",
          }}
        ></div>

        <h1
          style={{
            textAlign: "center",
            marginBlockStart: "0rem",
            marginBlockEnd: "0rem",
            marginBottom: "0.5rem",
            color: "black",
          }}
        >
          קביעת אימון קבוצתי
        </h1>

        <div className="line3">
          <FormItemContainer
            style={{ flexDirection: "row", height: "2.35rem", gap: "0.5rem" }}
          >
            <label style={{ color: textColor }}>אימון חוזר:</label>
            <StyledCheckbox
              type="checkbox"
              name="repeatsWeekly"
              checked={formData.repeatsWeekly}
              onChange={handleChange}
            />

            <StyledSelectContainer
              ref={monthRef}
              style={{
                width: "100%",
                minWidth: "6.820625rem",
                flexGrow: "1",
                height: "100%",
                color: "black !important",
              }}
            >
              <div
                className="custom-select"
                onClick={() =>
                  handleDisplayMonth()
                }
                style={{
                  height: "100%",
                  maxHeight: "2.35rem",
                  overflow: "hidden",
                  width: "100%",
                  top: "33%",
                  cursor: formData.repeatsWeekly ? "pointer" : "not-allowed", // Disable cursor
                  backgroundColor: formData.repeatsWeekly
                    ? "#e6e5eb"
                    : "#f0f0f0", // Grayout background if disabled
                }}
              >
                <label
                  htmlFor="months"
                  name="months"
                  style={{
                    color: formData.repeatsWeekly ? "black" : "grey", // Change text color based on state
                    cursor: formData.repeatsWeekly ? "pointer" : "not-allowed",
                    position: "relative",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "block",
                  }}
                >
                  {formData.repeatsWeekly ? (
                    <span>{formData.repeatMonth}</span>
                  ) : (
                    <span style={{ color: "grey" }}>לכמה חודשים</span>
                  )}
                </label>
              </div>
              <div
                className={`options-container ${
                  showMonthsOptions ? "show" : ""
                }`}
                ref={monthRef}
              >
                {generateMonthOptions()}
              </div>
            </StyledSelectContainer>
          </FormItemContainer>
        </div>

        <div className="line3">
          <FormItemContainer>
            <label>תאריך האימון:</label>
            <Box
              className="date-picker-container"
              style={{
                direction: "rtl",
                width: "100%",
                fontSize: "1rem",
                flexGrow: "1",
                height: "2.35rem",
                textAlign: "right",
                verticalAlign: "baseline",
              }}
            >
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                style={{ width: "100% !important" }}
              >
                <StyledBox>
                  <DatePicker
                    value={formData.day ? dayjs(formData.day) : null}
                    onAccept={(e) => {
                      const value = dayjs(e.$d);
                      handleDateChange(value);
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
                        sx={
                          {
                            // "& .MuiInputBase-root::placeholder": {
                            //   color: "grey !important",
                            // },
                            // "& .MuiInputBase-input::placeholder": {
                            //   color: "grey !important",
                            // },
                            // "& .MuiButtonBase-root::placeholder": {
                            //   color: "grey",
                            // },
                            // "& .MuiFilledInput-root::placeholder": {
                            //   color: "grey",
                            // },
                            // "& .MuiInputBase-input-MuiOutlinedInput-input": {
                            //   color: "grey",
                            // },
                          }
                        }
                      />
                    )}
                  />
                </StyledBox>
              </LocalizationProvider>
            </Box>
          </FormItemContainer>
        </div>

        <div className="line3">
          <FormItemContainer>
            <label>שם האימון:</label>
            <input
              placeholder="שם"
              ref={nameRef}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormItemContainer>
          <FormItemContainer>
            <label>תיאור האימון:</label>
            <textarea
              style={{ alignContent: "center" }}
              placeholder="תיאור"
              ref={descriptionRef}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormItemContainer>
        </div>

        <div className="line3">
          <FormItemContainer>
            <label>שעת התחלה:</label>
            <input
              placeholder="שעה התחלה"
              ref={startTimeRef}
              type="text"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              pattern={timePattern.source}
              required
            />
          </FormItemContainer>

          <FormItemContainer>
            <label>שעת סיום:</label>
            <input
              placeholder="שעת סיום"
              ref={endTimeRef}
              type="text"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              pattern={timePattern.source}
              required
            />
          </FormItemContainer>
        </div>
        <div
          className="line"
          style={{
            content: "",
            width: "100%",
            height: "3px",
            backgroundColor: "#e6e5eb",
          }}
        ></div>

        <button type="submit" onClick={(e) => handleSubmit(e)}>
          הוסף אימון
        </button>
        <div
          className="line"
          style={{
            content: "",
            width: "100%",
            height: "3px",
            backgroundColor: "#e6e5eb",
          }}
        ></div>
      </RequestForm>
    </>
  );
};

export default Group2;

const StyledCheckbox = styled.input`
  position: relative;
  appearance: none;
  width: 11rem;
  text-align: center;
  height: 2.35rem;
  align-content: baseline;
  margin: 0;
  // border: 2px solid #ddd;
  border-radius: 4px;
  background-color: ${(props) =>
    props.checked ? "#ccc" : props.repeatsWeekly ? "#ccc" : "#fff"};
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    border: 1px solid black;
  }

  &:checked {
    background-color: #e6e5eb;
  }

  &::before {
    content: "אימון חוזר";
    color: grey;
    display: block;
    width: max-content;
    text-align: center;
    align-content: baseline;
    // border-width: 0 2px 2px 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const MonthSelect = styled.select`
  background-color: #e6e5eb;
`;

/*          <MonthSelect
              disabled={!formData.repeatsWeekly}
              name="repeatMonth"
              value={formData.repeatsWeekly ? formData.repeatMonth : ""}
              onChange={handleChange}
              required={formData.repeatsWeekly}
              style={{ width: "100%" }}
            >
              
              <option value="" disabled hidden>
                לכמה חודשים
              </option>

              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </MonthSelect>*/
