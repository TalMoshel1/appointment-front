import React from "react"
import styled from "styled-components";


const Container = styled.main`

  height: 90svh;
  overflow: hidden scroll;
  background-color: rgb(242, 241, 246);
  display: flex;
    flex-direction: column;
    justify-content: center;
`
const FormContainer = ({children}) => {
  return (
    <Container>
        {children}
    </Container>
  )
};

export default FormContainer;
