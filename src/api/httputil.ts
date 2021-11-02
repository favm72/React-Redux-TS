import axios, { Method } from "axios"
import { baseURL } from "../api/endpoints"

export const httpUtil = async (
	method: Method,
	endpoint: string,
	model: any
) => {
	let token = localStorage.getItem("token")
	axios.defaults.headers.common["Authorization"] = token
		? `Bearer ${token}`
		: ""
	try {
		console.log({ method, endpoint })
		const response = await axios.request({
			method: method,
			url: `${baseURL}${endpoint}`,
			data: model,
		})
		const data = response.data
		if (!data.status) throw new Error(data.message)
		return data.data
	} catch (error: any) {
		const err = error.response
		if (err?.status === 401) {
			throw new Error("401")
		} else if (err?.status === 403) {
			throw new Error("403")
		} else {
			throw error
		}
	}
}
