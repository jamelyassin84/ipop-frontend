import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'BirthStatistics',
	templateUrl: './approval-birth-statistic.component.html',
	styleUrls: ['./approval-birth-statistic.component.scss'],
})
export class ApprovalBirthStatisticComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
