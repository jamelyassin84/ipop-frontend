import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddOfficials',
	templateUrl: './add-officials.component.html',
	styleUrls: ['./add-officials.component.scss'],
})
export class AddOfficialsComponent implements OnInit {
	constructor() {}

	types = ['Provincial Official', 'Sanguniang Panlalawigan Member', 'Municipal Official', 'Barangay Official']

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
