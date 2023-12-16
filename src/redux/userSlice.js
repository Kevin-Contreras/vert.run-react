import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 dataUser:{}
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const data  = action.payload;
      state.dataUser = data;
      
    },
 
  },
});
export const {addUser } = userSlice.actions
export default userSlice.reducer;