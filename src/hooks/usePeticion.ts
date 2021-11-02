import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import { notifActions } from "../redux/notif-slice"
import { useAppDispatch } from "./hooks"

export const useLoading: () => [
	boolean,
	(action: () => Promise<void>) => Promise<void>
] = () => {
	const [loading, setLoading] = useState(false)
	const history = useHistory()
	const dispatch = useAppDispatch()
	const performAsync = useCallback(
		async (action: () => Promise<void>) => {
			try {
				setLoading(true)
				await action()
				setLoading(false)
			} catch (error: any) {
				setLoading(false)
				if (error.message === "401") {
					history.replace(`/login/notfound`)
					dispatch(
						notifActions.notify({
							mensaje:
								"No está autorizado para realizar esta operación, o su sesión ha expirado, vuelva a loguearse.",
						})
					)
				} else if (error.message === "403") {
					dispatch(
						notifActions.notify({
							mensaje:
								"No tiene los permisos para realizar esta operación.",
						})
					)
				} else {
					console.log(error)
					dispatch(notifActions.notify({ mensaje: error.message }))
				}
			}
		},
		[dispatch, history]
	)
	return [loading, performAsync]
}
