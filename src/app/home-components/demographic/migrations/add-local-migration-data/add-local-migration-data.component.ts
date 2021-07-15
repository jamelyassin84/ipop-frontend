import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddLocalMigrationData',
	templateUrl: './add-local-migration-data.component.html',
	styleUrls: ['./add-local-migration-data.component.scss'],
})
export class AddLocalMigrationDataComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
