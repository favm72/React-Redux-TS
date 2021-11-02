import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ACCOUNT_LOGIN } from "../api/endpoints"
import { httpUtil } from "../api/httputil"
import { AppDispatch } from "./store"

const login = createAsyncThunk(ACCOUNT_LOGIN.url, async (model: any) => {
	return await httpUtil(ACCOUNT_LOGIN.method, ACCOUNT_LOGIN.url, model)
})

export interface UserData {
	id: number
	fullName: string
	token: string
}

export interface accountState {
	token: string
	userData: UserData | null
	logged: boolean
}

const initialState: accountState = {
	token: "",
	userData: null,
	logged: false,
}

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		autoLogin: state => {
			try {
				state.token = localStorage.getItem("token") ?? ""
				state.userData = JSON.parse(localStorage.getItem("acc") ?? "{}")
				state.logged = true
			} catch (error) {
				state.token = ""
				state.userData = null
				state.logged = false
			}
		},
		reset: state => initialState,
	},
	extraReducers: {
		[login.fulfilled.toString()]: (
			state: accountState,
			action: { payload: UserData }
		) => {
			state.logged = true
			state.token = action.payload.token
			state.userData = action.payload
			localStorage.setItem("token", action.payload.token)
			localStorage.setItem("acc", JSON.stringify(action.payload))
		},
	},
})

export const accountThunks = { login }
export const accountActions = accountSlice.actions
export const selectAccount = (state: any) => state.account

export const logout = () => (dispatch: AppDispatch, getState: any) => {
	localStorage.removeItem("token")
	localStorage.removeItem("acc")
	dispatch(accountActions.reset())
}

export default accountSlice.reducer
