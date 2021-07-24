import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Fire, pop } from 'src/app/modules/extras/Alert'
import { BaseService } from 'src/app/Services/base.service'
import { TopPopulatedService } from 'src/app/Services/home/population/top-populated.service'
import { ReloadService } from 'src/app/Services/reload.service'
import { drawChart } from './Config'
import { DummyData } from './Dummy'

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
		this.subscriptions.add(
			this.component.shouldReload().subscribe(() => {
				this.ngOnInit()
			})
		)
	}

	private subscriptions = new Subscription()

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	ngOnInit(): void {
		this.getTopPopulated()
		drawChart('population-pyramid', this.populationPyramid)
	}

	topPopulated: any[] = []
	getTopPopulated() {
		this.topPopulatedService.index().subscribe((data: any[]) => {
			this.topPopulated = data
			pop()
		})
	}

	deleteTopPopulated(id: number) {
		Fire(
			'Remove Municipality?',
			'Are you sure you want to remove this data?',
			'info',
			() => {
				this.topPopulatedService.destroy(id).subscribe()
			}
		)
	}

	location: any = {
		barangay: null,
		municipality: null,
		year: null,
	}
	fetch(event: any) {
		this.location = event
		this.getPopulationPyramid()
		this.getPopulationData()
		this.getPopulationByMuncipality()
	}

	populationPyramid: any = DummyData
	getPopulationPyramid() {
		const service = new BaseService(
			this._http,
			'population-pyramid',
			`municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}`
		)
		service.index().subscribe((data: any) => {
			let ageDistribution: any = [['Age', 'Male', 'Female']]
			if (data.length !== 0) {
				data = data.reverse()
				const male = data[0]['data']['male']
				const female = data[0]['data']['female']
				for (let key in female) {
					if (key !== 'below_1_year_old') {
						let newText = ''
						if (key == 'eighty_and_above') {
							newText = '80 and above'
						}
						ageDistribution.push([
							key == 'below_1_year_old' ||
							key == 'eighty_and_above'
								? newText
								: key,
							-Math.abs(parseInt(male[key])),
							parseInt(female[key]),
						])
					}
				}
				ageDistribution.push([
					'Below 1 Year Old',
					-Math.abs(parseInt(male['below_1_year_old'])),
					female['below_1_year_old'],
				])
			} else {
				ageDistribution = DummyData
			}
			drawChart('population-pyramid', ageDistribution)
		})
	}

	populationProfile: any = {}
	getPopulationData() {
		const service = new BaseService(
			this._http,
			'statistic-profiles',
			`municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}`
		)
		service.index().subscribe((populationProfile: any) => {
			this.populationProfile = {}
			if (populationProfile.length !== 0) {
				this.populationProfile = populationProfile[0]
			}
		})
	}

	populationByMuncipality: any[] = []
	getPopulationByMuncipality() {
		new BaseService(
			this.topPopulatedService.http,
			'statistic-profiles/by-municipality',
			`year=${this.location['year']}`
		)
			.index()
			.subscribe((data: any) => {
				this.populationByMuncipality = data
			})
	}

	total(x: string | any, y: string | any) {
		return parseInt(x) + parseInt(y)
	}
}
