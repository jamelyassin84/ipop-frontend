import { Fire } from 'src/app/components/Alert'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'AddMPCFDCPersonnelIncharge',
	templateUrl: './add-personnel-incharge.component.html',
	styleUrls: ['./add-personnel-incharge.component.scss'],
})
export class AddPersonnelInchargeComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
