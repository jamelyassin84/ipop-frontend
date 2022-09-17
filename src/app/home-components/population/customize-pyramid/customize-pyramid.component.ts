import {HttpClient} from '@angular/common/http'
import {Input} from '@angular/core'
import {Component, OnInit} from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    NonNullableFormBuilder,
    Validators,
} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {map, tap} from 'rxjs/operators'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {PopulationPyramidPayLoad} from 'src/app/app-core/http/payloads/pyramid.payload'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {BaseService} from 'src/app/Services/base.service'
import {PopulationPyramidService} from 'src/app/Services/home/population/population-pyramid.service'

@Component({
    selector: 'CustomizePyramid',
    templateUrl: './customize-pyramid.component.html',
    styleUrls: ['./customize-pyramid.component.scss'],
})
export class CustomizePyramidComponent implements OnInit {
    constructor(
        private _http: HttpClient,
        private _store: Store<AppState>,
        private service: PopulationPyramidService,
        private _formBuilder: NonNullableFormBuilder,
    ) {}

    @Input()
    type: string = ''

    @Input()
    types = ['Provincial', 'Muncipality', 'Barangay']

    location$ = this._store.pipe(
        select(StateEnum.LOCATION_FILTERS),
        map((x) => new TransformEntity(x).toObject()),
        tap((location: any) => {
            for (let key in location) {
                this.populationPyramid[key] = location[key]
            }

            this.fetch(location)
        }),
    )

    tabs: any = {
        males: true,
        famales: false,
    }

    isLoading: boolean = false

    populationPyramid: any = {
        barangay: null,
        municipality: null,
        year: null,
        data: {
            male: {},
            female: {},
        },
    }
    populationPyramidFormFemales: FormGroup<PopulationPyramidPayLoad> =
        this._formBuilder.group({
            eighty_and_above: ['', Validators.required],
            '75-79': ['', Validators.required],
            '70-74': ['', Validators.required],
            '65-69': ['', Validators.required],
            '60-64': ['', Validators.required],
            '55-59': ['', Validators.required],
            '50-54': ['', Validators.required],
            '45-49': ['', Validators.required],
            '40-44': ['', Validators.required],
            '35-39': ['', Validators.required],
            '30-34': ['', Validators.required],
            '25-29': ['', Validators.required],
            '20-24': ['', Validators.required],
            '15-19': ['', Validators.required],
            '10-14': ['', Validators.required],
            '5-9': ['', Validators.required],
        })

    populationPyramidFormMales: FormGroup<PopulationPyramidPayLoad> =
        this._formBuilder.group({
            eighty_and_above: ['', Validators.required],
            '75-79': ['', Validators.required],
            '70-74': ['', Validators.required],
            '65-69': ['', Validators.required],
            '60-64': ['', Validators.required],
            '55-59': ['', Validators.required],
            '50-54': ['', Validators.required],
            '45-49': ['', Validators.required],
            '40-44': ['', Validators.required],
            '35-39': ['', Validators.required],
            '30-34': ['', Validators.required],
            '25-29': ['', Validators.required],
            '20-24': ['', Validators.required],
            '15-19': ['', Validators.required],
            '10-14': ['', Validators.required],
            '5-9': ['', Validators.required],
        })

    ngOnInit(): void {}

    changeTab(tab: any) {
        for (let key in this.tabs) {
            this.tabs[key] = false
        }
        this.tabs[tab] = true
    }

    fetch(location: LocationFIlter) {
        const {barangay, municipality, year} = location

        this.populationPyramid = {...this.populationPyramid, location}
        this.populationPyramid.barangay = barangay
        this.populationPyramid.municipality = municipality
        this.populationPyramid.year = year

        const service = new BaseService(
            this._http,
            'population-pyramid',
            `${new URLSearchParams({
                type: this.type,
                year: year!.toString(),
                barangay: barangay ?? 'null',
                municipality: municipality ?? 'null',
            })}`,
        )

        service.index().subscribe((response: any) => {
            this.populationPyramid.data.male = response[0].data.male
            this.populationPyramid.data.female = response[0].data.female
        })
    }

    save() {
        Fire(
            'Save Changes?',
            'Are you sure you want to add this data?',
            'info',
            () => {
                this.isLoading = true

                let data = {...this.populationPyramid}

                data.type = this.type

                if (this.populationPyramid.municipality === 'Bingawan') {
                    data.data.male = data.data.female
                }

                this.service.create(data).subscribe(() => {
                    HasApprovals('Created')
                    this.isLoading = false
                })
            },
        )
    }
}
