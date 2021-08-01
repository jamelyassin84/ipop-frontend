import { Component, OnInit, Input } from '@angular/core'

@Component({
	selector: 'app-approval-age-distribution-and-age-dependency-ratio',
	templateUrl:
		'./approval-age-distribution-and-age-dependency-ratio.component.html',
	styleUrls: [
		'./approval-age-distribution-and-age-dependency-ratio.component.scss',
	],
})
export class ApprovalAgeDistributionAndAgeDependencyRatioComponent
	implements OnInit
{
	constructor() {}
	@Input() data: any = {}

	ngOnInit(): void {}

	total(x: string | any, y: string | any) {
		return parseFloat(x) + parseFloat(y)
	}
}
