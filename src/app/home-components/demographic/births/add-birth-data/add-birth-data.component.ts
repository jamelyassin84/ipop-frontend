import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddBirthData',
	templateUrl: './add-birth-data.component.html',
	styleUrls: ['./add-birth-data.component.scss'],
})
export class AddBirthDataComponent implements OnInit {
	constructor() {}

	types = ['Provincial', 'Muncipality', 'Barangay']

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
