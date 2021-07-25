import { HttpClient } from '@angular/common/http'
import { DummyData } from './../Dummy'
import { Component, Input, OnInit, Output } from '@angular/core'
import { drawChart } from '../Config'
import { BaseService } from 'src/app/Services/base.service'
import { getPercent } from 'src/app/constants/Shortcuts'

@Component({
	selector: 'PyramidChart-and-AgeGroup',
	templateUrl: './population-pyramid.component.html',
	styleUrls: ['./population-pyramid.component.scss'],
})
export class PopulationPyramidComponent implements OnInit {
	constructor(private _http: HttpClient) {}

	@Input() location: any = {}
	@Input() type: string = ''
	@Input() pyramidtitle: string = 'Pyramid'
	@Input() ageGroupTitle: string = 'Age Group and Sex'
	@Input() colors: Array<string> = []

	ngOnInit(): void {
		this.getPopulationPyramid()
	}

	getPopulationPyramid() {
		const service = new BaseService(
			this._http,
			'population-pyramid',
			`municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}&type=${this.type}`
		)
		service.index().subscribe((data: any) => {
			let ageDistribution: any = [['Age', 'Male', 'Female']]
			if (data.length !== 0) {
				this.processPopulationbyAgeGroupandSex(data)
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
			drawChart('population-pyramid', ageDistribution, this.colors)
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
}
