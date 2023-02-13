export function formatTime() {
	const date = new Date();
	const month = date.getMonth() + 1
	
	return `${date.getFullYear()}-${month}-${date.getDate()}`
}