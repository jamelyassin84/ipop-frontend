import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeByCivilStatusChart',
	templateUrl: './customize-by-civil-status-chart.component.html',
	styleUrls: ['./customize-by-civil-status-chart.component.scss'],
})
export class CustomizeByCivilStatusChartComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
