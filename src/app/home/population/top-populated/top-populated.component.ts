import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {map} from 'rxjs/operators'
import {select, Store} from '@ngrx/store'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'

@Component({
    selector: 'top-populated',
    templateUrl: './top-populated.component.html',
    styleUrls: ['./top-populated.component.scss'],
})
export class TopPopulatedSharedComponent implements OnInit {
    constructor(private _store: Store<AppState>) {}

    @Output() onDelete = new EventEmitter<number>()

    @Input() topPopulated?: TopPopulated[]

    location$ = this._store.pipe(
        select(StateEnum.LOCATION_FILTERS),
        map((x) => new TransformEntity(x).toObject()),
    )

    ngOnInit(): void {}
}

export interface TopPopulated {
    data: {name: string; total: number; year: number; id: any}
}
