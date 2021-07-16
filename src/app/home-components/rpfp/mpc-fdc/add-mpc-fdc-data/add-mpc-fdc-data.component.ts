import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddMPCFDCData',
	templateUrl: './add-mpc-fdc-data.component.html',
	styleUrls: ['./add-mpc-fdc-data.component.scss'],
})
export class AddMpcFdcDataComponent implements OnInit {
	constructor() {}
	districts = ['I', 'II', 'III', 'IV', 'V']
	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
