import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'
import { PersonnelTypes } from 'src/app/home/about/personnel-directory/PersonnelTypes'

@Component({
	selector: 'AddPersonnelDirectory',
	templateUrl: './add-personnel-directory.component.html',
	styleUrls: ['./add-personnel-directory.component.scss'],
})
export class AddPersonnelDirectoryComponent implements OnInit {
	constructor() {}

	types = PersonnelTypes

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
