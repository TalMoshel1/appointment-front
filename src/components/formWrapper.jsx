import React from "react"
import { Wrapper } from "./FormWrapper/Wrapper";

const FormWrapper = ({children}) => {
  return (
    <Wrapper>
        {children}
    </Wrapper>
  )
};

export default FormWrapper;
