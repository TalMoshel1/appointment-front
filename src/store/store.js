import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice.js";
import themeReducer from "./themeSlice.js";
import menuReducer from "./menuReducer.js";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    theme: themeReducer,
    menu: menuReducer,
  },
});

export default store;
