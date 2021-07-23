import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'MigrationStatistic',
	templateUrl: './approval-migration-statistic.component.html',
	styleUrls: ['./approval-migration-statistic.component.scss'],
})
export class ApprovalMigrationStatisticComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
