import { createSlice } from "@reduxjs/toolkit"

export interface notifState {
	visible: boolean
	title: string
	message: string
}

const initialState: notifState = {
	visible: false,
	title: "Alerta",
	message: "",
}

export const notifSlice = createSlice({
	name: "notif",
	initialState,
	reducers: {
		notify: (state: notifState, action: any) => {
			state.title = action.payload.title ?? "Alerta"
			state.message = action.payload.message ?? ""
			state.visible = true
		},
		cerrar: state => {
			state.visible = false
		},
	},
	extraReducers: {},
})

export const notifActions = notifSlice.actions
export const selectNotif = (state: any) => state.notif
export default notifSlice.reducer
