import { HttpClient } from '@angular/common/http'
import { Component, OnInit, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs'
import { getPercent } from 'src/app/constants/Shortcuts'
import { Deleted, Fire, pop } from 'src/app/modules/extras/Alert'
import { BaseService } from 'src/app/Services/base.service'
import { AgeDistributionAndAgeDependecyRatioService } from 'src/app/Services/home/population/age-distribution-and-age-dependecy-ratio.service'
import { TopPopulatedService } from 'src/app/Services/home/population/top-populated.service'
import { ReloadService } from 'src/app/Services/reload.service'
import { drawChart } from './Config'
import { DummyData } from './Dummy'
import { PopulationPyramidComponent } from './population-pyramid/population-pyramid.component'

@Component({
	selector: 'app-population',
	templateUrl: './population.component.html',
	styleUrls: ['./population.component.scss'],
})
export class PopulationComponent implements OnInit {
	@ViewChild(PopulationPyramidComponent) pyramid: any

	constructor(
		private topPopulatedService: TopPopulatedService,
		private component: ReloadService,
		private _http: HttpClient,
		private adaadr: AgeDistributionAndAgeDependecyRatioService
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
		this.getPopulationData()
		this.getPopulationByMuncipality()
		this.getAgeDistributionAndAgeDependecyRatio()
		this.getAgeDistributionAndAgeDependecyRatioByMunicipality()
		this.pyramid.ngOnInit()
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

	AgeDistributionAndAgeDependecyRatio: any = []
	getAgeDistributionAndAgeDependecyRatio() {
		this.adaadr.index(`year=${this.location['year']}`).subscribe((data) => {
			this.AgeDistributionAndAgeDependecyRatio = data
		})
	}

	AgeDistributionAndAgeDependecyRatioByMunicipality: any = []
	getAgeDistributionAndAgeDependecyRatioByMunicipality() {
		new BaseService(
			this.adaadr.http,
			`${this.adaadr.url}/by-municipality`,
			`year=${this.location['year']}`
		)
			.index()
			.subscribe((data) => {
				this.AgeDistributionAndAgeDependecyRatioByMunicipality = data
			})
	}

	removeDependency(id: number) {
		Fire(
			'Remove Data?',
			'Are you sure you want to permanently remove this data?',
			'info',
			() => {
				this.adaadr.destroy(id).subscribe(() => {
					Deleted()
				})
			}
		)
	}

	total(x: string | any, y: string | any) {
		return parseFloat(x) + parseFloat(y)
	}

	getPercentage(value: number, basis: number) {
		return (value * 100) / basis
	}
}
