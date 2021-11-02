import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import account from "./account-slice"
import notif from "./notif-slice"
import product from "./product-slice"
import mystore from "./store-slice"

export const store = configureStore({
	reducer: {
		account: account,
		notif: notif,
		product: product,
		mystore: mystore,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
