import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeByEmploymentStatusChart',
	templateUrl: './customize-by-age-employment-status-chart.component.html',
	styleUrls: ['./customize-by-age-employment-status-chart.component.scss'],
})
export class CustomizeByAgeEmploymentStatusChartComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
