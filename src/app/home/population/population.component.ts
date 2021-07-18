import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'
import { BaseService } from 'src/app/Services/base.service'
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
	constructor(
		private topPopulatedService: TopPopulatedService,
		private component: ReloadService,
		private _http: HttpClient
	) {
		this.component.shouldReload().subscribe(() => {
			this.ngOnInit()
			this.fetch(this.location)
		})
	}

	ngOnInit(): void {
		this.getTopPopulated()
	}

	topPopulated: any[] = []
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

	location: any = {
		barangay: null,
		municipality: null,
	}
	fetch(event: any) {
		this.location = event
		this.getPopulationPyramid()
		this.getPopulationData()
	}

	populationPyramid: any = []
	getPopulationPyramid() {
		const service = new BaseService(
			this._http,
			'population-pyramid',
			`municipality=${this.location.municipality}&barangay=${this.location.barangay}`
		)
		service.index().subscribe((populationPyramid: any) => {
			drawChart('population-pyramid', populationPyramid)
		})
	}

	populationProfile = {}
	getPopulationData() {
		const service = new BaseService(
			this._http,
			'statistic-profiles',
			`municipality=${this.location.municipality}&barangay=${this.location.barangay}`
		)
		service.index().subscribe((populationProfile: any) => {
			this.populationProfile = populationProfile
		})
	}
}
