import {Pipe, PipeTransform} from '@angular/core'
import * as dayjs from 'dayjs'

@Pipe({
    name: 'age',
})
export class AgePipe implements PipeTransform {
    transform(value: Date): string {
        return age(value)
    }
}

export function age(value: Date): string {
    const today = dayjs()

    const birthDate = dayjs(value)

    const years = today.diff(birthDate, 'years')

    return `${years} Yrs`
}
