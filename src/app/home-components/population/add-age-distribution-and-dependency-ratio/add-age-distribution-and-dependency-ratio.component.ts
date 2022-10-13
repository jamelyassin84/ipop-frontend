import {map, tap} from 'rxjs/operators'
import {Component, OnInit, Input} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {AgeDistributionAndAgeDependecyRatioService} from 'src/app/Services/home/population/age-distribution-and-age-dependecy-ratio.service'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'

@Component({
    selector: 'AgeDistributionAndDependecyRatio',
    templateUrl: './add-age-distribution-and-dependency-ratio.component.html',
    styleUrls: ['./add-age-distribution-and-dependency-ratio.component.scss'],
})
export class AddAgeDistributionAndDependencyRatioComponent implements OnInit {
    constructor(
        private service: AgeDistributionAndAgeDependecyRatioService,
        private _store: Store<AppState>,
    ) {}

    ngOnInit(): void {}

    @Input('data')
    set setAgeDistributionAndAgeDependencyRatio(data: any) {
        const ageDistributionAndAgeDependencyRatio = data[0]

        if (ageDistributionAndAgeDependencyRatio) {
            console.log(ageDistributionAndAgeDependencyRatio)

            this.data = {
                ...this.data,
                ...ageDistributionAndAgeDependencyRatio,
            }
        }
    }

    data: any = {
        barangay: null,
        municipality: null,
        year: null,
    }

    isLoading: boolean = false

    location$ = this._store.pipe(
        select(StateEnum.LOCATION_FILTERS),
        map((x) => new TransformEntity(x).toObject()),
        tap((location: any) => {
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
