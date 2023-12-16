import { configureStore } from "@reduxjs/toolkit";
import activitiesSlice from "./activitiesSlice";
import userSlice from "./userSlice";
import tokenSlice from "./tokenSlice";
import ActivitiesForMonth from "./activitiesForMonth";

export  const store = configureStore({
  reducer: {
    user: userSlice,
    activities:activitiesSlice,
    token:tokenSlice,
    ActivitiesForMonths:ActivitiesForMonth
  },
});