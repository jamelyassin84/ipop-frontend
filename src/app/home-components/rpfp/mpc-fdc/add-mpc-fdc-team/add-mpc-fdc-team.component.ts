import { MpcFdcTeamService } from './../../../../Services/home/rpfp/mpc-fdc/mpc-fdc-team.service'
import { Fire, HasApprovals } from 'src/app/modules/extras/Alert'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'AddMPCFDCTeam',
	templateUrl: './add-mpc-fdc-team.component.html',
	styleUrls: ['./add-mpc-fdc-team.component.scss'],
})
export class AddMpcFdcTeamComponent implements OnInit {
	constructor(private service: MpcFdcTeamService) {}

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
