import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'
import {map, tap} from 'rxjs/operators'
import {MarraigesService} from './../../../../Services/home/demographic/marraiges/marraiges.service'
import {Component, Input, OnInit} from '@angular/core'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {select, Store} from '@ngrx/store'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'AddMarriageData',
    templateUrl: './add-marriage-data.component.html',
    styleUrls: ['./add-marriage-data.component.scss'],
    animations: [...dbwAnimations],
})
export class AddMarriageDataComponent implements OnInit {
    constructor(
        private _store: Store<AppState>,
        private service: MarraigesService,
    ) {}

    @Input('marriageData')
    set setMarriageData(marriageData: any) {
        if (marriageData) {
            this.data = {...this.data, ...marriageData}
        }
    }

    location$ = this._store.pipe(
        select(StateEnum.LOCATION_FILTERS),
        map((x) => new TransformEntity(x).toObject()),
        tap((location) => {
            if (location) {
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
