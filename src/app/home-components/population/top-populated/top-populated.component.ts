import {map, tap} from 'rxjs/operators'
import {LocationService} from './../../../Services/locations/province.service'
import {Component, OnInit} from '@angular/core'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {MunicipalityType} from 'src/app/Types/locations/Municipality.types'
import {TopPopulatedService} from 'src/app/Services/home/population/top-populated.service'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {select, Store} from '@ngrx/store'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'

@Component({
    selector: 'AddTopPopulated',
    templateUrl: './top-populated.component.html',
    styleUrls: ['./top-populated.component.scss'],
    animations: [...dbwAnimations],
})
export class TopPopulatedComponent implements OnInit {
    constructor(
        private _store: Store<AppState>,
        private location: LocationService,
        private service: TopPopulatedService,
    ) {}

    location$ = this._store.pipe(
        select(StateEnum.LOCATION_FILTERS),
        map((x) => new TransformEntity(x).toObject()),
        tap((location) => {
            if (location) {
                this.topPopulated.data.year =
                    location?.year ?? new Date(Date.now()).getFullYear()
            }
        }),
    )

    municipalities: MunicipalityType[] = []

    topPopulated = {
        data: {
            name: '',
            total: '',
            year: new Date(Date.now()).getFullYear(),
        },
    }

    isLoading: boolean = false

    ngOnInit(): void {
        this.getMuncipalities()
    }

    getMuncipalities() {
        this.location.municipalities().subscribe((data: any) => {
            this.municipalities = data
        })
    }

    changeHandler(event: any) {
        this.topPopulated.data.name =
            event.target.options[event.target.options.selectedIndex].text
    }

    save() {
        Fire(
            'Save Changes?',
            'Are you sure you want to add this data?',
            'info',
            () => {
                this.isLoading = true
                this.service.create(this.topPopulated).subscribe(() => {
                    HasApprovals('Created')
                    this.isLoading = false
                })
            },
        )
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
