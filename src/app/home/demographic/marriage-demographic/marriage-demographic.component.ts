import { MarraigesService } from './../../../Services/home/demographic/marraiges/marraiges.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs'
import { BaseService } from 'src/app/Services/base.service'
import { MonthChartService } from 'src/app/Services/home/demographic/month-chart.service'
import { ReloadService } from 'src/app/Services/reload.service'
import { PopulationPyramidComponent } from '../../population/population-pyramid/population-pyramid.component'
import { MonthChartConfig } from '../MonthChart'

@Component({
	selector: 'app-marriage-demographic',
	templateUrl: './marriage-demographic.component.html',
	styleUrls: ['./marriage-demographic.component.scss'],
})
export class MarriageDemographicComponent implements OnInit {
	@ViewChild(PopulationPyramidComponent) pyramid: any

	constructor(
		private component: ReloadService,
		private service: MarraigesService,
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

	location: any = {
		barangay: null,
		municipality: null,
		year: null,
	}
	fetch(event: any) {
		this.location = event
		this.getSummary()
		this.getChart()
		this.getLocalData()
		this.getMarriagesByMuncipality()
	}

	summaries: any = {}
	getSummary() {
		new BaseService(
			this.service.http,
			'marriage-statistics/summary',
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
			`municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}&type=Marriage`
		)
		service.index().subscribe((months: any) => {
			this.processStatisticalChart(months)
		})
	}

	localData: Summary | any = {}
	getLocalData() {
		this.localData = {
			total: 0,
			crude_death_rate: 0,
		}
		const service = new BaseService(
			this.service.http,
			this.service.url,
			`municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}`
		)
		service.index().subscribe((summaries: Summary) => {
			this.localData = summaries?.data || {}
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

	marriagesByMuncipality: any = []
	marriagesByMuncipalityKeys: any = [
		'municipality',
		'population',
		'total_marriages',
		'church',
		'civil',
		'others',
	]
	marriagesByMuncipalityHeaders = [
		'Municipality',
		'Population',
		'Totla Marriages',
		'Church',
		'Civil',
		'Others',
	]
	getMarriagesByMuncipality() {
		new BaseService(
			this.service.http,
			'marriage-statistics-by-municipality',
			`year=${this.location['year']}`
		)
			.index()
			.subscribe((data) => {
				this.marriagesByMuncipality = data
				this.pyramid.fetch()
			})
	}

	statisticalChart = MonthChartConfig
	ngOnInit(): void {}

	getPercentage(value: number, basis: number) {
		return (value * 100) / basis
	}
}
type Summary = {
	total: number
	crude_death_rate: number
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
