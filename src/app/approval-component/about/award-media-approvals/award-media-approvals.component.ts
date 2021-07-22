import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'AwardMediaApprovals',
	templateUrl: './award-media-approvals.component.html',
	styleUrls: ['./award-media-approvals.component.scss'],
})
export class AwardMediaApprovalsComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
