import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'MPC-FDC-Team',
	templateUrl: './approval-mpcfdcteam.component.html',
	styleUrls: ['./approval-mpcfdcteam.component.scss'],
})
export class ApprovalMPCFDCTeamComponent implements OnInit {
	constructor() {}

	@Input() data: any = ''

	ngOnInit(): void {}
}
