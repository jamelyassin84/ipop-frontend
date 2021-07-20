import { PersonnelDirectoryService } from './../../../Services/home/about/personnel-directory.service'
import { Component, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'
import { PersonnelTypes } from 'src/app/home/about/personnel-directory/PersonnelTypes'

@Component({
	selector: 'AddPersonnelDirectory',
	templateUrl: './add-personnel-directory.component.html',
	styleUrls: ['./add-personnel-directory.component.scss'],
})
export class AddPersonnelDirectoryComponent implements OnInit {
	constructor(private service: PersonnelDirectoryService) {}

	types = PersonnelTypes

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
