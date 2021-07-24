export function parse(data: any) {
	return JSON.parse(data)
}
export function stringify(data: any) {
	return JSON.stringify(data)
}

export function getPercent(value: number, basis: number) {
	return (value * 100) / basis
}
