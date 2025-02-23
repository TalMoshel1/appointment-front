import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { MainHome } from "./styledComponents/Home";


const Home = () => {

  const navigate = useNavigate();

  return (
    <MainHome>
      <section onClick={()=>{navigate('/calendar')}}>
        <h2 style={{color: '#66FCF1'}}>לוח שעות</h2>
        <CalendarMonthIcon className="icon" style={{fill:'#66FCF1'}}/>
      </section>
      <section onClick={()=>{navigate('/requestPrivte')}} >
        <h2 style={{color: '#66FCF1'}}>אימונים אישיים</h2>
        <ListAltIcon className="icon"  style={{fill:'#66FCF1'}}/>
      </section>

    </MainHome>
  );
};

export default Home;
