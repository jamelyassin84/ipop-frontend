import {map, tap} from 'rxjs/operators'
import {empty} from 'src/@digital_brand_work/pipes/is-empty.pipe'
import {HttpClient} from '@angular/common/http'
import {Component, Input, OnInit} from '@angular/core'
import {drawChart} from '../Config'
import {BaseService} from 'src/app/Services/base.service'
import {getPercent} from 'src/app/constants/Shortcuts'
import {UserService} from 'src/app/Services/Independent/user.service'
import {ReloadService} from 'src/app/Services/reload.service'
import {Subscription} from 'rxjs'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'
import {PyramidData} from 'src/app/app-core/models/population-pyramid'
import {PopulationPyramidChartService} from './population-pyramid.service'
import {PopulationByAgeGroupTableService} from './population-by-age-group-and-sex.service'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {select, Store} from '@ngrx/store'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'

@Component({
    selector: 'PyramidChart-and-AgeGroup',
    templateUrl: './population-pyramid.component.html',
    styleUrls: ['./population-pyramid.component.scss'],
    animations: [...dbwAnimations],
})
export class PopulationPyramidComponent implements OnInit {
    constructor(
        private _http: HttpClient,
        private user: UserService,
        private _store: Store<AppState>,
        private component: ReloadService,
        private _populationPyramidChartService: PopulationPyramidChartService,
        private _populationByAgeGroupTableService: PopulationByAgeGroupTableService,
    ) {
        this.subscriptions.add(
            this.component.shouldReload().subscribe(() => {
                this.fetch()
            }),
        )
    }

    readonly LAST = '80 and above'

    @Input()
    showPyramid: boolean = true

    @Input('location')
    set setLocation(location: LocationFIlter) {
        this.location = location
    }
    location?: LocationFIlter

    @Input()
    type: string = ''

    @Input()
    ageGroupColor: string = ''

    @Input()
    pyramidTitle: string = 'Pyramid'

    @Input()
    ageGroupTitle: string = 'Age Group and Sex'

    @Input()
    colors: string[] = []

    location$ = this._store.pipe(
        select(StateEnum.LOCATION_FILTERS),
        map((x) => new TransformEntity(x).toObject()),
        tap((location) => {
            if (location) {
                this.location = {...location}
            }
        }),
    )

    readonly isUser = !this.user.isSuperAdmin()

    subscriptions = new Subscription()

    populationByAgeGroupAndSexTotal: any = {}

    ageDistribution: any = []

    populationByAgeGroupAndSex: {
        ageGroup: string
        male: number
        percent_male: number
        female: number
        percent_female: number
        total: number
        percent_total: number
    }[] = []

    isProvincial: boolean = false

    hasPyramid: boolean = false

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    fetch() {
        new BaseService(
            this._http,
            'population-pyramid',
            `${new URLSearchParams({
                type: this.type,
                year: this.location!.year!.toString(),
                barangay: this.location?.barangay ?? 'null',
                municipality: this.location?.municipality ?? 'null',
            })}`,
        )
            .index()
            .subscribe((data: any) => {
                const {male, female} = data[0]?.data || {}

                if (empty(male) || empty(female)) {
                    this.ageDistribution = []

                    this.hasPyramid = false

                    setTimeout(() => {
                        drawChart(
                            'population-pyramid',
                            this.ageDistribution,
                            this.colors,
                        )
                    }, 500)

                    return
                }

                this.processPopulationByAgeGroupAndSex(data)

                this.ageDistribution =
                    this._populationPyramidChartService.process(data)

                this.hasPyramid = true

                setTimeout(() => {
                    drawChart(
                        'population-pyramid',
                        this.ageDistribution,
                        this.colors,
                    )
                }, 500)
            })
    }

    processPopulationByAgeGroupAndSex(data: any[]) {
        const temp = this._populationByAgeGroupTableService.process(
            data,
            this.type,
        )

        this.populationByAgeGroupAndSex = temp.reverse()

        this.sumOfRows(this.populationByAgeGroupAndSex, data)
    }

    sumOfRows(data: any, originalData: any) {
        let object: any = {
            ageGroup: 'Total',
            male: 0,
            percent_male: 0,
            female: 0,
            percent_female: 0,
            total: 0,
            percent_total: 0,
        }
        for (let index of data) {
            for (let key in index) {
                if (key !== 'ageGroup') {
                    object[key] += index[key]
                }
            }
        }
        this.populationByAgeGroupAndSexTotal = object
        this.reAlterPopulationByAgeGroupAndSexTable(originalData)
    }

    reAlterPopulationByAgeGroupAndSexTable(data: any) {
        this.populationByAgeGroupAndSex = []
        const totalPopulation = this.populationByAgeGroupAndSexTotal.total
        let temp: any = []
        const male = data[0]['data']['male']

        const female = data[0]['data']['female']

        for (let key in female) {
            let newText: string = ''
            if (key === 'eighty_and_above') {
                newText = '80 and above'
            }
            if (key === 'below_1_year_old') {
                newText = 'Below 1 Year Old'
            }
            if (this.type === 'Marriage' && key === '20-24') {
                console.log('ari')

                newText = '18-24'
            }
            let total = parseFloat(male[key]) + parseFloat(female[key])

            let data = {
                ageGroup:
                    key === 'eighty_and_above' ||
                    key === 'below_1_year_old' ||
                    (this.type === 'Marriage' && key === '20-24')
                        ? newText
                        : key,
                male: male[key],
                percent_male: getPercent(male[key], totalPopulation),
                female: female[key],
                percent_female: getPercent(female[key], totalPopulation),
                total: total,
                percent_total:
                    getPercent(female[key], totalPopulation) +
                    getPercent(male[key], totalPopulation),
            }

            temp.push(data)
        }
        this.populationByAgeGroupAndSexTotal.percent_male = 0
        this.populationByAgeGroupAndSexTotal.percent_female = 0
        this.populationByAgeGroupAndSexTotal.percent_total = 0

        const disregards = ['ageGroup', 'male', 'female', 'total']
        for (let index of temp) {
            for (let key in index) {
                if (!disregards.includes(key)) {
                    this.populationByAgeGroupAndSexTotal[key] += index[key]
                }
            }
        }

        this.populationByAgeGroupAndSex =
            temp[0].ageGroup === this.LAST ? temp.reverse() : temp
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
