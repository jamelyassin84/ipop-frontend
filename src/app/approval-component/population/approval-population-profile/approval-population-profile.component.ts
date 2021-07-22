import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'PopulationProfile',
	templateUrl: './approval-population-profile.component.html',
	styleUrls: ['./approval-population-profile.component.scss'],
})
export class ApprovalPopulationProfileComponent implements OnInit {
	constructor() {}

	@Input() data: any = ''

	ngOnInit(): void {}
}
