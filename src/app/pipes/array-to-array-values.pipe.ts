import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'arrayToValues',
})
export class ArrayToArrayValuesPipe implements PipeTransform {
    transform(value: any, ...key: any): string | number {
        return value[key]
    }
}
