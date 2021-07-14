import { Component, OnInit } from '@angular/core'
import { drawChart } from './Config'
import { DummyData } from './Dummy'
import { PopProfileDummy } from './PopProfileDummy'

@Component({
	selector: 'app-population',
	templateUrl: './population.component.html',
	styleUrls: ['./population.component.scss'],
})
export class PopulationComponent implements OnInit {
	constructor() {}

	populationProfile = PopProfileDummy

	ngOnInit(): void {
		drawChart('population-pyramid', DummyData)
	}
}
