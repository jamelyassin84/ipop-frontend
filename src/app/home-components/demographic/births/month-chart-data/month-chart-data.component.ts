import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'
import { MonthChartData } from './MonthChart'

@Component({
	selector: 'CustomizeMonthChart',
	templateUrl: './month-chart-data.component.html',
	styleUrls: ['./month-chart-data.component.scss'],
})
export class MonthChartDataComponent implements OnInit {
	constructor() {}
	types = ['Provincial', 'Muncipality', 'Barangay']

	males: any = MonthChartData.males
	females: any = MonthChartData.females

	ngOnInit(): void {}

	tabs: any = {
		males: true,
		famales: false,
	}

	changeTab(tab: any) {
		for (let key in this.tabs) {
			this.tabs[key] = false
		}
		this.tabs[tab] = true
	}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
