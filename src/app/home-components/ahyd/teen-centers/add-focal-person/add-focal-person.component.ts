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

	image: any = '../../../../../assets/avatars/face-7.jpg'

	readURL(event: any) {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader()
			reader.readAsDataURL(event.target.files[0])
			reader.onload = (event: any) => {
				this.data.photo = event.target.result
				this.image = event.target.result
			}
		}
	}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.service.create(this.data).subscribe(() => {
				Created()
			})
		})
	}
}
