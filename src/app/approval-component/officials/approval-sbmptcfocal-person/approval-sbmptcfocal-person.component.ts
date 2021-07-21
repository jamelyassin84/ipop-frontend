import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'Teen-Center-Focal-Persons',
	templateUrl: './approval-sbmptcfocal-person.component.html',
	styleUrls: ['./approval-sbmptcfocal-person.component.scss'],
})
export class ApprovalSBMPTCFocalPersonComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
