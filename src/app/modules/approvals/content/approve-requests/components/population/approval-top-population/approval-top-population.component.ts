import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'Top-Population',
	templateUrl: './approval-top-population.component.html',
	styleUrls: ['./approval-top-population.component.scss'],
})
export class ApprovalTopPopulationComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
