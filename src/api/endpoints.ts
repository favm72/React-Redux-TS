import { Method } from "axios"

export const baseURL = "https://localhost:44373/"

export interface IEndpoint {
	method: Method
	url: string
}

export const ACCOUNT_LOGIN: IEndpoint = { method: "POST", url: "account/login" }

export const PRODUCT_LIST: IEndpoint = { method: "GET", url: "product" }
export const PRODUCT_FIND: (id: number) => IEndpoint = (id: number) => ({
	method: "GET",
	url: `product/${id}`,
})
export const PRODUCT_INSERT: IEndpoint = { method: "POST", url: "product" }
export const PRODUCT_UPDATE: IEndpoint = { method: "PATCH", url: "product" }
export const PRODUCT_DELETE: (id: number) => IEndpoint = (id: number) => ({
	method: "DELETE",
	url: `product/${id}`,
})

export const STORE_LIST: IEndpoint = { method: "GET", url: "store" }
export const STORE_FIND: (id: number) => IEndpoint = (id: number) => ({
	method: "GET",
	url: `store/${id}`,
})
export const STORE_INSERT: IEndpoint = { method: "POST", url: "store" }
export const STORE_UPDATE: IEndpoint = { method: "PATCH", url: "store" }
export const STORE_DELETE: (id: number) => IEndpoint = (id: number) => ({
	method: "DELETE",
	url: `store/${id}`,
})
