import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'MPC-FDC-Personnel',
	templateUrl: './approval-mpcfdcpersonnel.component.html',
	styleUrls: ['./approval-mpcfdcpersonnel.component.scss'],
})
export class ApprovalMPCFDCPersonnelComponent implements OnInit {
	constructor() {}

	@Input() data: any = ''

	ngOnInit(): void {}
}
