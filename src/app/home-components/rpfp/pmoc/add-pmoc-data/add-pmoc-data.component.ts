import {map, tap} from 'rxjs/operators'
import {PmocDataService} from './../../../../Services/home/rpfp/pmoc/pmoc-data.service'
import {Component, OnInit, Input} from '@angular/core'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {select, Store} from '@ngrx/store'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'

@Component({
    selector: 'AddPMOCData',
    templateUrl: './add-pmoc-data.component.html',
    styleUrls: ['./add-pmoc-data.component.scss'],
})
export class AddPmocDataComponent implements OnInit {
    constructor(
        private _store: Store<AppState>,
        private service: PmocDataService,
    ) {}

    ngOnInit(): void {}

    @Input('pmocData')
    set setPMOC(pmocData: any) {
        if (pmocData) {
            this.data = {...this.data, ...pmocData}
        }
    }

    data: any = {
        barangay: null,
        municipality: null,
        year: null,
        gender: 'male',
        individuals_interviewed: '0',
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
