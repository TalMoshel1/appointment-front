export const MainHome = styled.main`

  height: calc(100svh - 5rem);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size:0.8rem;

  h2 { 
  text-align: center;
  }
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    border:1px solid black;
    border-radius: 12px;
    width:8rem;
    height: 10rem;

    &:hover {
      transform: scale(1.1);
    }



  }
`;