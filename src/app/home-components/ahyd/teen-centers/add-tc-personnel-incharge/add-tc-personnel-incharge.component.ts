import { Component, Input, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'
import { PersonnelInchargeOfTeenCenterService } from 'src/app/Services/home/ahyd/teen-center/personnel-incharge-of-teen-center.service'

@Component({
	selector: 'AddTCPersonnelIncharge',
	templateUrl: './add-tc-personnel-incharge.component.html',
	styleUrls: ['./add-tc-personnel-incharge.component.scss'],
})
export class AddTcPersonnelInchargeComponent implements OnInit {
	constructor(private service: PersonnelInchargeOfTeenCenterService) {}
	ngOnInit(): void {}

	@Input() teen_center_id: number = 0
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
			this.data.sbmptc_id = this.teen_center_id
			this.service.create(this.data).subscribe(() => {
				Created()
			})
		})
	}
}
