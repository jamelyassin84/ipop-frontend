import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeByAgeGroupChart',
	templateUrl: './customize-by-age-group-chart.component.html',
	styleUrls: ['./customize-by-age-group-chart.component.scss'],
})
export class CustomizeByAgeGroupChartComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
