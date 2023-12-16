
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 ActivitiesForMonth:[]
};

export const activitiesForMonth = createSlice({
    name: "activitiesForMonth",
    initialState,
    reducers: {
      addActivitiesForMonth: (state, action) => {
        const activities  = action.payload;
        console.log(activities)
        state.ActivitiesForMonth = activities;
        
      },
   
    },
  });
  export const { addActivitiesForMonth } = activitiesForMonth.actions;
  export default activitiesForMonth.reducer
