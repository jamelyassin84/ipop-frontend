import { LocalMigrationDataService } from './../../../Services/home/demographic/migrations/local-migration-data.service'
import { MonthChartConfig } from './../MonthChart'
import { Component, OnInit } from '@angular/core'
import { MigrationChartConfig } from '../MigrationChart'
import { ReloadService } from 'src/app/Services/reload.service'
import { MonthChartService } from 'src/app/Services/home/demographic/month-chart.service'
import { BaseService } from 'src/app/Services/base.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-migrations-demographic',
	templateUrl: './migrations-demographic.component.html',
	styleUrls: ['./migrations-demographic.component.scss'],
})
export class MigrationsDemographicComponent implements OnInit {
	constructor(
		private component: ReloadService,
		private service: LocalMigrationDataService,
		private monthChartService: MonthChartService
	) {
		this.subscriptions.add(
			this.component.shouldReload().subscribe(() => {
				this.ngOnInit()
				this.fetch(this.location)
			})
		)
	}

	private subscriptions = new Subscription()

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	ngOnInit(): void {}

	summaries: any = {}

	location: any = {
		barangay: null,
		municipality: null,
		year: null,
	}
	fetch(event: any) {
		this.location = event
		this.getChart()
		this.getLocalData()
		this.getSummary()
		this.getMigrationByMunicipality()
	}

	getSummary() {
		new BaseService(
			this.service.http,
			'migration-statistics/summary',
			`year=${this.location['year']}`
		)
			.index()
			.subscribe((data) => {
				this.summaries = data
			})
	}

	getChart() {
		const service = new BaseService(
			this.service.http,
			this.monthChartService.url,
			`municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}&type=Migration`
		)
		service.index().subscribe((months: any) => {
			this.processStatisticalChart(months)
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

	localData: Summary | any = {}
	getLocalData() {
		this.localData = {
			total_in_migrations: 0,
			total_out_migrations: 0,
			net_migrations: 0,
		}
		const service = new BaseService(
			this.service.http,
			this.service.url,
			`municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}`
		)
		service.index().subscribe((summaries: Summary) => {
			this.localData = summaries?.data || {}
			if (summaries != null) {
				this.migrationChart.datasets[0].data = [
					summaries.data.total_in_migrations,
					summaries.data.total_out_migrations,
					summaries.data.net_migrations,
				]
			}
		})
	}

	migrationByMunicipalityByMunicipality: any = []
	migrationByMunicipalityByMunicipalityHeaders = [
		'Municipality',
		'In-Migration Rate (per 100 population)',
		'Out-Migration Rate(per 100 population)',
		'Net Migration Rate(per 100 population)',
	]
	getMigrationByMunicipality() {
		new BaseService(
			this.service.http,
			'migration-statistics-by-municipality',
			`year=${this.location['year']}`
		)
			.index()
			.subscribe((data) => {
				this.migrationByMunicipalityByMunicipality = data
			})
	}

	statisticalChart = MonthChartConfig
	migrationChart = MigrationChartConfig
}

type Summary = {
	total: number
	total_in_migrations: number
	total_out_migrations: number
	net_migrations: number
	incidences: any
	incidence: any
	data: any
}

type Statistic = {
	males: number
	females: number
	total: number
	month: number
}
