import {map, tap} from 'rxjs/operators'
import {CivilStatusService} from './../../../../Services/home/rpfp/pmoc/civil-status.service'
import {Component, OnInit, Input} from '@angular/core'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {select, Store} from '@ngrx/store'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'

@Component({
    selector: 'CustomizeByCivilStatusChart',
    templateUrl: './customize-by-civil-status-chart.component.html',
    styleUrls: ['./customize-by-civil-status-chart.component.scss'],
})
export class CustomizeByCivilStatusChartComponent implements OnInit {
    constructor(
        private service: CivilStatusService,
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
