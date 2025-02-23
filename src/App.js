import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContent } from "./AppContent.js";


function App() {
  const theme = useSelector((state) => state.theme);
  const queryClient = new QueryClient()

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>

      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
