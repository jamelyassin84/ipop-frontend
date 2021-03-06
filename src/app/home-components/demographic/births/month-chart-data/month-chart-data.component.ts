import { MonthChartService } from './../../../../Services/home/demographic/month-chart.service'
import { Component, Input, OnInit } from '@angular/core'
import { Created, Fire, HasApprovals } from 'src/app/modules/extras/Alert'

@Component({
	selector: 'CustomizeMonthChart',
	templateUrl: './month-chart-data.component.html',
	styleUrls: ['./month-chart-data.component.scss'],
})
export class MonthChartDataComponent implements OnInit {
	constructor(private service: MonthChartService) {}

	ngOnInit(): void {}
	@Input() single: boolean = false
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
	@Input() type: any = ''
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
	}

	isLoading: boolean = false
	save() {
		this.data.type = this.type
		this.data.municipality = this.location.municipality
		this.data.barangay = this.location.barangay
		this.data.year = parseInt(this.location.year)
		Fire(
			'Save Changes?',
			'Are you sure you want to add this data?',
			'info',
			() => {
				this.data['months'] = this.data.males
				this.data['gender'] = 'male'
				this.isLoading = true
				this.service.create(this.data).subscribe(() => {
					HasApprovals('Created')
					this.isLoading = false
				})
			}
		)
	}
}
