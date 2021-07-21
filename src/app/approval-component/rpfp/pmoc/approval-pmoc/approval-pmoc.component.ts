import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'PMOC',
	templateUrl: './approval-pmoc.component.html',
	styleUrls: ['./approval-pmoc.component.scss'],
})
export class ApprovalPMOCComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
