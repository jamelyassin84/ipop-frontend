import { SPMemberType } from '../../../../../../../Types/Services.types'
import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'SP-Member',
	templateUrl: './approval-spmember.component.html',
	styleUrls: ['./approval-spmember.component.scss'],
})
export class ApprovalSPMemberComponent implements OnInit {
	constructor() {}

	@Input() data: SPMemberType | any = ''

	ngOnInit(): void {}
}
