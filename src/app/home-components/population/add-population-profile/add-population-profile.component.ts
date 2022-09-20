import {map, tap} from 'rxjs/operators'
import {Component, OnInit, Input} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {PopulationProfileService} from 'src/app/Services/home/population/population-profile.service'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'AddPopulationProfile',
    templateUrl: './add-population-profile.component.html',
    styleUrls: ['./add-population-profile.component.scss'],
    animations: [...dbwAnimations],
})
export class AddPopulationProfileComponent implements OnInit {
    constructor(
        private _store: Store<AppState>,
        private service: PopulationProfileService,
    ) {}

    ngOnInit(): void {}

    @Input('profile')
    set populationProfile(profile: any) {
        if (profile) {
            this.data = {...this.data, ...profile}
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
            this.fetch(location)
        }),
    )

    fetch(location: any) {
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
