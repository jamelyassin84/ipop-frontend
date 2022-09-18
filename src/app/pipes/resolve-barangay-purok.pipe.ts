import {empty} from 'src/@digital_brand_work/pipes/is-empty.pipe'
import {LocationFIlter} from './../app-core/store/ngrx/locatition-filter/location-filter.model'
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'resolve_barangay_purok', pure: true})
export class ResolveBarangayPurokPipe implements PipeTransform {
    transform(location: LocationFIlter): 'Purok' | 'Barangay' {
        return resolve_barangay_purok(location)
    }
}

export function resolve_barangay_purok(
    location: LocationFIlter,
): 'Purok' | 'Barangay' {
    if (!empty(location.barangay)) {
        return 'Purok'
    }
    return 'Barangay'
}
