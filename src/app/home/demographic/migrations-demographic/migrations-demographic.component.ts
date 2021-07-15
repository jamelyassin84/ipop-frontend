import { MonthChartConfig } from './../MonthChart'
import { Component, OnInit } from '@angular/core'
import { MigrationChartConfig } from '../MigrationChart'

@Component({
	selector: 'app-migrations-demographic',
	templateUrl: './migrations-demographic.component.html',
	styleUrls: ['./migrations-demographic.component.scss'],
})
export class MigrationsDemographicComponent implements OnInit {
	constructor() {}
	statisticalChart = MonthChartConfig
	migrationChart = MigrationChartConfig
	ngOnInit(): void {}
}
