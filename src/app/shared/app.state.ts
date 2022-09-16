import {StoreModule} from '@ngrx/store'

import * as fromLocationFilter from '../app-core/store/ngrx/locatition-filter/location-filter.reducer'
export const appStates = [
    StoreModule.forFeature(
        fromLocationFilter.locationFiltersFeatureKey,
        fromLocationFilter.reducer,
    ),
]
