import {map, take} from 'rxjs/operators'
import {Store, select} from '@ngrx/store'
import {LocalBirthDataService} from './../../../../Services/home/demographic/births/local-birth-data.service'
import {Component, Input, OnInit} from '@angular/core'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'
import {Fire, HasApprovals, Updated} from 'src/app/modules/extras/Alert'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'

@Component({
    selector: 'CustomizeBirthData',
    templateUrl: './customize-birth-data.component.html',
    styleUrls: ['./customize-birth-data.component.scss'],
})
export class CustomizeBirthDataComponent implements OnInit {
    constructor(
        private _store: Store<AppState>,
        private service: LocalBirthDataService,
    ) {}

    @Input('data')
    set setData(data: any) {
        console.log(data)
        this.data = {...this.data, ...data}
    }

    readonly location$ = this._store.pipe(
        select(StateEnum.LOCATION_FILTERS),
        map((x) => new TransformEntity(x).toObject()),
    )

    data: any = {
        barangay: null,
        municipality: null,
        year: null,
        gender: 'male',
    }

    isLoading: boolean = false

    ngOnInit(): void {}

    save() {
        this.location$.pipe(take(1)).subscribe((location) => {
            const data = {...this.data, ...location}

            for (let key in data) {
                if (data[key] !== null) {
                    data[key] = data[key] + ''
                }
            }
            Fire(
                'Save Changes?',
                'Are you sure you want to add this data?',
                'info',
                () => {
                    this.isLoading = true

                    if (!data.id) {
                        this.service.create(data).subscribe(() => {
                            HasApprovals('Added')
                            this.isLoading = false
                        })
                    }

                    this.service.update(data.id, data).subscribe(() => {
                        HasApprovals('Updated')
                        this.isLoading = false
                    })
                },
            )
        })
    }
}
