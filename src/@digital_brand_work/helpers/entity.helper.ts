import {EntityState} from '@ngrx/entity'
import {entities} from '../pipes/entity.pipe'

export class TransformEntity<T> {
    constructor(_entity: EntityState<T>) {
        this.entity = _entity
    }

    private entity?: EntityState<T>

    toObject(): T | undefined {
        if (!this.entity || this.entity.ids.length === 0) {
            return undefined
        }

        return this.entity.entities[this.entity.ids[0]]
    }

    toArray(): T[] {
        return entities(this.entity?.entities) as T[]
    }
}
