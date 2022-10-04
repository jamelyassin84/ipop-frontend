import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'to_trd_substitute'})
export class ToTRDSubstitutePipe implements PipeTransform {
    transform(value: string): string {
        return to_trd_substitute(value)
    }
}

export function to_trd_substitute(value: string): string {
    if (
        value.toLocaleLowerCase() ===
        'TRAINING AND RESEARCH DIVISION'.toLocaleLowerCase()
    ) {
        return 'Development Management Division'
    }

    return value
}
