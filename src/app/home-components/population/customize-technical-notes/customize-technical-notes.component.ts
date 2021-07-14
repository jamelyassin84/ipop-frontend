import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeTechnicalNotes',
	templateUrl: './customize-technical-notes.component.html',
	styleUrls: ['./customize-technical-notes.component.scss'],
})
export class CustomizeTechnicalNotesComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
