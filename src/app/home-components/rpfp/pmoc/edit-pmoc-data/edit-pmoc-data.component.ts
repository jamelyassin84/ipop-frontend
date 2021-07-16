import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'EditPMOCData',
	templateUrl: './edit-pmoc-data.component.html',
	styleUrls: ['./edit-pmoc-data.component.scss'],
})
export class EditPmocDataComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
