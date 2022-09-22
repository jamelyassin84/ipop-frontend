import {LocalBirthDataService} from './../../../Services/home/demographic/births/local-birth-data.service'
import {Component, OnInit, ViewChild} from '@angular/core'
import {ReloadService} from 'src/app/Services/reload.service'
import {groupBy} from 'src/app/constants/helpers'
import {BaseService} from 'src/app/Services/base.service'
import {Subscription} from 'rxjs'
import {PopulationPyramidComponent} from '../../population/population-pyramid/population-pyramid.component'
import {UserService} from 'src/app/Services/Independent/user.service'
import {Color} from 'ng2-charts'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'
import {illegitimateIncidenceChartConfig} from 'src/app/app-core/configs/illegitimate-chart.config'
import {teenageIncidenceChartConfig} from 'src/app/app-core/configs/teenage-chart.config'
import {
    birthsByMunicipalityHeaders,
    birthsByMunicipalityKeys,
} from 'src/app/app-core/constants/births/births.table'
import {monthChartConfig} from 'src/app/app-core/configs/month-chart.config'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'app-birth-demographic',
    templateUrl: './birth-demographic.component.html',
    styleUrls: ['./birth-demographic.component.scss'],
    animations: [...dbwAnimations],
})
export class BirthDemographicComponent implements OnInit {
    @ViewChild(PopulationPyramidComponent) pyramid?: any

    constructor(
        private user: UserService,
        private component: ReloadService,
        private service: LocalBirthDataService,
    ) {
        this.subscriptions.add(
            this.component.shouldReload().subscribe(() => {
                this.fetch(this.location)
            }),
        )
    }

    readonly Colors: Color[] = [
        {backgroundColor: '#73B436'},
        {backgroundColor: '#3DB98D'},
        {backgroundColor: '#2CA763'},
    ]

    readonly isUser = !this.user.isAdmin()
    readonly isSuperAdmin = !this.user.isSuperAdmin()
    readonly birthsByMunicipalityKeys = birthsByMunicipalityKeys
    readonly birthsByMunicipalityHeaders = birthsByMunicipalityHeaders

    subscriptions = new Subscription()

    incidenceChart = {...illegitimateIncidenceChartConfig}
    teenageChart = {...teenageIncidenceChartConfig}
    statisticalChart = {...monthChartConfig}

    illegitimateBirths: number = 0

    teenageBirths: number = 0

    location: LocationFIlter = {
        barangay: null,
        municipality: null,
        year: null,
    }

    summaries: any = undefined

    localData: any = {}

    birthsByMunicipality: any = []

    monthChartData: Statistic[] = []

    ngOnInit(): void {
        this.location.year = new Date().getFullYear()
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    fetch(event: any) {
        this.location = event
        this.getSummary()
        this.getLocalData()
        this.getBIrthsByMunicipality()
    }

    distribute(incidences: any) {
        this.clearChart()
        let illegitimateBirth = incidences[0]
        let teenageBirth = incidences[1]
        if (
            incidences.length !== 0 &&
            incidences[0][0].title !== 'Incidence of Illegitimate Birth'
        ) {
            teenageBirth = incidences[0]
            illegitimateBirth = incidences[1]
        }
        for (let index in teenageBirth) {
            if (!this.teenageChart.labels.includes(teenageBirth[index].year)) {
                this.teenageChart.labels.push(teenageBirth[index].year)
            }
            this.teenageChart.datasets[0].data.push(teenageBirth[index].value)

            if (teenageBirth[index].year === this.location.year) {
                this.teenageBirths += teenageBirth[index].value
            }
        }

        this.illegitimateBirths = 0
        for (let index in illegitimateBirth) {
            if (
                !this.incidenceChart.labels.includes(
                    illegitimateBirth[index].year,
                )
            ) {
                this.incidenceChart.labels.push(illegitimateBirth[index].year)
            }
            this.incidenceChart.datasets[0].data.push(
                illegitimateBirth[index].value,
            )

            if (illegitimateBirth[index].year === this.location.year) {
                this.illegitimateBirths += illegitimateBirth[index].value
            }
        }
    }

    getSummary() {
        new BaseService(
            this.service.http,
            'birth-statistics/summary',
            `year=${this.location['year']}`,
        )
            .index()
            .subscribe((data) => {
                this.summaries = data

                if (this.pyramid) {
                    this.pyramid.fetch()
                }
            })
    }

    getLocalData() {
        this.localData = {}
        const service = new BaseService(
            this.service.http,
            this.service.url,
            `municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}`,
        )
        service.index().subscribe((summaries: any) => {
            this.distribute(groupBy(summaries.incidence, 'title'))
            this.localData = summaries?.data || {}
            this.processStatisticalChart(summaries.month)
        })
    }

    processStatisticalChart(months: Array<Statistic>) {
        this.monthChartData = months
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

    getBIrthsByMunicipality() {
        new BaseService(
            this.service.http,
            'birth-statistics-by-municipality',
            `year=${this.location['year']}`,
        )
            .index()
            .subscribe((data) => {
                this.birthsByMunicipality = data
            })
    }

    clearChart() {
        this.teenageChart.labels = []
        this.incidenceChart.labels = []
        this.teenageChart.datasets[0].data = []
        this.incidenceChart.datasets[0].data = []
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
