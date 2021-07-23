import { Component, Input, OnInit } from '@angular/core'
import { IncidenceChartConfig } from 'src/app/home/demographic/Incidence.Chart'

@Component({
	selector: 'IncidenceChart',
	templateUrl: './approval-incidence.component.html',
	styleUrls: ['./approval-incidence.component.scss'],
})
export class ApprovalIncidenceComponent implements OnInit {
	constructor() {}

	@Input() data: any = ''

	ngOnInit(): void {}
}
