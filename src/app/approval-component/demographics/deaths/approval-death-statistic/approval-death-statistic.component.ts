import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'DeathStatistics',
	templateUrl: './approval-death-statistic.component.html',
	styleUrls: ['./approval-death-statistic.component.scss'],
})
export class ApprovalDeathStatisticComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
