import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddLocalDeathData',
	templateUrl: './add-local-death-data.component.html',
	styleUrls: ['./add-local-death-data.component.scss'],
})
export class AddLocalDeathDataComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
