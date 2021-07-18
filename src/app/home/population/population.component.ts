import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'
import { TopPopulatedService } from 'src/app/Services/home/population/top-populated.service'
import { ReloadService } from 'src/app/Services/reload.service'
import { drawChart } from './Config'
import { DummyData } from './Dummy'
import { PopProfileDummy } from './PopProfileDummy'

@Component({
	selector: 'app-population',
	templateUrl: './population.component.html',
	styleUrls: ['./population.component.scss'],
})
export class PopulationComponent implements OnInit {
	constructor(private topPopulatedService: TopPopulatedService, private component: ReloadService) {
		this.component.shouldReload().subscribe(() => {
			this.ngOnInit()
		})
	}
	populationProfile = PopProfileDummy

	topPopulated: any[] = []
	ngOnInit(): void {
		this.getTopPopulated()
		drawChart('population-pyramid', DummyData)
	}

	getTopPopulated() {
		this.topPopulatedService.index().subscribe((data: any[]) => {
			this.topPopulated = data
			console.log(data)
		})
	}

	deleteTopPopulated(id: number) {
		Fire('Remove Municipality?', 'Are you sure you want to remove this data?', 'info', () => {
			this.topPopulatedService.destroy(id).subscribe()
		})
	}
}
