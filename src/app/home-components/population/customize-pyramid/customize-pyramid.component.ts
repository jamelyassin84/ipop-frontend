import { Input } from '@angular/core'
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
	constructor(private service: PopulationPyramidService) {}

	@Input() type: string = ''

	types = ['Provincial', 'Muncipality', 'Barangay']

	ngOnInit(): void {}

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
		this.populationPyramid.barangay = event.barangay
		this.populationPyramid.municipality = event.municipality
		this.populationPyramid.year = event.year
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
