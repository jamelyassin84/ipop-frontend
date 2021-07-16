import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeCoupleChart',
	templateUrl: './customize-couple-chart.component.html',
	styleUrls: ['./customize-couple-chart.component.scss'],
})
export class CustomizeCoupleChartComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
