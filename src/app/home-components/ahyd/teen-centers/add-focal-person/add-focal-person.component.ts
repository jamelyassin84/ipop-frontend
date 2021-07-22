import { Component, OnInit } from '@angular/core'
import { Created, Fire, HasApprovals } from 'src/app/components/Alert'
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

	isLoading: boolean = false
	save() {
		Fire(
			'Save Changes?',
			'Are you sure you want to add this data?',
			'info',
			() => {
				this.isLoading = true
				this.service.create(this.data).subscribe(() => {
					HasApprovals('Created')
					this.isLoading = false
				})
			}
		)
	}
}
