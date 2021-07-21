import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'Award',
	templateUrl: './approval-award.component.html',
	styleUrls: ['./approval-award.component.scss'],
})
export class ApprovalAwardComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
