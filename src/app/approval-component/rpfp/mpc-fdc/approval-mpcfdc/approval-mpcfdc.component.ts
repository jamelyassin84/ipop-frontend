import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'MPC-FDC',
	templateUrl: './approval-mpcfdc.component.html',
	styleUrls: ['./approval-mpcfdc.component.scss'],
})
export class ApprovalMPCFDCComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
