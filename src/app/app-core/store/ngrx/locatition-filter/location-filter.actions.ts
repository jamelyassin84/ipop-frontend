import {createAction, props} from '@ngrx/store'
import {LocationFIlter} from './location-filter.model'

export const upsert = createAction(
    '[LocationFilter/API] Upsert LocationFilter',
    props<{locationFilter: LocationFIlter}>(),
)

export const clear = createAction('[LocationFilter/API] Clear LocationFilters')
