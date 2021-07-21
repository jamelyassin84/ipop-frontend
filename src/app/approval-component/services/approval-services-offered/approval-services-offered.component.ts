import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'ServicesOffered',
	templateUrl: './approval-services-offered.component.html',
	styleUrls: ['./approval-services-offered.component.scss'],
})
export class ApprovalServicesOfferedComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
