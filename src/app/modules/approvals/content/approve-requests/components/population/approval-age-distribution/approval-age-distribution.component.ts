import { Component, Input, OnInit } from '@angular/core'
import { drawChart } from 'src/app/home/population/Config'
import { DummyData } from 'src/app/home/population/Dummy'

@Component({
	selector: 'PopulationPyramid',
	templateUrl: './approval-age-distribution.component.html',
	styleUrls: ['./approval-age-distribution.component.scss'],
})
export class ApprovalAgeDistributionComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {
		// drawChart('population-pyramid', DummyData)
	}
}
