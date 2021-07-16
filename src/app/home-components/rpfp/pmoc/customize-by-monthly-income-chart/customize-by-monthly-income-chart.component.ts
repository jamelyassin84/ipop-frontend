import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeByMonthlyIncomeChart',
	templateUrl: './customize-by-monthly-income-chart.component.html',
	styleUrls: ['./customize-by-monthly-income-chart.component.scss'],
})
export class CustomizeByMonthlyIncomeChartComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
