import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeBirthData',
	templateUrl: './customize-birth-data.component.html',
	styleUrls: ['./customize-birth-data.component.scss'],
})
export class CustomizeBirthDataComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
