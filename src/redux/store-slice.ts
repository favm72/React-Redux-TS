import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
	STORE_FIND,
	STORE_INSERT,
	STORE_LIST,
	STORE_UPDATE,
	STORE_DELETE,
} from "../api/endpoints"
import { httpUtil } from "../api/httputil"

const getAll = createAsyncThunk(STORE_LIST.url, async () => {
	return await httpUtil(STORE_LIST.method, STORE_LIST.url, {})
})
const findById = createAsyncThunk(STORE_FIND(0).url, async (id: number) => {
	return await httpUtil(STORE_FIND(id).method, STORE_FIND(id).url, {})
})
const insert = createAsyncThunk(STORE_INSERT.url, async (model: any) => {
	return await httpUtil(STORE_INSERT.method, STORE_INSERT.url, model)
})
const update = createAsyncThunk(STORE_UPDATE.url, async (model: any) => {
	return await httpUtil(STORE_UPDATE.method, STORE_UPDATE.url, model)
})
const remove = createAsyncThunk(STORE_DELETE(0).url, async (id: number) => {
	return await httpUtil(STORE_DELETE(id).method, STORE_DELETE(id).url, {})
})

export interface MyStoreModel {
	id: number
	name: string
	image: string
	address: string
}

export interface mystoreState {
	stores: MyStoreModel[]
	currentStore: MyStoreModel | null
}

const initialState: mystoreState = {
	stores: [],
	currentStore: null,
}

export const mystoreSlice = createSlice({
	name: "mystore",
	initialState,
	reducers: {
		setCurrent: (state, action) => {
			state.currentStore = action.payload
		},
		reset: () => initialState,
	},
	extraReducers: {
		[getAll.fulfilled.toString()]: (
			state: mystoreState,
			action: { payload: MyStoreModel[] }
		) => {
			state.stores = action.payload
		},
	},
})

export const mystoreThunks = { getAll, findById, insert, update, remove }
export const mystoreActions = mystoreSlice.actions
export const selectMystore = (state: any) => state.mystore

export default mystoreSlice.reducer
