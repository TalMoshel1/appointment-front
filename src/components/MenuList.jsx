import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Item = styled.li`
  border-top: 1px solid grey !important;
  color: black;
  background-color: #ffffff;
  width: 25%;
  flex-grow:1;
  padding: 2rem;
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  height: 100%;

  ${({ isActive }) =>
    isActive &&
    `
    border-top: 1px solid #00d180 !important;
    color: #00d180;

    h2 {
      color: #00d180;
    }
  `}

  &:hover, &:active {
    border-top: 1px solid #00d180 !important;

    h2 {
      color: #00d180;
    }
  }

  h2 {
    padding: 1rem;
    color: inherit;
  }

  @media (orientation: landscape) {
    width: 25%;
  }

  @media (orientation: portrait) {
    width: max-content;
  }

  h2 {
    all: unset;
  }
`;

const MenuList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle navigation
  const handleClick = (endpoint) => {
    navigate(`/${endpoint}`);
  };

  // Determine the active URL for each item
  const isCalendarActive = location.pathname.endsWith("/calendar");
  const isRequestPrivateActive = location.pathname.endsWith("/requestPrivte");
  const isHomeActive = location.pathname === "/";
  const isSetGroupLessonActive = location.pathname.endsWith("/setgrouplesson");

  return (
    <StyledMenuList>
      <Item onClick={() => handleClick("calendar")} isActive={isCalendarActive}>
        <h2 style={{ fontSize: "1rem" }}>מערכת שעות</h2>
      </Item>
      <Item onClick={() => handleClick("requestPrivte")} isActive={isRequestPrivateActive}>
        <h2 style={{ fontSize: "1rem", padding: "1rem", flexGrow: '1' }}>
          בקש לקבוע שיעור פרטי
        </h2>
      </Item>
      <Item onClick={() => handleClick("")} isActive={isHomeActive}>
        <h2 style={{ fontSize: "1rem", padding: "1rem" }}>דף הבית</h2>
      </Item>
      <Item onClick={() => handleClick("setgrouplesson")} isActive={isSetGroupLessonActive}>
        <h2 style={{ fontSize: "1rem", padding: "1rem" }}>ניהול</h2>
      </Item>
    </StyledMenuList>
  );
};

const StyledMenuList = styled(motion.ul)`
  background-color: #ffffff;
  width: 100vw;
  height: 10svh;
  display: flex;
  align-items: center;
  justify-content:center;
  z-index: 1;
  overflow-y: auto;
  position: absolute;
  bottom: 0px;
  padding-inline-start: 0px !important;
  margin-block-start: 0em !important;
  margin-block-end: 0em !important;
`;

export default MenuList;
