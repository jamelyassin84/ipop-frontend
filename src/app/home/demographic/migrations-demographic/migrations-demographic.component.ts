import {map, tap} from 'rxjs/operators'
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
import {AppState} from 'src/app/app-core/store/core/app.state'
import {select, Store} from '@ngrx/store'
import {StateEnum} from 'src/app/app-core/store/core/state.enum'
import {TransformEntity} from 'src/@digital_brand_work/helpers/entity.helper'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'

@Component({
    selector: 'app-migrations-demographic',
    templateUrl: './migrations-demographic.component.html',
    styleUrls: ['./migrations-demographic.component.scss'],
    animations: [...dbwAnimations],
})
export class MigrationsDemographicComponent implements OnInit {
    constructor(
        private user: UserService,
        private _store: Store<AppState>,
        private component: ReloadService,
        private service: LocalMigrationDataService,
    ) {
        this.subscriptions.add(
            this.component.shouldReload().subscribe(() => {
                this.ngOnInit()
                this.fetch(this.location)
            }),
        )
    }

    readonly isUser = !this.user.isAdmin()

    readonly isSuperAdmin = !this.user.isStaff()

    readonly Colors: Color[] = [
        {backgroundColor: '#EF6C00'},
        {backgroundColor: '#0D47AA'},
        {backgroundColor: '#FBBB25'},
        {backgroundColor: 'white'},
    ]

    location$ = this._store.pipe(
        select(StateEnum.LOCATION_FILTERS),
        map((x) => new TransformEntity(x).toObject()),
        tap((location) => {
            if (location) {
                this.location = {...location}
            }
        }),
    )

    readonly migrationByMunicipalityKeys: any = [
        'municipality',
        'total_in_migrations',
        'total_out_migrations',
        'net_migrations',
    ]

    readonly migrationByMunicipalityHeaders = [
        'Municipality',
        'Total In-Migration',
        ' Total Out-Migration',
        'Net Migration Rate/100 population',
    ]

    subscriptions = new Subscription()

    statisticalChart = {...monthChartConfig}

    migrationChart = {...migrationChartConfig}

    localData: any = {}

    summaries: any = undefined

    location: LocationFIlter = {
        year: null,
        barangay: null,
        municipality: null,
    }

    migrationByMunicipality: any = []

    monthChartData: Statistic[] = []

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    fetch(location: LocationFIlter) {
        this.location = {...this.location, ...location}

        this.getSummary()
        this.getLocalData()
        this.getMigrationChart()
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

    getLocalData() {
        this.localData = {
            total_in_migrations: 0,
            total_out_migrations: 0,
            net_migrations: 0,
        }

        new BaseService(
            this.service.http,
            this.service.url,
            `${new URLSearchParams({
                year: this.location!.year!.toString(),
                barangay: this.location?.barangay ?? 'null',
                municipality: this.location?.municipality ?? 'null',
            })}`,
        )
            .index()
            .subscribe((summaries: any) => {
                this.localData = summaries?.data || {}
                this.monthChartData = summaries.month
                this.processStatisticalChart(summaries.month)
            })
    }

    processStatisticalChart(months: Statistic[]) {
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

        months.forEach((data) => {
            if (!labels.includes(data.month)) {
                labels.push(data.month)
            }

            total.push(data.total)
            males.push(data.males)
            females.push(data.females)
        })

        this.statisticalChart.labels = labels
        this.statisticalChart.datasets[1].data = males
        this.statisticalChart.datasets[2].data = total
        this.statisticalChart.datasets[0].data = females
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

                for (let migration of data) {
                    if (migration.year != 2100) {
                        labels.push(`Yr ${migration.year}`)

                        datasets[2].data.push(
                            migration.total_in_migrations -
                                migration.total_out_migrations,
                        )
                        datasets[0].data.push(migration.total_in_migrations)
                        datasets[1].data.push(migration.total_out_migrations)
                    }
                }

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

export interface Statistic {
    males: number
    females: number
    total: number
    month: number
}
