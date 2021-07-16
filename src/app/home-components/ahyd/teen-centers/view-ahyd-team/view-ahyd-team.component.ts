import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'ViewHAYDTeam',
	templateUrl: './view-ahyd-team.component.html',
	styleUrls: ['./view-ahyd-team.component.scss'],
})
export class ViewAhydTeamComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	remove() {
		Fire('Remove Data?', 'Are you sure you want to remove this data?', 'info', () => {})
	}
}
