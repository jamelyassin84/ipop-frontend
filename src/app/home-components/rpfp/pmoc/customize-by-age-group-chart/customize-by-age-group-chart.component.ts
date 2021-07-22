import { Component, OnInit } from '@angular/core'
import { Created, Fire, HasApprovals } from 'src/app/components/Alert'
import { AgeGroupService } from 'src/app/Services/home/rpfp/pmoc/age-group.service'

@Component({
	selector: 'CustomizeByAgeGroupChart',
	templateUrl: './customize-by-age-group-chart.component.html',
	styleUrls: ['./customize-by-age-group-chart.component.scss'],
})
export class CustomizeByAgeGroupChartComponent implements OnInit {
	constructor(private service: AgeGroupService) {}

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
