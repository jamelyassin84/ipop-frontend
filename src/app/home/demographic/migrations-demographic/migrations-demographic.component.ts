import {LocalMigrationDataService} from './../../../Services/home/demographic/migrations/local-migration-data.service'
import {Component, OnInit} from '@angular/core'
import {MigrationChartConfig} from '../MigrationChart'
import {ReloadService} from 'src/app/Services/reload.service'
import {BaseService} from 'src/app/Services/base.service'
import {Subscription} from 'rxjs'
import {Color} from 'ng2-charts'
import {UserService} from 'src/app/Services/Independent/user.service'
import {monthChartConfig} from 'src/app/app-core/configs/month-chart.config'
import {migrationChartConfig} from 'src/app/app-core/configs/migration-chart.config'

@Component({
    selector: 'app-migrations-demographic',
    templateUrl: './migrations-demographic.component.html',
    styleUrls: ['./migrations-demographic.component.scss'],
})
export class MigrationsDemographicComponent implements OnInit {
    constructor(
        private component: ReloadService,
        private service: LocalMigrationDataService,
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

    subscriptions = new Subscription()

    readonly Colors: Color[] = [
        {backgroundColor: '#EF6C00'},
        {backgroundColor: '#0D47AA'},
        {backgroundColor: '#FBBB25'},
    ]

    statisticalChart = {...monthChartConfig}

    migrationChart = {...migrationChartConfig}

    summaries: any = {}

    location: any = {
        barangay: null,
        municipality: null,
        year: null,
    }

    migrationByMunicipality: any = []

    migrationByMunicipalityKeys: any = [
        'municipality',
        'total_in_migrations',
        'total_out_migrations',
        'net_migrations',
    ]

    migrationByMunicipalityHeaders = [
        'Municipality',
        'In-Migration Rate (per 100 population)',
        'Out-Migration Rate(per 100 population)',
        'Net Migration Rate(per 100 population)',
    ]

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    fetch(event: any) {
        this.location = event
        this.getLocalData()
        this.getMigrationChart()
        this.getSummary()
        this.getMigrationByMunicipality()
    }

    getSummary() {
        new BaseService(
            this.service.http,
            'migration-statistics/summary',
            `year=${this.location['year']}`,
        )
            .index()
            .subscribe((data) => {
                this.summaries = data
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

    localData: any = {}
    getLocalData() {
        this.localData = {
            total_in_migrations: 0,
            total_out_migrations: 0,
            net_migrations: 0,
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

    getMigrationChart() {
        new BaseService(this.service.http, 'migration-chart', '')
            .index()
            .subscribe((data: any) => {
                let labels: any = []
                let datasets: any = [
                    {
                        data: [],
                        label: 'In Migration',
                    },
                    {
                        data: [],
                        label: 'Out Migration',
                    },
                    {
                        data: [],
                        label: 'Net Migration',
                    },
                ]

                let minimum: number[] = []

                for (let index of data) {
                    for (let key in index) {
                        if (index[key] < 0) {
                            minimum.push(index[key])
                        }
                    }
                    labels.push(index.year)
                    datasets[0].data.push(index.total_in_migrations)
                    datasets[1].data.push(index.total_out_migrations)
                    datasets[2].data.push(index.net_migrations)
                }

                this.migrationChart.options.scales.yAxes[0].ticks.min =
                    minimum.sort()[0]

                this.migrationChart.labels = labels

                this.migrationChart.datasets = datasets
            })
    }

    getMigrationByMunicipality() {
        new BaseService(
            this.service.http,
            'migration-statistics-by-municipality',
            `year=${this.location['year']}`,
        )
            .index()
            .subscribe((data) => {
                this.migrationByMunicipality = data
            })
    }
}

type Statistic = {
    males: number
    females: number
    total: number
    month: number
}
