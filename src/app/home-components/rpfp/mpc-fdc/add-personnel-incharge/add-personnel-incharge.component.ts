import { MpcFdcPersonnelInchargeService } from './../../../../Services/home/rpfp/mpc-fdc/mpc-fdc-personnel-incharge.service'
import { Created, Fire } from 'src/app/components/Alert'
import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'AddMPCFDCPersonnelIncharge',
	templateUrl: './add-personnel-incharge.component.html',
	styleUrls: ['./add-personnel-incharge.component.scss'],
})
export class AddPersonnelInchargeComponent implements OnInit {
	constructor(private service: MpcFdcPersonnelInchargeService) {}

	ngOnInit(): void {}

	@Input() mpcfdc_id: any
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
			this.data.mpcfdc_id = this.mpcfdc_id
			this.service.create(this.data).subscribe(() => {
				Created()
			})
		})
	}
}
