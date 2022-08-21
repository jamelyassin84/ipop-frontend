import {countryWithDialCode} from './../constants/countries/country-with-dial-code'
import {Pipe, PipeTransform} from '@angular/core'
import {DialCode} from '../models/core.model'

@Pipe({
    name: 'appendCountryCode',
})
export class AppendCountryCodePipe implements PipeTransform {
    transform(value: string, code: string): string {
        return append_country_code(value, code)
    }
}

const countries: DialCode[] = countryWithDialCode
    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
    .reverse()

export function append_country_code(value: string, code: string): string {
    const country = countries.find((country) => code === country.code)

    return `${country?.dial_code}-${numberWithSpaces(value, '##-###-####')}`
}

function numberWithSpaces(value: any, pattern: any) {
    let i = 0
    const phone = value.toString()
    return pattern.replace(/#/g, () => phone[i++])
}
