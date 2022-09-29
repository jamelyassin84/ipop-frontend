import {monthChartConfig} from './../../../app-core/configs/month-chart.config'
import {MarraigesService} from './../../../Services/home/demographic/marraiges/marraiges.service'
import {Component, OnInit, ViewChild} from '@angular/core'
import {Subscription} from 'rxjs'
import {BaseService} from 'src/app/Services/base.service'
import {ReloadService} from 'src/app/Services/reload.service'
import {PopulationPyramidComponent} from '../../population/population-pyramid/population-pyramid.component'
import {UserService} from 'src/app/Services/Independent/user.service'
import {Color} from 'ng2-charts'
import {marriageChartConfig} from 'src/app/app-core/configs/marriage-chart.config'
import {
    marriagesByMunicipalityHeaders,
    marriagesByMunicipalityKeys,
} from 'src/app/app-core/constants/marriages/marriage.table'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {TypeofMarriageService} from './type-of-marriages.service'

@Component({
    selector: 'app-marriage-demographic',
    templateUrl: './marriage-demographic.component.html',
    styleUrls: ['./marriage-demographic.component.scss'],
    animations: [...dbwAnimations],
})
export class MarriageDemographicComponent implements OnInit {
    @ViewChild(PopulationPyramidComponent) pyramid: any

    constructor(
        private user: UserService,
        private component: ReloadService,
        private service: MarraigesService,
        private _typeOfMarriageService: TypeofMarriageService,
    ) {
        this.subscriptions.add(
            this.component.shouldReload().subscribe(() => {
                this.ngOnInit()
                this.fetch(this.location)
            }),
        )
    }

    readonly isUser = !this.user.isAdmin()

    readonly isSuperAdmin = !this.user.isSuperAdmin()

    readonly Colors: Color[] = [
        {backgroundColor: '#F472B6'},
        {backgroundColor: '#EC4899'},
        {backgroundColor: '#DB2777'},
        {backgroundColor: '#BE185D'},
    ]

    readonly marriagesByMunicipalityKeys = marriagesByMunicipalityKeys

    readonly marriagesByMunicipalityHeaders = marriagesByMunicipalityHeaders

    subscriptions = new Subscription()

    location: LocationFIlter = {
        barangay: null,
        municipality: null,
        year: null,
    }

    summaries?: any

    localData: any = {}

    marriagesByMunicipality: any = []

    statisticalChart = {...monthChartConfig}

    marriageConfig = {...marriageChartConfig}

    monthChartData: Statistic[] = []

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    fetch(location: LocationFIlter) {
        this.location = location
        this.getSummary()
        this.getLocalData()
        this.getMarriagesByMunicipality()
    }

    getSummary() {
        new BaseService(
            this.service.http,
            'marriage-statistics/summary',
            `year=${this.location['year']}`,
        )
            .index()
            .subscribe((data) => {
                this.pyramid.fetch()

                if (data.summary.length === 0) {
                    this.marriageConfig = {...marriageChartConfig}
                    return
                }

                const {datasets, summary} =
                    this._typeOfMarriageService.convertToChart(data)

                this.summaries = summary
                this.marriageConfig.labels = [this.location!.year!.toString()]
                this.marriageConfig.datasets = datasets
            })
    }

    getLocalData() {
        this.localData = {
            total: 0,
            crude_death_rate: 0,
        }
        const service = new BaseService(
            this.service.http,
            this.service.url,
            `municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}`,
        )
        service.index().subscribe((summaries: any) => {
            this.localData = summaries?.data || {}
            this.processStatisticalChart(summaries.month)
        })
    }

    processStatisticalChart(months: Array<Statistic>) {
        this.monthChartData = months
        this.statisticalChart.labels = []
        this.statisticalChart.datasets = [{data: [0], label: 'Marriages'}]
        if (months.length === 0) {
            return
        }
        let labels: any = []
        let males: any = []
        months.forEach((data: Statistic) => {
            if (!labels.includes(data.month)) {
                labels.push(data.month)
            }
            males.push(data.males)
        })
        this.statisticalChart.labels = labels
        this.statisticalChart.datasets[0].data = males
    }

    getMarriagesByMunicipality() {
        new BaseService(
            this.service.http,
            'marriage-statistics-by-municipality',
            `year=${this.location['year']}`,
        )
            .index()
            .subscribe((data) => {
                this.marriagesByMunicipality = data
            })
    }

    getPercentage(value: number, basis: number) {
        return (value * 100) / basis
    }
}

type Statistic = {
    males: number
    females: number
    total: number
    month: number
}
