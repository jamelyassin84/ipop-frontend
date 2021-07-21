import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'AHYD-Team',
	templateUrl: './approval-mtcmmember.component.html',
	styleUrls: ['./approval-mtcmmember.component.scss'],
})
export class ApprovalMTCMMemberComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
