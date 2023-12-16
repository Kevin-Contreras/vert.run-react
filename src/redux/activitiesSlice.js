
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 activities:[]
};

export const activitiesSlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
      addActivities: (state, action) => {
        const activities  = action.payload;
        state.activities = activities;
        
      },
   
    },
  });
  export const { addActivities } = activitiesSlice.actions;
  export default activitiesSlice.reducer
