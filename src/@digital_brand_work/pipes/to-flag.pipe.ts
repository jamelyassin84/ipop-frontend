import {Pipe, PipeTransform} from '@angular/core'
import {pipe} from 'rxjs'

@Pipe({name: 'to_flag'})
export class ToFlagPipe implements PipeTransform {
    transform(country: string) {
        return to_flag(country)
    }
}

export function to_flag(country: string): string {
    // return `https://flagcdn.com/64x48/${country.toLocaleLowerCase()}.png`

    return `https://countryflagsapi.com/svg/${country.toLocaleLowerCase()}`
}
