import { Fire } from 'src/app/components/Alert'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'AddMPCFDCTeam',
	templateUrl: './add-mpc-fdc-team.component.html',
	styleUrls: ['./add-mpc-fdc-team.component.scss'],
})
export class AddMpcFdcTeamComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
