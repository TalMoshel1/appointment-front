import React from "react"
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StyledBox } from "../pages//Private2.jsx";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { repeatEndDate } from "../functions/repeatEndDate.js";

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
    background-color: #e6e5eb;
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    cursor: pointer;
    color: black !important;

       &:hover {
    background-color: #A0A0A0	;}
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
    border-radius: 20px;
    cursor: pointer;
    // background-color: #e6e5eb !important;
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
    // color: grey;
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
    font-size: 1rem !important;
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
    font-size: 1rem !important;
    // border: 1px solid black;
    border-radius: 20px;
    cursor: pointer;
    background-color: #F0F0F0 !important;
    color: black !important;
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

const GroupRequestForm = ({ 
    monthRef, 
    formData, 
    handleChange, 
    handleSubmit, 
    handleDateChange,
    dayjs 
  }) => {

    const timePattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

    
  return (
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
              cursor: formData.repeatsWeekly ? "pointer" : "not-allowed", 
              backgroundColor: formData.repeatsWeekly
                ? "#e6e5eb"
                : "#f0f0f0", 
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
                <span style={{ color: "grey", fontSize: '1rem'}}>לכמה חודשים</span>
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
                    {...params}
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
        <input
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

    <button type="submit" onClick={(e) => handleSubmit(e)} style={{border: 'none'}}>
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
  )
};

export default GroupRequestForm;
