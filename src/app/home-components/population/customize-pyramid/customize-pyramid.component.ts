import { HttpClient } from '@angular/common/http'
import { ChangeDetectorRef, Input } from '@angular/core'
import { Component, OnInit } from '@angular/core'
import { Created, Fire, HasApprovals } from 'src/app/modules/extras/Alert'
import { BaseService } from 'src/app/Services/base.service'
import { PopulationPyramidService } from 'src/app/Services/home/population/population-pyramid.service'

@Component({
	selector: 'CustomizePyramid',
	templateUrl: './customize-pyramid.component.html',
	styleUrls: ['./customize-pyramid.component.scss'],
})
export class CustomizePyramidComponent implements OnInit {
	constructor(
		private _http: HttpClient,
		private service: PopulationPyramidService
	) {}

	@Input() type: string = ''

	@Input('location') set setLocation(location: Location) {
		console.log(location)
	}

	@Input() types = ['Provincial', 'Muncipality', 'Barangay']

	ngOnInit(): void {
		console.log('tae')
	}

	tabs: any = {
		males: true,
		famales: false,
	}

	changeTab(tab: any) {
		for (let key in this.tabs) {
			this.tabs[key] = false
		}
		this.tabs[tab] = true
	}

	populationPyramid: any = {
		barangay: null,
		municipality: null,
		year: null,
		data: {
			male: {},
			female: {},
		},
	}

	fetch(event: any) {
		const { barangay, municipality, year } = event

		this.populationPyramid.barangay = barangay

		this.populationPyramid.municipality = municipality

		this.populationPyramid.year = year

		const service = new BaseService(
			this._http,
			'population-pyramid',
			`municipality=${municipality}&barangay=${barangay}&year=${year}&type=${this.type}`
		)

		service.index().subscribe((response: any) => {
			this.populationPyramid.data.male = response[0].data.male

			this.populationPyramid.data.female = response[0].data.female
		})
	}

	isLoading: boolean = false
	save() {
		Fire(
			'Save Changes?',
			'Are you sure you want to add this data?',
			'info',
			() => {
				this.isLoading = true
				this.populationPyramid.type = this.type
				this.service.create(this.populationPyramid).subscribe(() => {
					HasApprovals('Created')
					this.isLoading = false
				})
			}
		)
	}
}

export interface Location {
	barangay: string
	municipality: string
	year: string
}
