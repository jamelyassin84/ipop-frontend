import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'TeenCenter',
	templateUrl: './approval-sbmptc.component.html',
	styleUrls: ['./approval-sbmptc.component.scss'],
})
export class ApprovalSBMPTCComponent implements OnInit {
	constructor() {}

	@Input() data: any = ''

	ngOnInit(): void {}
}
