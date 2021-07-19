import { SummaryService } from './../../../Services/home/demographic/summary.service'
import { Component, OnInit } from '@angular/core'
import { ReloadService } from 'src/app/Services/reload.service'
import { MonthChartConfig } from '../MonthChart'
import { groupBy } from 'src/app/constants/helpers'
import { IllegitimateIncidenceChartConfig } from '../illegitamate'
import { TeenageIncidenceChartConfig } from '../Incidence.Chart'

@Component({
	selector: 'app-birth-demographic',
	templateUrl: './birth-demographic.component.html',
	styleUrls: ['./birth-demographic.component.scss'],
})
export class BirthDemographicComponent implements OnInit {
	constructor(private component: ReloadService, private summary: SummaryService) {
		this.component.shouldReload().subscribe(() => {
			this.ngOnInit()
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
		let teenageBirth = incidences[1]
		let illegitimateBirth = incidences[0]
		this.teenageChart.labels = []
		this.incidenceChart.labels = []
		this.teenageChart.datasets[0].data = []
		this.incidenceChart.datasets[0].data = []
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
		console.log('teenageBirth', teenageBirth)
		console.log('illegitimateBirth', illegitimateBirth)
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

	getLocalData() {}

	getIncidences() {}

	statisticalChart: any = MonthChartConfig
}

type Summary = {
	crude_birth_rate: number
	general_fertility_rate: number
	incidences: any
	total: number
	total_live_births: number
}
