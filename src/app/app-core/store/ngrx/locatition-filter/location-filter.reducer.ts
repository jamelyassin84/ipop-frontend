import {createReducer, on} from '@ngrx/store'
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity'
import * as LocationFilterActions from './location-filter.actions'
import {LocationFIlter} from './location-filter.model'

export const locationFiltersFeatureKey = 'locationFilters'

export interface State extends EntityState<LocationFIlter> {}

export const adapter: EntityAdapter<LocationFIlter> =
    createEntityAdapter<LocationFIlter>()

export const initialState: State = adapter.getInitialState({})

export const reducer = createReducer(
    initialState,

    on(LocationFilterActions.upsert, (state, action) =>
        adapter.upsertOne(action.locationFilter, state),
    ),
    on(LocationFilterActions.clear, (state) => adapter.removeAll(state)),
)

export const {selectIds, selectEntities, selectAll, selectTotal} =
    adapter.getSelectors()
