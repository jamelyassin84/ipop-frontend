import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddServices',
	templateUrl: './add-services.component.html',
	styleUrls: ['./add-services.component.scss'],
})
export class AddServicesComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this article?', 'info', () => {})
	}
}
