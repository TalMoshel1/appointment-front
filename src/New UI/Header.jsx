import React from "react";
import styled from "styled-components";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { GrYoga } from "react-icons/gr";


const HeaderContainer = styled.header`
  display: flex;
  background-color: #00d180;
  align-items: center;
  justify-content: center;
  color: white;
  height:10svh;
  width: 100%;

  h1 { 
   font-size: 2rem;
    padding: 0;
    margin-block-start: 0em;
    margin-block-end: 0em;
    }

    @media (orientation: portrait) {
      .studio-lessons {
      margin-top: 8%
    }
    
    }

      @media (orientation: landscape) {
      .studio-lessons {
      margin-top: 3%
    }
    
    }

  
`;

const Header = (props) => {
  return (
    <HeaderContainer>
      <h1>סטודיו</h1>
      {/* <GrYoga/>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: '15svh'
        }}
      >
        <section
          style={{
            width: "50%",
            //  marginRight: '5%', 
            // marginTop: '8%',
        
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>המועדון של</h2>
            <div style={{ alignContent: "center" }}>חץ</div>
          </div>

          <div className='studio-lessons' style={{ display: "flex", justifyContent: "space-between", 
 }}>
            <h2>שיעורי סטודיו</h2>
            <div>חץ</div>
          </div>
        </section>

        <section
          className="icons"
          style={{
            height: "fit-content",
            display:'flex',
            alignItems:'center',
            height: '10svh',
            gap: '0.5rem'


          }}
        >
          <CalendarMonthIcon />
          <SearchIcon />
          <FilterAltIcon />
          <FavoriteBorderIcon />
        </section>
      </div>

      <section style={{display: 'flex', justifyContent: 'space-evenly', width: '100%', textAlign:'center' }}>
        {/* <h2 style={{boxSizing: 'border-box',borderBottom: '0.5rem solid white', fontSize: '1.2rem', width: '50%', textAlign:'center'}}>לו"ז</h2>
        <h2 style={{fontSize: '1.2rem', width: '50%'}}>ההרשמות שלי</h2> */}
      {/* </section> */} 
    </HeaderContainer>
  );
};

export default Header;
