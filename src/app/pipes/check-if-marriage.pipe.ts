import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'check_if_marriage', pure: true})
export class CheckIfMarriagePipe implements PipeTransform {
    transform<T>(data: T[], type: string): T[] {
        return check_if_marriage(data, type)
    }
}

export function check_if_marriage<T>(data: T[], type: string): T[] {
    if (type !== 'Marriage') {
        return data
    }
    return data.filter((value: any) => value.ageGroup !== '15-19')
}
