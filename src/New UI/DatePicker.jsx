import React from "react"
import {Box, Typography} from '@mui/material'
import { LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs' 
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const Date = (props) => {
  return (
    <Box style={{direction: 'rtl'}}> 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker></DatePicker>
        </LocalizationProvider>

    </Box>


  )
};

export default Date;
