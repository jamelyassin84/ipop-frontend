import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddTopPopulated',
	templateUrl: './top-populated.component.html',
	styleUrls: ['./top-populated.component.scss'],
})
export class TopPopulatedComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
