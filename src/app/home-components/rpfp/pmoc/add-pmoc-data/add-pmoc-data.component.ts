import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddPMOCData',
	templateUrl: './add-pmoc-data.component.html',
	styleUrls: ['./add-pmoc-data.component.scss'],
})
export class AddPmocDataComponent implements OnInit {
	constructor() {}
	types = ['Provincial', 'Muncipality', 'Barangay']

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
