import { Component, OnInit } from '@angular/core'
import { IncidenceChartConfig } from '../Incidence.Chart'
import { MonthChartConfig } from '../MonthChart'

@Component({
	selector: 'app-birth-demographic',
	templateUrl: './birth-demographic.component.html',
	styleUrls: ['./birth-demographic.component.scss'],
})
export class BirthDemographicComponent implements OnInit {
	constructor() {}

	statisticalChart = MonthChartConfig
	incidenceChart = IncidenceChartConfig
	teenageChart = IncidenceChartConfig

	ngOnInit(): void {}
}
