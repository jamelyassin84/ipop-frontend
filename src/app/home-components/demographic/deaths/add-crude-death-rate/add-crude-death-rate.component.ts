import {Component, OnInit, Input} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {map, tap} from 'rxjs/operators'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {IncidenceChartService} from 'src/app/Services/home/demographic/incidence-chart.service'

@Component({
    selector: 'AddCrudeDeathRate',
    templateUrl: './add-crude-death-rate.component.html',
    styleUrls: ['./add-crude-death-rate.component.scss'],
})
export class AddCrudeDeathRateComponent implements OnInit {
    constructor(
        private _store: Store<AppState>,
        private service: IncidenceChartService,
    ) {}

    @Input('data')
    set setData(data: any) {
        this.data = {...this.data, value: data}
    }

    data: any = {
        type: 'Death',
        title: 'Crude Death Rate',
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
