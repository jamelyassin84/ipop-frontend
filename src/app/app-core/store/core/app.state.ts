import {EntityState} from '@ngrx/entity'
import {LocationFIlter} from '../ngrx/locatition-filter/location-filter.model'

export interface AppState {
    locationFilters: EntityState<LocationFIlter>
}
