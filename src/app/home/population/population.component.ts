import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { getPercent } from 'src/app/constants/Shortcuts'
import { Deleted, Fire, pop } from 'src/app/modules/extras/Alert'
import { BaseService } from 'src/app/Services/base.service'
import { AgeDistributionAndAgeDependecyRatioService } from 'src/app/Services/home/population/age-distribution-and-age-dependecy-ratio.service'
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
		this.getAgeDistributionAndAgeDependecyRatio()
		this.getAgeDistributionAndAgeDependecyRatioByMunicipality()
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
						if (key === 'eighty_and_above') {
							newText = '80 and above'
						}
						ageDistribution.push([
							key === 'eighty_and_above' ? newText : key,
							-Math.abs(parseFloat(male[key])),
							parseFloat(female[key]),
						])
					}
				}
				ageDistribution.push([
					'Below 1 Year Old',
					-Math.abs(parseFloat(male['below_1_year_old'])),
					female['below_1_year_old'],
				])
			} else {
				ageDistribution = DummyData
			}
			drawChart('population-pyramid', ageDistribution)
			this.processPopulationbyAgeGroupandSex(data)
		})
	}

	populationbyAgeGroupandSex: Array<any> = []
	processPopulationbyAgeGroupandSex(data: Array<any>) {
		let temp: any = []
		const male = data[0]['data']['male']
		const female = data[0]['data']['female']

		for (let key in female) {
			let newText: string = ''
			if (key === 'eighty_and_above') {
				newText = '80 and above'
			}
			if (key === 'below_1_year_old') {
				newText = 'Below 1 Year Old'
			}
			let total = parseFloat(male[key]) + parseFloat(female[key])
			temp.push({
				ageGroup:
					key === 'eighty_and_above' || key === 'below_1_year_old'
						? newText
						: key,
				male: male[key],
				percent_male: getPercent(male[key], total),
				female: female[key],
				percent_female: getPercent(female[key], total),
				total: total,
				percent_total:
					getPercent(female[key], total) +
					getPercent(male[key], total),
			})
		}

		this.populationbyAgeGroupandSex = temp.reverse()
		this.sumOfRows(this.populationbyAgeGroupandSex, data)
	}

	populationbyAgeGroupandSexTotal: any = {}
	sumOfRows(data: any, originalData: any) {
		let object: any = {
			ageGroup: 'Total',
			male: 0,
			percent_male: 0,
			female: 0,
			percent_female: 0,
			total: 0,
			percent_total: 0,
		}
		for (let index of data) {
			for (let key in index) {
				if (key !== 'ageGroup') {
					object[key] += index[key]
				}
			}
		}
		this.populationbyAgeGroupandSexTotal = object
		this.reAlterpopulationbyAgeGroupandSexTable(originalData)
	}

	reAlterpopulationbyAgeGroupandSexTable(data: any) {
		this.populationbyAgeGroupandSex = []
		const totalPopulation = this.populationbyAgeGroupandSexTotal.total
		let temp: any = []
		const male = data[0]['data']['male']
		const female = data[0]['data']['female']
		for (let key in female) {
			let newText: string = ''
			if (key === 'eighty_and_above') {
				newText = '80 and above'
			}
			if (key === 'below_1_year_old') {
				newText = 'Below 1 Year Old'
			}
			let total = parseFloat(male[key]) + parseFloat(female[key])
			temp.push({
				ageGroup:
					key === 'eighty_and_above' || key === 'below_1_year_old'
						? newText
						: key,
				male: male[key],
				percent_male: getPercent(male[key], totalPopulation),
				female: female[key],
				percent_female: getPercent(female[key], totalPopulation),
				total: total,
				percent_total:
					getPercent(female[key], totalPopulation) +
					getPercent(male[key], totalPopulation),
			})
		}
		this.populationbyAgeGroupandSexTotal.percent_male = 0
		this.populationbyAgeGroupandSexTotal.percent_female = 0
		this.populationbyAgeGroupandSexTotal.percent_total = 0
		const disregards = ['ageGroup', 'male', 'female']
		for (let index of temp) {
			for (let key in index) {
				if (!disregards.includes(key)) {
					this.populationbyAgeGroupandSexTotal[key] += index[key]
				}
			}
		}
		this.populationbyAgeGroupandSex = temp.reverse()
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
