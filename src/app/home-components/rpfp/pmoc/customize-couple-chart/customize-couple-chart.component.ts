import {map, tap} from 'rxjs/operators'
import {Component, OnInit, Input} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {preMarriageData} from 'src/app/app-core/constants/pmoc/pmoc-data'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {MonthChartService} from 'src/app/Services/home/demographic/month-chart.service'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'CustomizeCoupleChart',
    templateUrl: './customize-couple-chart.component.html',
    styleUrls: ['./customize-couple-chart.component.scss'],
    animations: [...dbwAnimations],
})
export class CustomizeCoupleChartComponent implements OnInit {
    constructor(
        private _store: Store<AppState>,
        private service: MonthChartService,
    ) {}

    @Input('data')
    set setData(data: any[]) {
        let males = {...preMarriageData.males}

        if (data.length !== 0) {
            males = Object.assign(
                {},
                ...data.map((monthData) => {
                    return {[monthData.month]: monthData.males}
                }),
            )
        }

        this.data = {
            ...this.data,
            males: males,
        }
    }

    location$ = this._store.pipe(
        select(StateEnum.LOCATION_FILTERS),
        map((x) => new TransformEntity(x).toObject()),
        tap((location) => {
            if (location) {
                this.data = {...this.data, ...location}

                console.log(location)

                this.fetch(location)
            }
        }),
    )

    data = {...preMarriageData}

    isLoading: boolean = false

    ngOnInit(): void {}

    fetch(location: LocationFIlter) {
        this.data = {...this.data, ...location}
    }

    save() {
        this.data.months = this.data.males

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
