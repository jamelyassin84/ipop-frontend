import { Component, OnInit } from '@angular/core'
import { Created, Fire, HasApprovals } from 'src/app/components/Alert'
import { PopulationProfileService } from 'src/app/Services/home/population/population-profile.service'

@Component({
	selector: 'AddPopulationProfile',
	templateUrl: './add-population-profile.component.html',
	styleUrls: ['./add-population-profile.component.scss'],
})
export class AddPopulationProfileComponent implements OnInit {
	constructor(private service: PopulationProfileService) {}

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
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.isLoading = true
			this.service.create(this.data).subscribe(() => {
				HasApprovals('Created')
				this.isLoading = false
			})
		})
	}
}
