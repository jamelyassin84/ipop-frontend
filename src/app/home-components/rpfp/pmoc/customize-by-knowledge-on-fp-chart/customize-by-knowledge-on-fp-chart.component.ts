import {map, tap} from 'rxjs/operators'
import {Component, OnInit, Input} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {KnowledgeOnFpService} from 'src/app/Services/home/rpfp/pmoc/knowledge-on-fp.service'

@Component({
    selector: 'CustomizeByKnowledgeOnFPChart',
    templateUrl: './customize-by-knowledge-on-fp-chart.component.html',
    styleUrls: ['./customize-by-knowledge-on-fp-chart.component.scss'],
})
export class CustomizeByKnowledgeOnFpChartComponent implements OnInit {
    constructor(
        private service: KnowledgeOnFpService,
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
