export const nullOrZero = (val: number) => val == null || val === 0
export const nullOrZeroStr = (val: string) => val == null || val === "0"
export const nullOrEmpty = (val: string) => val == null || val.trim() === ""
export const validEmail = (val: string) =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(val)
export const validPhone = (val: string) => /^9[0-9]{8}$/i.test(val)
export const validNumber = (val: string, num: number) =>
	new RegExp(`^[0-9]{${num}}$`, "i").test(val)
export const validName = (val: string) => /^[a-zñáéíóú ]+$/i.test(val)
export const numberBetween = (val: string, min: number, max: number) => {
	const num = parseInt(val)
	return num <= max && num >= min
}
