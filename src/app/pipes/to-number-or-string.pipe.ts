import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'is_number'})
export class isNumberPipe implements PipeTransform {
    transform(value: string | number): boolean {
        return is_number(value)
    }
}

export function is_number(value: string | number): boolean {
    if (typeof value === 'string') {
        return false
    }
    return true
}
