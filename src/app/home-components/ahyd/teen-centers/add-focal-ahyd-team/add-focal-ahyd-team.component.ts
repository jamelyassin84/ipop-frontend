import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddAHYDTeam',
	templateUrl: './add-focal-ahyd-team.component.html',
	styleUrls: ['./add-focal-ahyd-team.component.scss'],
})
export class AddFocalAhydTeamComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
