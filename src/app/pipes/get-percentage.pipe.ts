import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'get_percentage' })
export class GetPercentagePipe implements PipeTransform {
	transform(municipalities: any[], value: string): number {
		let totalValue = 0

		for (let municipality of municipalities) {
			totalValue += municipality.data.total
		}

		const partialValue = municipalities.find(
			(data) => data.data.name === value
		).data.total

		if (partialValue) {
			return (100 * partialValue) / totalValue
		}

		return 0
	}
}
