import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Calendar from "./pages/Calendar";
import DeleteLesson from "./containers/deleteLesson";
import DetailsLesson from "./containers/detailsLesson";
import Modal from "./containers/Modal.jsx";
import SignIn from "./pages/SignIn";
import ApproveLink from "./pages/ApprovalLink";
import "./App.css";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar.jsx";
import { MenuProvider } from "./context/Menu.jsx";
import styled from "styled-components";
import DateSliderDays from "./containers/DateSliderDays";
import DateSliderWeeks from "./components/DateSliderWeeks";
import Private2 from "./pages/Private2";
import Header from "./components/Header";
import FormWrapper from "./components/formWrapper.jsx";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { AppContent } from "./AppContent.js";


function App() {
  const theme = useSelector((state) => state.theme);
  const queryClient = new QueryClient()


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>

        {/* <MenuProvider> */}
          <AppContent />
        {/* </MenuProvider> */}
        </QueryClientProvider>

      </ThemeProvider>
    </BrowserRouter>
  );
}



export default App;
