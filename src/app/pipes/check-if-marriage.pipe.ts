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

    const excludeAges = ['15-19', 'Below 1 Year Old', '1-4', '5-9', '10-14']

    return data.filter(
        (value: any) => !excludeAges.some((age) => age === value.ageGroup),
    )
}
