import { Fire } from 'src/app/components/Alert'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'ViewMPCFDCTeam',
	templateUrl: './view-mpc-fdc-team.component.html',
	styleUrls: ['./view-mpc-fdc-team.component.scss'],
})
export class ViewMpcFdcTeamComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	remove() {
		Fire('Remove Data?', 'Are you sure you want to remove this data?', 'info', () => {})
	}
}
