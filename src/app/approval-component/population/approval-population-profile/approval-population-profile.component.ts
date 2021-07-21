import { Component, Input, OnInit } from '@angular/core'
import { PopProfileDummy } from 'src/app/home/population/PopProfileDummy'

@Component({
	selector: 'PopulationProfile',
	templateUrl: './approval-population-profile.component.html',
	styleUrls: ['./approval-population-profile.component.scss'],
})
export class ApprovalPopulationProfileComponent implements OnInit {
	constructor() {}
	populationProfile = PopProfileDummy
	@Input() data: any = ''

	ngOnInit(): void {}
}
