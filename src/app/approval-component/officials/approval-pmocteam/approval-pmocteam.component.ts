import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'PMOC-Team',
	templateUrl: './approval-pmocteam.component.html',
	styleUrls: ['./approval-pmocteam.component.scss'],
})
export class ApprovalPMOCTeamComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
