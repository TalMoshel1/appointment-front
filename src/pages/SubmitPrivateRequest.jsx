import React, { useState } from "react"
import styled from "styled-components";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { incrementHour } from "../functions/incrementHour.js";
import { openWhatsApp } from "../functions/sendWhatsApp.js";
import { useSelector } from "react-redux";





const SubmitPrivateRequest = ({step, previous, body}) => {

  const [message, setMessage] = useState("");

  const trainerPhone = useSelector((state) => state.calendar.trainerPhone);



  const sendPostPrivateRequest = async () => {
    try {
      const endTime = incrementHour(body.startTime);
      let data = {...body}
      data.endTime = endTime
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/lessons/requestPrivateLesson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const res = await response.json();

      openWhatsApp(res, `${trainerPhone}`, "coach");

      setMessage("אימון נשלח לאישור מאמן");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };


    const Container = styled.main`
    @media (orientation: portrait) {
        width: 90%;

    }

        @media (orientation: portrait) {
        // width: 45%;

    }

    position: relative;
    // border: 1px solid white;
    border-radius: 20px;
    overflow:hidden;
    .whatsapp {
    height: 100%;
    }
    `
  return (
    <Container className='submitRequestContainer'>
            <div
              className="arrowRight"
              style={{ position: "absolute", right: "0", zIndex: 2, height:'100%', top:'0.3rem', cursor: 'pointer' }}
              onClick={previous}
            >
              <KeyboardArrowRightIcon />
              
            </div>
    <section
          className="whatsapp"
          style={{
            background:
              "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            justifyContent: 'center'
          }}
        >
          <WhatsAppIcon
            style={{
              color: "green",
              transform: "scale(2)",
              position: "relative",
              top: "0.5rem",
            }}
          />
          <p
            style={{
              paddingLeft: "1rem",
              paddingRight: "1rem",
              lineHeight: "1rem",
            }}
          >
            <br /> לאחר הלחיצה על{" "}
            <button disabled style={{ pointerEvents: "none" }}>
              שלח
            </button>{" "}
            אנא אשר שימוש ב WhatsApp ושלח את ההודעה האוטומטית שתראה למאמן שבחרת.
          </p>

          <button type="submit" onClick={sendPostPrivateRequest}>שלח</button>

        </section>
    </Container>

  )
};

export default SubmitPrivateRequest;
