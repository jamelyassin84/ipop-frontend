import { Component, OnInit } from '@angular/core'
import { MonthChartConfig } from 'src/app/home/demographic/MonthChart'

@Component({
	selector: 'MonthChart',
	templateUrl: './approval-month-chart.component.html',
	styleUrls: ['./approval-month-chart.component.scss'],
})
export class ApprovalMonthChartComponent implements OnInit {
	constructor() {}

	statisticalChart = MonthChartConfig
	ngOnInit(): void {}
}
