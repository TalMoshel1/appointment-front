import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
import { setTrainerPhone } from "../redux/calendarSlice";

const LoginContainer = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  direction: rtl;

  .input-group {
    padding-bottom: 1rem;
  }
`;

const SignIn = () => {
  const [boxing, setBoxing] = useState(localStorage.getItem("boxing"));
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location)




  const sendPostRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://appointment-back-qd2z.onrender.com/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: "demouser@gmail.com", password: "987687765" }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      localStorage.setItem(
        "boxing",
        JSON.stringify({ token: data.data.token, user: data.data.user })
      );
      setBoxing(
        JSON.stringify({ token: data.data.token, user: data.data.user })
      );
      dispatch(setTrainerPhone(phone))
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error sending POST request:", error);
    }
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
        navigate(location.state.state);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error verifying token:", error);
    }
  };

  useEffect(() => {
    if (boxing) {
      authenticateRequest();
    }
  }, [boxing]);

  return (
    <LoginContainer className="login-container">
      <h2>הכנס כמנהל</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="phone">טלפון</label>
          <input
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {loading === true && <ClipLoader />}
    </LoginContainer>
  );
};

export default SignIn;
