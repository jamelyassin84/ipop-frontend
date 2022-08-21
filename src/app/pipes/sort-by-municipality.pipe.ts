import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'sort_by_municipality'})
export class SortByMunicipalityPipe implements PipeTransform {
    transform(municipalities: any[]): any[] {
        return municipalities.sort((a: any, b: any) => {
            return b.data.total - a.data.total
        })
    }
}
