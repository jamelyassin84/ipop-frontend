import {map, tap} from 'rxjs/operators'
import {LocalMigrationDataService} from './../../../../Services/home/demographic/migrations/local-migration-data.service'
import {Component, OnInit, Input} from '@angular/core'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {select, Store} from '@ngrx/store'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'AddMigrationData',
    templateUrl: './add-migration-data.component.html',
    styleUrls: ['./add-migration-data.component.scss'],
    animations: [...dbwAnimations],
})
export class AddMigrationDataComponent implements OnInit {
    constructor(
        private _store: Store<AppState>,
        private service: LocalMigrationDataService,
    ) {}

    ngOnInit(): void {}

    @Input('data')
    set setData(data: any) {
        this.data = {...this.data, ...data}
    }

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
