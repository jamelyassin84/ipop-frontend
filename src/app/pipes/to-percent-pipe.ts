import {Pipe, PipeTransform} from '@angular/core'
import {LocationFIlter} from '../app-core/models/location-filter.model'

@Pipe({name: 'to_percent'})
export class ToPercentPipe implements PipeTransform {
    transform(value: number, basis: number): number {
        return (value * 100) / basis
    }
}

export function to_percent(value: number, basis: number): number {
    return (value * 100) / basis
}
