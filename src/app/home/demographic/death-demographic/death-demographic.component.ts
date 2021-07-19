import { LocalDeathDataService } from './../../../Services/home/demographic/deaths/local-death-data.service'
import { Component, OnInit } from '@angular/core'
import { SummaryService } from 'src/app/Services/home/demographic/summary.service'
import { ReloadService } from 'src/app/Services/reload.service'
import { CrudeDeathRateIncidenceChartConfig } from '../CrudeDeathRate'
import { MonthChartConfig } from '../MonthChart'
import { MonthChartService } from 'src/app/Services/home/demographic/month-chart.service'
import { BaseService } from 'src/app/Services/base.service'

@Component({
	selector: 'app-death-demographic',
	templateUrl: './death-demographic.component.html',
	styleUrls: ['./death-demographic.component.scss'],
})
export class DeathDemographicComponent implements OnInit {
	constructor(
		private component: ReloadService,
		private summary: SummaryService,
		private service: LocalDeathDataService,
		private monthChartService: MonthChartService
	) {
		this.component.shouldReload().subscribe(() => {
			this.ngOnInit()
			this.fetch(this.location)
		})
	}

	ngOnInit(): void {
		this.getSummary()
	}

	summaries: Summary | any = {}
	getSummary() {
		this.summary.deaths().subscribe((summaries: Summary) => {
			this.summaries = summaries
			// this.clearChart()
			// for (let index in summaries.incidences) {
			// 	if (!this.crudeDeathRate.labels.includes(summaries.incidences[index].year)) {
			// 		this.crudeDeathRate.labels.push(summaries.incidences[index].year)
			// 	}
			// 	this.crudeDeathRate.datasets[0].data.push(summaries.incidences[index].value)
			// }
		})
	}

	clearChart() {
		this.crudeDeathRate.labels = []
		this.crudeDeathRate.datasets[0].data = []
	}

	location: any = {
		barangay: null,
		municipality: null,
		year: null,
	}

	fetch(event: any) {
		this.location = event
		this.getChart()
		this.getLocalData()
	}

	getChart() {
		const service = new BaseService(
			this.service.http,
			this.monthChartService.url,
			`municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}&type=Death`
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
			this.clearChart()
			for (let index in summaries.incidence) {
				if (!this.crudeDeathRate.labels.includes(summaries.incidence[index].year)) {
					this.crudeDeathRate.labels.push(summaries.incidence[index].year)
				}
				this.crudeDeathRate.datasets[0].data.push(summaries.incidence[index].value)
			}
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

	statisticalChart = MonthChartConfig
	crudeDeathRate = CrudeDeathRateIncidenceChartConfig
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
