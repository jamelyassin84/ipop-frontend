export const districts = ['I', 'II', 'III', 'IV', 'V']

export function years() {
	const tempYear: Array<number> = []
	for (let year = 2019; year <= 2100; year++) {
		tempYear.push(year)
	}
	return tempYear
}
