import { ProvincialOfficialType } from '../../../../../../../Types/officials/ProvincialOfficials.types'
import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'ProvincialOfficials',
	templateUrl: './approval-provincial-official.component.html',
	styleUrls: ['./approval-provincial-official.component.scss'],
})
export class ApprovalProvincialOfficialComponent implements OnInit {
	constructor() {}

	@Input() data: ProvincialOfficialType | any = {}

	ngOnInit(): void {}
}
