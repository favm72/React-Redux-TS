import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
	PRODUCT_FIND,
	PRODUCT_INSERT,
	PRODUCT_LIST,
	PRODUCT_UPDATE,
	PRODUCT_DELETE,
} from "../api/endpoints"
import { httpUtil } from "../api/httputil"

const getAll = createAsyncThunk(PRODUCT_LIST.url, async () => {
	return await httpUtil(PRODUCT_LIST.method, PRODUCT_LIST.url, {})
})
const findById = createAsyncThunk(PRODUCT_FIND(0).url, async (id: number) => {
	return await httpUtil(PRODUCT_FIND(id).method, PRODUCT_FIND(id).url, {})
})
const insert = createAsyncThunk(PRODUCT_INSERT.url, async (model: any) => {
	return await httpUtil(PRODUCT_INSERT.method, PRODUCT_INSERT.url, model)
})
const update = createAsyncThunk(PRODUCT_UPDATE.url, async (model: any) => {
	return await httpUtil(PRODUCT_UPDATE.method, PRODUCT_UPDATE.url, model)
})
const remove = createAsyncThunk(PRODUCT_DELETE(0).url, async (id: number) => {
	return await httpUtil(PRODUCT_DELETE(id).method, PRODUCT_DELETE(id).url, {})
})

export interface ProductModel {
	id: number
	name: string
	price: number
	description: string
	discount: number
	image: string
	provider: string
	category: string
}

export interface productState {
	products: ProductModel[]
	currentProduct: ProductModel | null
}

const initialState: productState = {
	products: [],
	currentProduct: null,
}

export const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setCurrent: (state, action) => {
			state.currentProduct = action.payload
		},
		reset: () => initialState,
	},
	extraReducers: {
		[getAll.fulfilled.toString()]: (
			state: productState,
			action: { payload: ProductModel[] }
		) => {
			state.products = action.payload
		},
	},
})

export const productThunks = { getAll, findById, insert, update, remove }
export const productActions = productSlice.actions
export const selectProduct = (state: any) => state.product

export default productSlice.reducer
