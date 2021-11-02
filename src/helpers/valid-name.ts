export const keyDownValidName = (e: KeyboardEvent) => {
	if (e.key === "a" && e.ctrlKey === true) return
	if (e.key === "c" && e.ctrlKey === true) return
	if (e.key === "v" && e.ctrlKey === true) return
	if (e.key === "x" && e.ctrlKey === true) return
	//console.log(e.key);
	if (
		[
			"Backspace",
			"Delete",
			"ArrowLeft",
			"ArrowRight",
			"ArrowUp",
			"ArrowDown",
			"Tab",
		].includes(e.key)
	) {
		return
	}
	if (/^[a-zñáéíóú ]*$/i.test(e.key)) return
	else e.preventDefault()
}
