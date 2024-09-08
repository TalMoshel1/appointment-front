import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toggleSetGroupModal } from "../redux/calendarSlice.js";
import { repeatEndDate } from "../functions/repeatEndDate.js";
import ClipLoader from "react-spinners/ClipLoader";

const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
  position: relative;
  width: 100%;
  .scroll {
    overflow-y: hidden;
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
  width: 90%;
  transform: translate(-50%);
  border-top: 5px solid grey;
  border-bottom: 5px solid grey;
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  position: relative;
  color: black;
  font-family: 'Roboto', sans-serif;
  margin-top: 5.35svh;

  
  textarea, input, select {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 1rem;
    box-sizing: border-box;
    border: 1px solid black;
    color: black !important;
    cursor: pointer;
    border-radius: 20px;
    // background-color: #38b2ac;
    font-size: 1rem;
    height: 3.35rem;

      &::placeholder {
    color: black; 
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
    background-color: ${(props) =>
    props.checked ? '#e6e5eb !important' : ''};

}

  label {
  display: none;
  }

  button {
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid black;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 0.5rem;
  }

  .line3 {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
    width: 80%;
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

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const dayRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const timePattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log('name: ',name)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      day: selectedDate,
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();


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

  if (!displayPage) {
    return <ClipLoader color="#66FCF1" loading={true} size={150} />;
  }

  return (
    <>
      <RequestForm onSubmit={handleSubmit}>
      <h1 style={{ textAlign: "center", color: "#66FCF1", marginTop: '1rem', marginBottom: '0.5rem', color: 'black'}}>קביעת אימון קבוצתי</h1>

        <div className="line3">
        <FormItemContainer style={{flexDirection: 'row', height: '3.35rem', gap: '1rem'}}>
  <label>אימון חוזר:</label>
  <StyledCheckbox
    type="checkbox"
    name="repeatsWeekly"
    checked={formData.repeatsWeekly}
    onChange={handleChange}
  />

  <label>לכמה חודשים:</label>
  <MonthSelect
    disabled={!formData.repeatsWeekly}
    name="repeatMonth"
    value={formData.repeatsWeekly ? formData.repeatMonth : ""}
    onChange={handleChange}
    required={formData.repeatsWeekly}
    style={{width: '100%'}}
  >
    {/* Default placeholder option */}
    <option value="" disabled hidden>
      לכמה חודשים
    </option>

    {/* Options for months */}
    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
      <option key={month} value={month}>
        {month}
      </option>
    ))}
  </MonthSelect>
</FormItemContainer>
        </div>

        <div className="line3">
          <FormItemContainer>
            <label>תאריך האימון:</label>
            <input
              ref={dayRef}
              type="date"
              name="day"
              value={formData.day}
              onChange={handleDateChange}
              required
            />
          </FormItemContainer>
        </div>

        <div className="line3">
          <FormItemContainer>
            <label>שם האימון:</label>
            <input
              placeholder="שם האימון"
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
              style={{alignContent: 'center'}}
              placeholder='תיאור האימון'
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
              placeholder="שעת התחלה. דוגמא: 08:00"
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
                          placeholder="שעת סיום. דוגמא: 09:00"

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

        <button type="submit" onClick={(e)=>handleSubmit(e)}>הוסף אימון</button>
      </RequestForm>
    </>
  );
};

export default Group2;

const StyledCheckbox = styled.input`
  position: relative;
  appearance: none;
  width: 35%;
  height: 3.35rem;
  margin: 0;
  border: 2px solid #ddd;
  border-radius: 4px;
  background-color: ${(props) =>
    props.checked ? '#ccc' : props.repeatsWeekly ? '#ccc' : '#fff'};
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
box-shadow: 4px 6px 1px 1px #e6e5eb;
  }

  &:checked {
    background-color: #e6e5eb;
  }

  &::before {
    content: 'אימון חוזר';
    display: block;
    width: 6px;
    height: 12px;
    border-width: 0 2px 2px 0;
    position: absolute;
    border-color: black; /* Adjust color of the check mark */
  }
`;

const MonthSelect = styled.select`
  background-color: #e6e5eb;
  ;

`;