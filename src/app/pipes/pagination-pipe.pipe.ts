import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'paginationPipe',
})
export class PaginationPipePipe implements PipeTransform {
	transform(value: any, ...args: unknown[]): any {
		let array = value.split(' ')
		for (let index of array) {
			if (index.indexOf('&')) {
				return index
			}
		}
	}
}
