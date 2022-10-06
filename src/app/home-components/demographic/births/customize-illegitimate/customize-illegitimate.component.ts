import {IncidenceChartService} from './../../../../Services/home/demographic/incidence-chart.service'
import {Component, OnInit, Input} from '@angular/core'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {select, Store} from '@ngrx/store'
import {map, tap} from 'rxjs/operators'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'

@Component({
    selector: 'CustomizeIllegitimate',
    templateUrl: './customize-illegitimate.component.html',
    styleUrls: ['./customize-illegitimate.component.scss'],
})
export class CustomizeIllegitimateComponent implements OnInit {
    constructor(
        private _store: Store<AppState>,
        private service: IncidenceChartService,
    ) {}

    @Input('data')
    set setData(data: any) {
        this.data = {...this.data, value: data}
    }

    data: any = {
        type: 'Birth',
        title: 'Incidence of Illegitimate Birth',
        years: [],
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

    ngOnInit(): void {}
}
