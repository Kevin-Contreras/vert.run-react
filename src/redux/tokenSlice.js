
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 token:null,
 refresh_token:null
};

export const tokesSlice = createSlice({
    name: "tokens",
    initialState,
    reducers: {
      addTokens: (state, action) => {
        const {token,refresh_token}  = action.payload;

        state.token = token;
        state.refresh_token = refresh_token
        
      },
   
    },
  });
  export const { addTokens } = tokesSlice.actions;
  export default tokesSlice.reducer
