import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddQuickLinks',
	templateUrl: './add-quick-links.component.html',
	styleUrls: ['./add-quick-links.component.scss'],
})
export class AddQuickLinksComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	saveQuickLink() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
