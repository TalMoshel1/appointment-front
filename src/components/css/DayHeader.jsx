import styled from "styled-components";

export const DayHeader = styled.div`
padding-left: 0.5rem;
padding-right: 0.5rem;
color: ${(props) => props.theme.calendarHeaderColor};
height: fit-content !important;

h1 {
  font-size: 1rem;
}

.date {
  background-color: ${(props) =>
    props.isToday ? props.isToday : props.isSelected ? "#00d180" : "none"};
  border-radius: 20px;
  width: 2rem;
  height: 2rem;
  align-content: center;
}
`;