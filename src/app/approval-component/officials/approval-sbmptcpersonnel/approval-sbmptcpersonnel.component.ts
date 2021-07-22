import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'Teen-Center-Personnel-Incharge',
	templateUrl: './approval-sbmptcpersonnel.component.html',
	styleUrls: ['./approval-sbmptcpersonnel.component.scss'],
})
export class ApprovalSBMPTCPersonnelComponent implements OnInit {
	constructor() {}

	@Input() data: any = ''

	ngOnInit(): void {}
}
