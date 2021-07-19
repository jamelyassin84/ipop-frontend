import { SummaryService } from './../../../Services/home/demographic/summary.service'
import { Component, OnInit } from '@angular/core'
import { ReloadService } from 'src/app/Services/reload.service'
import { IncidenceChartConfig } from '../Incidence.Chart'
import { MonthChartConfig } from '../MonthChart'

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
		})
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

	statisticalChart = MonthChartConfig
	incidenceChart = IncidenceChartConfig
	teenageChart = IncidenceChartConfig
}

type Summary = {
	crude_birth_rate: number
	general_fertility_rate: number
	incidences: any
	total: number
	total_live_births: number
}
