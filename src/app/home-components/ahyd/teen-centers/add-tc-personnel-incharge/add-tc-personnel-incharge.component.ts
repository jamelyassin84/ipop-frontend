import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddTCPersonnelIncharge',
	templateUrl: './add-tc-personnel-incharge.component.html',
	styleUrls: ['./add-tc-personnel-incharge.component.scss'],
})
export class AddTcPersonnelInchargeComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
