import { Component, OnInit } from '@angular/core'
import { Fire, HasApprovals } from 'src/app/modules/extras/Alert'
import { EmploymentStatusService } from 'src/app/Services/home/rpfp/pmoc/employment-status.service'

@Component({
	selector: 'CustomizeByEmploymentStatusChart',
	templateUrl: './customize-by-age-employment-status-chart.component.html',
	styleUrls: ['./customize-by-age-employment-status-chart.component.scss'],
})
export class CustomizeByAgeEmploymentStatusChartComponent implements OnInit {
	constructor(private service: EmploymentStatusService) {}

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
