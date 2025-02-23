import styled from "styled-components";

export const CalendarContainer = styled.div`
    width: 100%;
    direction: rtl;


    display: flex;
    flex-direction: column;
  `;

  export const Content = styled.div`
    display: flex;
    direction: rtl;
    flex-direction: column;
    height: 73svh;
    overflow-x: none;
    overflow-y: scroll;
    gap: 1rem;
    direction: rtl;
    overflow: scroll;
    scrollbar-width: none;
    overflow: auto;

    &::-webkit-scrollbar {
      overflow: hidden;
    }

    &::-ms-scrollbar {
      display: none;
    }

    &::-webkit-scrollbar {
      width: 102px;
    }

    @media (orientation: portrait) {
      height: 73svh;
    }

    @media (orientation: landscape) {
      height: 68svh;
    }
  `;