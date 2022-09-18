import {Pipe, PipeTransform} from '@angular/core'
import {LocationFIlter} from '../app-core/models/location-filter.model'

@Pipe({name: 'sort_by_municipality'})
export class SortByMunicipalityPipe implements PipeTransform {
    transform(municipalities: any[], location: LocationFIlter): any[] {
        return municipalities
            .filter((municipality) => municipality.data.year === location.year)
            .sort((a: any, b: any) => {
                return b.data.total - a.data.total
            })
            .slice(0, 10)
    }
}
