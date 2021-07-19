import { LocalBirthDataService } from './../../../Services/home/demographic/births/local-birth-data.service'
import { SummaryService } from './../../../Services/home/demographic/summary.service'
import { Component, OnInit } from '@angular/core'
import { ReloadService } from 'src/app/Services/reload.service'
import { MonthChartConfig } from '../MonthChart'
import { groupBy } from 'src/app/constants/helpers'
import { IllegitimateIncidenceChartConfig } from '../illegitamate'
import { TeenageIncidenceChartConfig } from '../Incidence.Chart'
import { BaseService } from 'src/app/Services/base.service'

@Component({
	selector: 'app-birth-demographic',
	templateUrl: './birth-demographic.component.html',
	styleUrls: ['./birth-demographic.component.scss'],
})
export class BirthDemographicComponent implements OnInit {
	constructor(
		private component: ReloadService,
		private summary: SummaryService,
		private service: LocalBirthDataService
	) {
		this.component.shouldReload().subscribe(() => {
			this.fetch(this.location)
		})
	}

	summaries: Summary | any = {}
	ngOnInit(): void {
		this.getSummary()
		this.getIncidences()
	}

	getSummary() {
		this.summary.births().subscribe((summaries: Summary) => {
			this.summaries = summaries
			this.distribute(groupBy(summaries.incidences, 'title'))
		})
	}

	incidenceChart: any = IllegitimateIncidenceChartConfig
	teenageChart: any = TeenageIncidenceChartConfig
	distribute(incidences: any) {
		console.log(incidences)
		this.clearChart()
		let illegitimateBirth = incidences[0]
		let teenageBirth = incidences[1]
		if (incidences.length !== 0 && incidences[0][0].title !== 'Incidence of Illegitimate Birth') {
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
			if (!this.incidenceChart.labels.includes(illegitimateBirth[index].year)) {
				this.incidenceChart.labels.push(illegitimateBirth[index].year)
			}
			this.incidenceChart.datasets[0].data.push(illegitimateBirth[index].value)
		}
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
		this.getIncidences()
	}

	getChart() {}

	getLocalData() {
		const service = new BaseService(
			this.service.http,
			this.service.url,
			`municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}`
		)
		service.index().subscribe((summaries: Summary) => {
			this.distribute(groupBy(summaries.incidence, 'title'))
			console.log(summaries)
		})
	}

	getIncidences() {}

	statisticalChart: any = MonthChartConfig

	clearChart() {
		this.teenageChart.labels = []
		this.incidenceChart.labels = []
		this.teenageChart.datasets[0].data = []
		this.incidenceChart.datasets[0].data = []
	}
}

type Summary = {
	crude_birth_rate: number
	general_fertility_rate: number
	incidences: any
	incidence: any
	total: number
	total_live_births: number
}
