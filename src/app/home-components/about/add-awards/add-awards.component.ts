import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddAwards',
	templateUrl: './add-awards.component.html',
	styleUrls: ['./add-awards.component.scss'],
})
export class AddAwardsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this article?', 'info', () => {})
	}
}
