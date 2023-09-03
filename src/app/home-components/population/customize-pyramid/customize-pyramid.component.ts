import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {HttpClient} from '@angular/common/http'
import {Input} from '@angular/core'
import {Component} from '@angular/core'
import {FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {map, take, tap} from 'rxjs/operators'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {POPULATION_PYRAMID_AGE_GROUPS} from 'src/app/app-core/constants/population-pyramid/population-pyramid-age-group'
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
    animations: [...dbwAnimations],
})
export class CustomizePyramidComponent {
    constructor(
        private _http: HttpClient,
        private _store: Store<AppState>,
        private _formBuilder: NonNullableFormBuilder,
        private _populationPyramidService: PopulationPyramidService,
    ) {}

    @Input()
    type: string = ''

    @Input()
    types = ['Provincial', 'Muncipality', 'Barangay']

    readonly location$ = this._store.pipe(
        select(StateEnum.LOCATION_FILTERS),
        map((x) => new TransformEntity(x).toObject()),
        tap((location: any) => {
            this.getPyramidData(location)
        }),
    )

    readonly POPULATION_PYRAMID_AGE_GROUPS = POPULATION_PYRAMID_AGE_GROUPS

    readonly NAVIGATION = ['males', 'females']

    populationPyramidFormMales = this.getFormGroup()

    populationPyramidFormFemales = this.getFormGroup()

    tabs: any = {
        males: true,
        females: false,
    }

    isLoading: boolean = false

    changeTab(tab: any) {
        for (let key in this.tabs) {
            this.tabs[key] = false
        }
        this.tabs[tab] = true
    }

    getPyramidData(location: LocationFIlter): void {
        const {barangay, municipality, year} = location

        new BaseService(
            this._http,
            'population-pyramid',
            `${new URLSearchParams({
                type: this.type,
                year: year!.toString(),
                barangay: barangay ?? 'null',
                municipality: municipality ?? 'null',
            })}`,
        )
            .index()
            .subscribe((response: any) => {
                const {male, female} = response[0].data
                console.log(male)
                console.log(female)

                this.populationPyramidFormMales.setValue(male)
                this.populationPyramidFormFemales.setValue(female)
            })
    }

    save() {
        Fire(
            'Save Changes?',
            'Are you sure you want to add this data?',
            'info',
            () => {
                this.isLoading = true

                this.location$.pipe(take(1)).subscribe((location) => {
                    let data = {
                        ...location,
                        data: {
                            male: this.populationPyramidFormMales.value,
                            female: this.populationPyramidFormFemales.value,
                        },
                    }

                    data.type = this.type

                    this._populationPyramidService
                        .create(data)
                        .subscribe(() => HasApprovals('Created'))
                        .add(() => (this.isLoading = false))
                })
            },
        )
    }

    private getFormGroup(): FormGroup<PopulationPyramidPayLoad> {
        const object: any = {}

        this.POPULATION_PYRAMID_AGE_GROUPS.forEach((ageGroup) => {
            object[ageGroup.formControlName] = ['', Validators.required]
        })

        return this._formBuilder.group(object) as any
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
