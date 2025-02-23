import styled from "styled-components";

export const LoginContainer = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  direction: rtl;

  form {
    border: 1px solid grey;
    border-radius: 20px;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;

  }

  h2 {
    margin-block-start: 0em;
    margin-block-end: 0.41rem;


  }

  input {
    background-color: #00d180;
    width: 9rem;
    padding-right: 1rem;
    height: 2.35rem;
    border: none;
    border-radius: 20px;
    font-size: 1rem;
    direction:rtl;
  }



  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.41rem;
    margin-bottom: 0.41rem;
  }

  button {
    font-size: 1rem;
    height: 2.35rem;
     border-radius: 20px;
    background-color: #e6e5eb !important;
    color: black !important;
  }

  label {
  font-size:1.25rem;
  }
`;