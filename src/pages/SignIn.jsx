import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { setTrainerPhone } from "../redux/calendarSlice";
import { LoginContainer } from "./styledComponents/SignIn.jsx";
import Joyride from "react-joyride";

const SignIn = () => {
  const [boxing, setBoxing] = useState(localStorage.getItem("boxing"));
  const trainerPhone = useSelector((state) => state.calendar.trainerPhone);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [runTour, setRunTour] = useState(true); 

  const steps = [
    {
      target: '.input-group', 
      content: '.דף זה אינו קיים באתר המקורי כיוון שאין בו הרשאת מנהל והוא מיועד ללקוחות בלבד. כאן יש כדי להתנסות באישור בקשות אימונים של לקוחות בווצאפ',
      disableBeacon: true
    }
  ];


  const sendPostRequest = async () => {
    setLoading(true);
    dispatch(setTrainerPhone(phone));
    setLoading(false);
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendPostRequest();
  };

  const authenticateRequest = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(boxing)?.token;
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
      setLoading(false);
      if (data.message === "Token is valid") {
        if (location.state?.state && trainerPhone !== "") {
          navigate(location.state?.state);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error verifying token:", error);
    }
  };

  useEffect(() => {
    if (trainerPhone) {
      navigate(location.state?.state);
    }
  }, [trainerPhone]);

  return <>
      <LoginContainer className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="phone">מספר טלפון אליו תשלח הבקשה</label>
          <input
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ width: "fit-content", border: 'none',paddingRight:'0.5rem',paddingLeft:'0.5rem' }}>
          {loading ? <ClipLoader size={9} /> : "סיום"}
        </button>
      </form>
    </LoginContainer>
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

};

export default SignIn;
