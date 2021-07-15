import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddMigrationData',
	templateUrl: './add-migration-data.component.html',
	styleUrls: ['./add-migration-data.component.scss'],
})
export class AddMigrationDataComponent implements OnInit {
	constructor() {}

	types = ['Provincial', 'Muncipality', 'Barangay']

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
