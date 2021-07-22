import { Component, OnInit } from '@angular/core'
import { Created, Fire, HasApprovals } from 'src/app/components/Alert'
import { AhydTeamService } from 'src/app/Services/home/ahyd/teen-center/ahyd-team.service'

@Component({
	selector: 'AddAHYDTeam',
	templateUrl: './add-focal-ahyd-team.component.html',
	styleUrls: ['./add-focal-ahyd-team.component.scss'],
})
export class AddFocalAhydTeamComponent implements OnInit {
	constructor(private service: AhydTeamService) {}

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
