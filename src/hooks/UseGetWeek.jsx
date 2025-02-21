import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useMutation } from 'react-query';
import { useState } from 'react';

const useGetWeek = () => {
    
    const currentDateStr = useSelector((state) => state.calendar.currentDate);
    const currentDate = new Date(currentDateStr);

    const mutation = useMutation(
        async (date) => {
          const response = await fetch('https://appointment-back-qd2z.onrender.com/api/lessons/week ', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              startOfWeek: new Date(date),
            })
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        }
      );

    useEffect(() => {
        mutation.mutate(currentDate); 
      }, [currentDate, mutation.mutate]);
  
  return (
    <div>
      
    </div>
  )
};

export default useGetWeek;
