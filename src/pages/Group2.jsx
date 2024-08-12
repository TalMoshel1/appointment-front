import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { repeatEndDate } from "../functions/repeatEndDate.js";
import styled from "styled-components";
import { toggleSetGroupModal } from "../redux/calendarSlice.js";

const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  position: relative;
  width: 100%;
`;

const RequestForm = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 2rem;
  gap: 1rem;
  direction: rtl;
  border: 1px solid black;
  left: 50%;
  width: 77%;
  transform: translate(-50%);
  border-radius: 2rem;
  box-shadow: 52px 46px 104px -77px #38b2ac;


  @media (orientation: landscape) {
    width: max-content;
  }
  text-align: center;
  position: relative;

  .line1,
  .line2,
  .line3 {
    display: flex;
    height: 10svh;
    gap: 0.6rem;
    width: 100%;
  }

  .line1 {
  width: fit-content;
  }

  textarea {
    height: 100%;
      background-color:#38b2ac;

  }

  label {
    text-align: right;
    height: 7rem;
  }

  .line1 label,
  .line2 label {
    width: max-content;
    text-align: right;
  }

  .line2 input {
    height: 100%;
      background-color:#38b2ac;

  }

  .line2 div {
    width: 20%;
  }

  .line2 {
    align-items: right;
  }

  .line3 div {
    width: 100%%;
  }

  @media (orientation: landscape) {
    .line3 div {
      width: max-content;
    }
  }

  .line3 label {
    width: 100%;
  }

  @media (orientation: portrait) {
    .line3 input {
      margin-top: 1rem;
    }
  }

  .repeatMonth {
    background-color: white;
    color: black;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid grey;
    color: black;
    cursor: pointer;
    border-radius: 20px;
      background-color:#38b2ac;

  }

  button {
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    cursor: pointer;
  }

  @media (orientation: portrait) {
    button {
      margin-top: 2rem;
    }
  }

  @media (orientation: landscape) {
    button {
      margin-top: 0.5rem;
    }
  }

  .monthes-container { 
  width: max-content;
  }

  .line1 label {
  width: fit-content;
  }
`;

const Main = styled.main`
  margin-top: 10svh;
`;

const Group2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [day, setDay] = useState("");
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
  const [datePlaceholder, setDatePlaceholder] = useState("בחר תאריך");

const nameRef = useRef(null);
const descriptionRef = useRef(null);
const dayRef = useRef(null);
const timePattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
const startTimeRef = useRef(null);
const endTimeRef = useRef(null); 

  const [displayPage, setDisplayPage] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: newValue,
      };

      if (name === "repeatsWeekly" && newValue) {
        return {
          ...updatedFormData,
          startTime: "",
          endTime: "",
          repeatMonth: "1",
          isApproved: false,
        };
      }

      if (name === "repeatMonth" && prevFormData.repeatsWeekly) {
        const endDate = repeatEndDate(prevFormData.day, parseInt(value, 10));
        return {
          ...updatedFormData,
          repeatEndDate: endDate,
        };
      }

      return updatedFormData;
    });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDay(selectedDate);
    setFormData((prevFormData) => ({
      ...prevFormData,
      day: selectedDate,
    }));
    setDatePlaceholder(
      selectedDate ? `תאריך שנבחר: ${selectedDate}` : "בחר תאריך"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

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
        setFormData((prevData) => ({ ...prevData, startTime: "" }));
        startTimeRef.current.focus();
        return;
      }
    
      if (!timePattern.test(formData.endTime)) {
        setFormData((prevData) => ({ ...prevData, endTime: "" }));
        endTimeRef.current.focus();
        return;
      }

    const { repeatMonth, ...formDataToSend } = formData;

    const repeatEnd = repeatEndDate(formData.day, parseInt(repeatMonth, 10));

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
          }),
        }
      );

      const data = await response.json();
      console.log("group data: ", data);
      if (!data.message) {
        return navigate('/calendar')
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

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      day,
    }));
  }, [day]);

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
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (data.message !== "Token is valid") {
        console.log("getting here!");
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
      <Main style={{    position: 'relative',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, 88%)',
        // border: '1px solid white',
        width: 'max-content'
    }}
        >
        <div onClick={handleCloseError} style={{direction:'rtl'}}>X</div>
        <strong>{message}</strong>
      </Main>
    );
  }

  if (displayPage) {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>קביעת אימון קבוצתי</h1>
        <RequestForm onSubmit={handleSubmit}>
          <div className="line3">
            <FormItemContainer>
              <label>אימון חוזר:</label>
              <input
                style={{ width: "fit-content" }}
                type="checkbox"
                name="repeatsWeekly"
                checked={formData.repeatsWeekly}
                onChange={handleChange}
              />
            </FormItemContainer>

            {/* {formData.repeatsWeekly && ( */}
            <FormItemContainer className="monthes-container">
              <label>לכמה חודשים:</label>
              <select
                disabled={!(formData.repeatsWeekly)}
                name="repeatMonth"
                className="repeatMonth"
                value={formData.repeatMonth}
                onChange={handleChange}
                required={formData.repeatsWeekly}
                style={{ color: formData.repeatsWeekly ? 'black' : '#7788997d', backgroundColor:'#38b2ac' }}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month} style={{backgroundColor: '#38b2ac', textAlign:'center', width:'1px'}}>
                    {month}
                  </option>
                ))}
              </select>
            </FormItemContainer>
            {/* )} */}
          </div>
          <div className="line3">
            <FormItemContainer
              className="date-container"
              style={{ width: "50%" }}
            >
              <label>תאריך האימון:</label>
              <input
                ref={dayRef}
                type="date"
                name="day"
                value={formData.day}
                style={{fontSize: '1rem'}}
                onChange={handleDateChange}
                min={formatDateToYYYYMMDD(new Date())}
                placeholder={datePlaceholder}
                required
              />
            </FormItemContainer>
       
          </div>

          <div className="line3">
          <FormItemContainer>
              <label>שם האימון:</label>
              <input
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
              <label>שעת התחלה (דוגמא: 08:00):</label>
              <input
                ref={startTimeRef}
                type="text"
                name="startTime"
                pattern="[0-9]{2}:[0-9]{2}"
                placeholder="HH:MM"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </FormItemContainer>

            <FormItemContainer>
              <label>שעת סיום (דוגמא: 09:00):</label>
              <input
                ref={endTimeRef}
                type="text"
                name="endTime"
                pattern="[0-9]{2}:[0-9]{2}"
                placeholder="HH:MM"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </FormItemContainer>
          </div>

          <button type="submit" onClick={handleSubmit}V style={{padding: '1rem', borderRadius: '20px', fontSize: '1rem', backgroundColor: 'rgba(56, 178, 172, 0.1)'}}>
            צור אימון
          </button>
        </RequestForm>
      </>
    );
  }
};

const formatDateToYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default Group2;
