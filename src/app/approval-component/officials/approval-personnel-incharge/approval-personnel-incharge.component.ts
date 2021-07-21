import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'PersonnelIncharge',
	templateUrl: './approval-personnel-incharge.component.html',
	styleUrls: ['./approval-personnel-incharge.component.scss'],
})
export class ApprovalPersonnelInchargeComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
