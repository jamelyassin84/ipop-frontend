import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddTeenCenter',
	templateUrl: './add-teen-center.component.html',
	styleUrls: ['./add-teen-center.component.scss'],
})
export class AddTeenCenterComponent implements OnInit {
	constructor() {}

	districts = ['I', 'II', 'III', 'IV', 'V']
	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
