import { inittialUserState } from "../Types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: inittialUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  //プロパティーと変数名が同じであれば二つ書く必要はない（initialState）
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
console.log(userSlice);

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
