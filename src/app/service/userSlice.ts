import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserState {
  
  name: string | null;
  email: string | null;
}


const initialState: UserState = {
 
  name: null,
  email: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
    clearUserInfo(state) {
      return initialState;
    },
  },
});


export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
