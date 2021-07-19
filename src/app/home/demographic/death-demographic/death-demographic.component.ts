import { Component, OnInit } from '@angular/core'
import { CrudeDeathRateIncidenceChartConfig } from '../CrudeDeathRate'
import { MonthChartConfig } from '../MonthChart'

@Component({
	selector: 'app-death-demographic',
	templateUrl: './death-demographic.component.html',
	styleUrls: ['./death-demographic.component.scss'],
})
export class DeathDemographicComponent implements OnInit {
	constructor() {}
	statisticalChart = MonthChartConfig
	crudeDeathRate = CrudeDeathRateIncidenceChartConfig

	ngOnInit(): void {}
}
