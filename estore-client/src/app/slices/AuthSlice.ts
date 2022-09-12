import { createSlice } from "@reduxjs/toolkit";
import User from "../../shared/models/UserModel";
import { RootState } from "../store";

type AuthState = { loggedUser: User };
const initialState: AuthState = { loggedUser: {} };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    },
    removeLoggedUser: (state) => {
      state.loggedUser = {};
    },
  },
});

export const { addLoggedUser, removeLoggedUser } = authSlice.actions;

export const selectLoggedUser = (state: RootState) => state.auth.loggedUser;

export default authSlice.reducer;
