import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'MigrationRate',
	templateUrl: './approval-migration-rate.component.html',
	styleUrls: ['./approval-migration-rate.component.scss'],
})
export class ApprovalMigrationRateComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
