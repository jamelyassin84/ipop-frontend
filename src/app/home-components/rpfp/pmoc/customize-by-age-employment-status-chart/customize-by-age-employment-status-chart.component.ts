import {map, tap} from 'rxjs/operators'
import {Component, OnInit, Input} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {EmploymentStatusService} from 'src/app/Services/home/rpfp/pmoc/employment-status.service'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'

@Component({
    selector: 'CustomizeByEmploymentStatusChart',
    templateUrl: './customize-by-age-employment-status-chart.component.html',
    styleUrls: ['./customize-by-age-employment-status-chart.component.scss'],
})
export class CustomizeByAgeEmploymentStatusChartComponent implements OnInit {
    constructor(
        private _store: Store<AppState>,
        private service: EmploymentStatusService,
    ) {}

    @Input('data')
    set setData(data: any[]) {
        if (data) {
            this.data = {
                ...this.data,
                ...data,
            }
        }
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
                this.data = {...this.data, ...location}

                this.fetch(location)
            }
        }),
    )

    ngOnInit(): void {}

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
