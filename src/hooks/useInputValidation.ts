import { useEffect, useState } from "react"

export const useInputValidation: (
	props: any
) => [boolean, string, React.Dispatch<React.SetStateAction<boolean>>] = (
	props: any
) => {
	const [touched, setTouched] = useState(false)
	const [valid, setValid] = useState(true)
	const [message, setMessage] = useState("")
	useEffect(() => {
		if (props.reset && props.rules) {
			setValid(true)
			setMessage("")
			setTouched(false)
		}
	}, [props.reset, props.rules])
	useEffect(() => {
		let timer: any = null
		if (touched && props.rules) {
			timer = setTimeout(() => {
				let isvalid = true
				let msg = ""
				for (const r of props.rules ?? []) {
					if (!r.test(props.value)) {
						isvalid = false
						msg = r.message
						break
					}
				}
				setValid(isvalid)
				setMessage(msg)
			}, 300)
		}
		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [touched, props.value, props.rules])
	return [valid, message, setTouched]
}
