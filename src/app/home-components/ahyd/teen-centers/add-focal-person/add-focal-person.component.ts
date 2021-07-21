import { Component, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'
import { FocalPersonsService } from 'src/app/Services/home/ahyd/teen-center/focal-persons.service'

@Component({
	selector: 'AddFocalPersons',
	templateUrl: './add-focal-person.component.html',
	styleUrls: ['./add-focal-person.component.scss'],
})
export class AddFocalPersonComponent implements OnInit {
	constructor(private service: FocalPersonsService) {}

	ngOnInit(): void {}

	data: any = {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.service.create(this.data).subscribe(() => {
				Created()
			})
		})
	}
}
