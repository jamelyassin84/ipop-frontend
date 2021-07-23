import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'Teen-Center-AHYD-Team',
	templateUrl: './approval-sbmptcteam.component.html',
	styleUrls: ['./approval-sbmptcteam.component.scss'],
})
export class ApprovalSBMPTCTeamComponent implements OnInit {
	constructor() {}

	@Input() data: any = ''

	ngOnInit(): void {}
}
