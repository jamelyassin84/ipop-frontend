import { stringify } from 'src/app/constants/Shortcuts'
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'arrayToValues',
})
export class ArrayToArrayValuesPipe implements PipeTransform {
	transform(value: any, ...key: any): unknown {
		return value[key]
	}
}
