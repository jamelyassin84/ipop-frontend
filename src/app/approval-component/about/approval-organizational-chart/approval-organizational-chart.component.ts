import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'OrganizationalChart',
	templateUrl: './approval-organizational-chart.component.html',
	styleUrls: ['./approval-organizational-chart.component.scss'],
})
export class ApprovalOrganizationalChartComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
