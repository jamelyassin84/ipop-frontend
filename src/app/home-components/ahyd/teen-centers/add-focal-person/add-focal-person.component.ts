import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddFocalPersons',
	templateUrl: './add-focal-person.component.html',
	styleUrls: ['./add-focal-person.component.scss'],
})
export class AddFocalPersonComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
