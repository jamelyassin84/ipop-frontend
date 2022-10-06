import {LocalDeathDataService} from './../../../../Services/home/demographic/deaths/local-death-data.service'
import {Component, OnInit, Input} from '@angular/core'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {select, Store} from '@ngrx/store'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {map, tap} from 'rxjs/operators'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'

@Component({
    selector: 'AddDeathData',
    templateUrl: './add-death-data.component.html',
    styleUrls: ['./add-death-data.component.scss'],
})
export class AddDeathDataComponent implements OnInit {
    constructor(
        private _store: Store<AppState>,
        private service: LocalDeathDataService,
    ) {}

    @Input('data')
    set setData(data: any) {
        this.data = {...this.data, ...data}
    }

    ngOnInit(): void {}

    data: any = {
        barangay: null,
        municipality: null,
        year: null,
        gender: 'male',
    }
    isLoading: boolean = false

    location$ = this._store.pipe(
        select(StateEnum.LOCATION_FILTERS),
        map((x) => new TransformEntity(x).toObject()),
        tap((location) => {
            if (location) {
                this.fetch(location)
            }
        }),
    )

    fetch(location: LocationFIlter) {
        this.data = {...this.data, ...location}
    }

    save() {
        Fire(
            'Save Changes?',
            'Are you sure you want to add this data?',
            'info',
            () => {
                this.isLoading = true
                this.service.create(this.data).subscribe(() => {
                    HasApprovals('Created')
                    this.isLoading = false
                })
            },
        )
    }
}
