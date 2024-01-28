import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { user } from "../shared/types";

interface AuthState {
	user: user | null;
}

const initialState: AuthState = {
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<user>) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = initialState.user;
			localStorage.setItem("token", null);
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
