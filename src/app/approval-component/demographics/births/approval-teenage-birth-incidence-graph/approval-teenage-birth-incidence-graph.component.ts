import { Component, Input, OnInit } from '@angular/core'
import { IncidenceChartConfig } from 'src/app/home/demographic/Incidence.Chart'

@Component({
	selector: 'Teenage-Incidence-Graph',
	templateUrl: './approval-teenage-birth-incidence-graph.component.html',
	styleUrls: ['./approval-teenage-birth-incidence-graph.component.scss'],
})
export class ApprovalTeenageBirthIncidenceGraphComponent implements OnInit {
	constructor() {}
	teenageChart = IncidenceChartConfig
	@Input() data: any = ''

	ngOnInit(): void {}
}
