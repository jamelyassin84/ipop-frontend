import {map, tap} from 'rxjs/operators'
import {LocalBirthDataService} from './../../../../Services/home/demographic/births/local-birth-data.service'
import {Component, Input, OnInit} from '@angular/core'
import {Created, Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {select, Store} from '@ngrx/store'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'

@Component({
    selector: 'AddBirthData',
    templateUrl: './add-birth-data.component.html',
    styleUrls: ['./add-birth-data.component.scss'],
})
export class AddBirthDataComponent implements OnInit {
    constructor(
        private _store: Store<AppState>,
        private service: LocalBirthDataService,
    ) {}

    ngOnInit(): void {}

    @Input('data')
    set setData(data: any) {
        this.data = {...this.data, ...data}
    }

    location$ = this._store.pipe(
        select(StateEnum.LOCATION_FILTERS),
        map((x) => new TransformEntity(x).toObject()),
        tap((location) => {
            if (location) {
                this.fetch(location)
            }
        }),
    )

    data: any = {
        barangay: null,
        municipality: null,
        year: null,
        gender: 'male',
    }

    fetch(location: LocationFIlter) {
        this.data = {...this.data, ...location}
    }

    isLoading: boolean = false

    save() {
        const data = {...this.data}

        for (let key in data) {
            if (data[key] !== null) {
                data[key] = data[key] + ''
            }
        }

        Fire(
            'Save Changes?',
            'Are you sure you want to add this data?',
            'info',
            () => {
                this.isLoading = true

                this.service.create(data).subscribe(() => {
                    HasApprovals('Created')
                    this.isLoading = false
                })
            },
        )
    }
}
