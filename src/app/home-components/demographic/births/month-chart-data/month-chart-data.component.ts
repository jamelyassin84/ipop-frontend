import { MonthChartService } from './../../../../Services/home/demographic/month-chart.service'
import { Component, Input, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeMonthChart',
	templateUrl: './month-chart-data.component.html',
	styleUrls: ['./month-chart-data.component.scss'],
})
export class MonthChartDataComponent implements OnInit {
	constructor(private service: MonthChartService) {}

	ngOnInit(): void {
		console.log(this.location)
	}

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

	@Input() location: any = {}
	data: any = {
		males: {
			January: 0,
			February: 0,
			March: 0,
			April: 0,
			May: 0,
			June: 0,
			July: 0,
			August: 0,
			September: 0,
			October: 0,
			November: 0,
			December: 0,
		},
		females: {
			January: 0,
			February: 0,
			March: 0,
			April: 0,
			May: 0,
			June: 0,
			July: 0,
			August: 0,
			September: 0,
			October: 0,
			November: 0,
			December: 0,
		},
		type: 'Birth',
	}

	save() {
		this.data.municipality = this.location.municipality
		this.data.barangay = this.location.barangay
		this.data.year = parseInt(this.location.year)
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.data['months'] = this.data.males
			this.data['gender'] = 'male'
			this.service.create(this.data).subscribe(() => {
				Created()
			})
		})
	}
}
