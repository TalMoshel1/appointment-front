import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Calendar from "./pages/Calendar";
import DeleteLesson from "./containers/deleteLesson";
import DetailsLesson from "./containers/detailsLesson";
import Modal from "./containers/Modal.jsx";
import SignIn from "./pages/SignIn";
import ApproveLink from "./pages/ApprovalLink";
import "./App.css";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar.jsx";
import styled from "styled-components";
import DateSliderDays from "./containers/DateSliderDays";
import DateSliderWeeks from "./components/DateSliderWeeks";
import Private2 from "./pages/Private";
import Header from "./components/Header";
import FormWrapper from "./components/formWrapper.jsx";


export function AppContent() {
    const [isMenuOpen, toggleMenu] = useState(false);
  
    const handleToggleMenu = () => {
      toggleMenu(!isMenuOpen);
    };
  
    const isDeleteLessonModalOpen = useSelector(
      (state) => state.calendar.isDeleteLessonModalOpen
    );
  
    const isDetailsLessonModalOpen = useSelector(
      (state) => state.calendar.isDetailsLessonModalOpen
    );
  
    return (
      <VerticalContainer>
        <Header />
        <Navbar isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />
  
        {isDeleteLessonModalOpen && (
          <Modal type="delete">
            <DeleteLesson />
          </Modal>
        )}
  
        {isDetailsLessonModalOpen && (
          <Modal type="details">
            <DetailsLesson />
          </Modal>
        )}
  
        <Routes>
          {/* Default route should now redirect to calendar */}
          <Route path="/" element={<Navigate to="/calendar" replace />} />
          <Route
            path="/calendar"
            element={
              <StyledDisabledWrapper
                isDisabled={isDeleteLessonModalOpen || isDetailsLessonModalOpen}
              >
                <Calendar />
              </StyledDisabledWrapper>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/approveLink/:lessonId" element={<ApproveLink />} />
          <Route
            path="/requestPrivte"
            element={
              <FormWrapper>
                <Private2 />
              </FormWrapper>
            }
          />
          <Route path="/datesliderdays" element={<DateSliderDays />} />
          <Route path="/datesliderweeks" element={<DateSliderWeeks />} />
  
          <Route path="*" element={<Navigate to="/calendar" replace />} />
        </Routes>
      </VerticalContainer>
    );
  }
  
  export const DisabledWrapper = ({ isDisabled, children, ...props }) => (
    <div {...props}>{children}</div>
  );
  
  export const StyledDisabledWrapper = styled(DisabledWrapper)`
    ${({ isDisabled }) =>
      isDisabled &&
      `
      opacity: 0.5;
      pointer-events: none;
      width: 100vw;
    `}
  `;
  
  const VerticalContainer = styled.div`
    flex: 1;
    display: flex;
    max-width: 100vw;
    flex-direction: column;
    min-height: 100svh;
    overflow: hidden;
  `;
  