import React from "react"
import styled from "styled-components";


const Wrapper = styled.main`

  height: 80svh;
  overflow: hidden scroll;
  background-color: rgb(242, 241, 246);
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const FormWrapper = ({children}) => {
  return (
    <Wrapper>
        {children}
    </Wrapper>
  )
};

export default FormWrapper
