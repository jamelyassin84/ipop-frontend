import {LocalDeathDataService} from './../../../Services/home/demographic/deaths/local-death-data.service'
import {Component, OnInit, ViewChild} from '@angular/core'
import {ReloadService} from 'src/app/Services/reload.service'
import {CrudeDeathRateIncidenceChartConfig} from '../CrudeDeathRate'
import {BaseService} from 'src/app/Services/base.service'
import {Subscription} from 'rxjs'
import {PopulationPyramidComponent} from '../../population/population-pyramid/population-pyramid.component'
import {Color} from 'ng2-charts'
import {UserService} from 'src/app/Services/Independent/user.service'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'
import {
    deathsByMunicipalityHeaders,
    deathsByMunicipalityKeys,
} from 'src/app/app-core/constants/deaths/deaths.table'
import {monthChartConfig} from 'src/app/app-core/configs/month-chart.config'
import {crudeDeathRateIncidenceChartConfig} from 'src/app/app-core/configs/crude-death-rate.config'

@Component({
    selector: 'app-death-demographic',
    templateUrl: './death-demographic.component.html',
    styleUrls: ['./death-demographic.component.scss'],
})
export class DeathDemographicComponent implements OnInit {
    @ViewChild(PopulationPyramidComponent) pyramid: any

    constructor(
        private component: ReloadService,
        private service: LocalDeathDataService,
        private user: UserService,
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

    readonly deathsByMunicipalityKeys = [...deathsByMunicipalityKeys]

    readonly deathsByMunicipalityHeaders = [...deathsByMunicipalityHeaders]

    readonly Colors: Color[] = [
        {backgroundColor: '#CD1125'},
        {backgroundColor: '#000000'},
        {backgroundColor: '#A90E1E'},
    ]

    subscriptions = new Subscription()

    statisticalChart = {...monthChartConfig}

    crudeDeathRate = {...crudeDeathRateIncidenceChartConfig}

    deathsByMunicipality: any = []

    location: LocationFIlter = {
        barangay: null,
        municipality: null,
        year: null,
    }

    summaries: any = {}

    localData: any = {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    fetch(event: any) {
        this.location = event
        this.getSummary()
        this.getLocalData()
        this.getdeathsByMunicipality()
    }

    getSummary() {
        new BaseService(
            this.service.http,
            'death-statistics/summary',
            `year=${this.location['year']}`,
        )
            .index()
            .subscribe((data) => {
                this.summaries = data
                this.pyramid.fetch()
            })
    }

    clearChart() {
        this.crudeDeathRate.labels = []
        this.crudeDeathRate.datasets[0].data = []
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
            this.clearChart()
            for (let index in summaries.incidence) {
                if (
                    !this.crudeDeathRate.labels.includes(
                        summaries.incidence[index].year,
                    )
                ) {
                    this.crudeDeathRate.labels.push(
                        summaries.incidence[index].year,
                    )
                }
                this.crudeDeathRate.datasets[0].data.push(
                    summaries.incidence[index].value,
                )
            }
            this.processStatisticalChart(summaries.month)
        })
    }

    processStatisticalChart(months: Array<Statistic>) {
        this.statisticalChart.labels = []
        this.statisticalChart.datasets[0].data = []
        this.statisticalChart.datasets[1].data = []
        this.statisticalChart.datasets[2].data = []
        if (months.length === 0) {
            return
        }
        let labels: any = []
        let males: any = []
        let females: any = []
        let total: any = []
        months.forEach((data: Statistic) => {
            if (!labels.includes(data.month)) {
                labels.push(data.month)
            }
            males.push(data.males)
            females.push(data.females)
            total.push(data.total)
        })
        this.statisticalChart.labels = labels
        this.statisticalChart.datasets[0].data = females
        this.statisticalChart.datasets[1].data = males
        this.statisticalChart.datasets[2].data = total
    }

    getdeathsByMunicipality() {
        new BaseService(
            this.service.http,
            'death-statistics-by-municipality',
            `year=${this.location['year']}`,
        )
            .index()
            .subscribe((data) => {
                this.deathsByMunicipality = data
            })
    }
}

type Statistic = {
    males: number
    females: number
    total: number
    month: number
}
