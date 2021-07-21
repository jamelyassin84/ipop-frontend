import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'ProgramAreas',
	templateUrl: './approval-activity.component.html',
	styleUrls: ['./approval-activity.component.scss'],
})
export class ApprovalActivityComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
