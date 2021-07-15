import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddDeathData',
	templateUrl: './add-death-data.component.html',
	styleUrls: ['./add-death-data.component.scss'],
})
export class AddDeathDataComponent implements OnInit {
	constructor() {}

	types = ['Provincial', 'Muncipality', 'Barangay']

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
