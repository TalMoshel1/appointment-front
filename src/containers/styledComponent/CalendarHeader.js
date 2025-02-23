import styled from "styled-components";

export const Header = styled.header`
  background-color: #fbfbfb;
  color: #778899;
  direction: rtl;
  display: flex;
  align-items: center;

  @media (orientation: portrait) {
    gap: 0.75rem;
    direction: rtl;
    justify-content: center;
    padding: 0.5rem;
    z-index: 2;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  @media (orientation: landscape) {
    justify-content: space-evenly;
    height: 5rem;
  }

  @media (orientation: portrait) {
    height: fit-content;
  }
  // .viewController {
  //   background-color: white;
  //   z-index: 2;
  // }

  select {
    background-color: #2c3e50;
    color: #ededed;
    border: 2px solid #66fcf1;
    border-radius: 5px;
    padding: 0.5rem;
    appearance: none;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    font-size: 1rem;
    outline: none;
    position: relative;
    text-align: center;
  }

  select:hover,
  select:focus {
    background-color: #34495e;
    border-color: #38b2ac;
  }

  select::after {
    content: "▼";
    position: absolute;
    right: 10px;
    pointer-events: none;
    color: #ededed;
  }

  option {
    text-align: center;
    background-color: #2c3e50;
    color: #ededed;
  }

  option:hover {
    // background-color: #2E4053;
    background-color: red;
  }
`;