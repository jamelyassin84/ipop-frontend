import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddProgram',
	templateUrl: './add-program.component.html',
	styleUrls: ['./add-program.component.scss'],
})
export class AddProgramComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this article?', 'info', () => {})
	}
}
