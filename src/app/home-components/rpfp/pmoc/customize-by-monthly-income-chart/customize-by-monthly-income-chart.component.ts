import { AverageMonthlyIncomeService } from './../../../../Services/home/rpfp/pmoc/average-monthly-income.service'
import { Component, OnInit } from '@angular/core'
import { Created, Fire, HasApprovals } from 'src/app/modules/extras/Alert'

@Component({
	selector: 'CustomizeByMonthlyIncomeChart',
	templateUrl: './customize-by-monthly-income-chart.component.html',
	styleUrls: ['./customize-by-monthly-income-chart.component.scss'],
})
export class CustomizeByMonthlyIncomeChartComponent implements OnInit {
	constructor(private service: AverageMonthlyIncomeService) {}

	ngOnInit(): void {}

	data: any = {
		barangay: null,
		municipality: null,
		year: null,
		gender: 'male',
	}

	fetch(event: any) {
		this.data.barangay = event.barangay
		this.data.municipality = event.municipality
		this.data.year = event.year
	}

	isLoading: boolean = false
	save() {
		Fire(
			'Save Changes?',
			'Are you sure you want to add this data?',
			'info',
			() => {
				this.isLoading = true
				this.service.create(this.data).subscribe(() => {
					HasApprovals('Created')
					this.isLoading = false
				})
			}
		)
	}
}
