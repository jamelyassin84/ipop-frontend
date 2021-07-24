import { Component, OnInit } from '@angular/core'
import { Fire, HasApprovals } from 'src/app/modules/extras/Alert'
import { AgeDistributionAndAgeDependecyRatioService } from 'src/app/Services/home/population/age-distribution-and-age-dependecy-ratio.service'

@Component({
	selector: 'AgeDistributionAndDependecyRatio',
	templateUrl: './add-age-distribution-and-dependency-ratio.component.html',
	styleUrls: ['./add-age-distribution-and-dependency-ratio.component.scss'],
})
export class AddAgeDistributionAndDependencyRatioComponent implements OnInit {
	constructor(private service: AgeDistributionAndAgeDependecyRatioService) {}

	ngOnInit(): void {}

	data: any = {
		barangay: null,
		municipality: null,
		year: null,
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
