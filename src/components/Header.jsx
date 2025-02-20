import React from "react";
import styled from "styled-components";


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
    </HeaderContainer>
  );
};

export default Header;
