import {tap, map} from 'rxjs/operators'
import {AverageMonthlyIncomeService} from './../../../../Services/home/rpfp/pmoc/average-monthly-income.service'
import {Component, OnInit, Input} from '@angular/core'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {select, Store} from '@ngrx/store'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'

@Component({
    selector: 'CustomizeByMonthlyIncomeChart',
    templateUrl: './customize-by-monthly-income-chart.component.html',
    styleUrls: ['./customize-by-monthly-income-chart.component.scss'],
})
export class CustomizeByMonthlyIncomeChartComponent implements OnInit {
    constructor(
        private service: AverageMonthlyIncomeService,
        private _store: Store<AppState>,
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

    data: any = {
        barangay: null,
        municipality: null,
        year: null,
        gender: 'male',
    }

    isLoading: boolean = false

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
