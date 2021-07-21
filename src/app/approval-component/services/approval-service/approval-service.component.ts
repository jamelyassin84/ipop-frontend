import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'Services',
	templateUrl: './approval-service.component.html',
	styleUrls: ['./approval-service.component.scss'],
})
export class ApprovalServiceComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
