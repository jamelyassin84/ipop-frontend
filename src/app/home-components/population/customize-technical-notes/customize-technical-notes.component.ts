import { TechnicalNotesService } from './../../../Services/home/others/technical-notes.service'
import { Component, Input, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeTechnicalNotes',
	templateUrl: './customize-technical-notes.component.html',
	styleUrls: ['./customize-technical-notes.component.scss'],
})
export class CustomizeTechnicalNotesComponent implements OnInit {
	constructor(private service: TechnicalNotesService) {}

	ngOnInit(): void {}
	@Input() type = ''
	data: any = {}
	save() {
		this.data.type = this.type
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.service.create(this.data).subscribe((data) => {
				Created()
			})
		})
	}
}
