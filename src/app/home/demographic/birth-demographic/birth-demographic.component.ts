import { years } from 'src/app/constants/AppConstants'
import { LocalBirthDataService } from './../../../Services/home/demographic/births/local-birth-data.service'
import { SummaryService } from './../../../Services/home/demographic/summary.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { ReloadService } from 'src/app/Services/reload.service'
import { MonthChartConfig } from '../MonthChart'
import { groupBy } from 'src/app/constants/helpers'
import { IllegitimateIncidenceChartConfig } from '../illegitamate'
import { TeenageIncidenceChartConfig } from '../Incidence.Chart'
import { BaseService } from 'src/app/Services/base.service'
import { MonthChartService } from 'src/app/Services/home/demographic/month-chart.service'
import { Subscription } from 'rxjs'
import { PopulationPyramidComponent } from '../../population/population-pyramid/population-pyramid.component'

@Component({
	selector: 'app-birth-demographic',
	templateUrl: './birth-demographic.component.html',
	styleUrls: ['./birth-demographic.component.scss'],
})
export class BirthDemographicComponent implements OnInit {
	@ViewChild(PopulationPyramidComponent) pyramid: any

	constructor(
		private component: ReloadService,
		private service: LocalBirthDataService,
		private monthChartService: MonthChartService
	) {
		this.subscriptions.add(
			this.component.shouldReload().subscribe(() => {
				this.fetch(this.location)
			})
		)
	}

	private subscriptions = new Subscription()

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	incidenceChart: any = IllegitimateIncidenceChartConfig
	teenageChart: any = TeenageIncidenceChartConfig
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
		}
		for (let index in illegitimateBirth) {
			if (
				!this.incidenceChart.labels.includes(
					illegitimateBirth[index].year
				)
			) {
				this.incidenceChart.labels.push(illegitimateBirth[index].year)
			}
			this.incidenceChart.datasets[0].data.push(
				illegitimateBirth[index].value
			)
		}
	}

	location: any = {
		barangay: null,
		municipality: null,
		year: null,
	}

	fetch(event: any) {
		this.getSummary()
		this.location = event
		this.getChart()
		this.getLocalData()
		this.getBIrthsByMunicipality()
		this.pyramid.ngOnint()
	}

	summaries: any = {}
	getSummary() {
		new BaseService(
			this.service.http,
			'birth-statistics/summary',
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
			`municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}`
		)
		service.index().subscribe((months: any) => {
			this.processStatisticalChart(months)
		})
	}

	localData: any = {}
	getLocalData() {
		this.localData = {}
		const service = new BaseService(
			this.service.http,
			this.service.url,
			`municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}`
		)
		service.index().subscribe((summaries: Summary) => {
			this.distribute(groupBy(summaries.incidence, 'title'))
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

	birthsByMunicipality: any = []
	getBIrthsByMunicipality() {
		new BaseService(
			this.service.http,
			'birth-statistics-by-municipality',
			`year=${this.location['year']}`
		)
			.index()
			.subscribe((data) => {
				this.birthsByMunicipality = data
			})
	}

	statisticalChart: any = MonthChartConfig
	clearChart() {
		this.teenageChart.labels = []
		this.incidenceChart.labels = []
		this.teenageChart.datasets[0].data = []
		this.incidenceChart.datasets[0].data = []
	}

	ngOnInit(): void {
		this.location.year = new Date().getFullYear()
	}

	getPercentage(value: number, basis: number) {
		return (value * 100) / basis
	}
}

type Summary = {
	crude_birth_rate: number
	general_fertility_rate: number
	incidences: any
	incidence: any
	total: number
	total_live_births: number
	data: any
}

type Statistic = {
	males: number
	females: number
	total: number
	month: number
}
