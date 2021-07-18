import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddPopulationProfile',
	templateUrl: './add-population-profile.component.html',
	styleUrls: ['./add-population-profile.component.scss'],
})
export class AddPopulationProfileComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	location: any = {
		barangay: null,
		municipality: null,
	}
	fetch(event: any) {
		this.location = event
	}
	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
