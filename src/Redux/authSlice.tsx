import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { user } from "../shared/types";

interface AuthState {
	user: user | null;
}

const userFromLocalStorage = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user"))
	: null;
const initialState: AuthState = {
	user: userFromLocalStorage || null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<user>) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
			localStorage.setItem("token", null);
			localStorage.setItem("user", null);
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
