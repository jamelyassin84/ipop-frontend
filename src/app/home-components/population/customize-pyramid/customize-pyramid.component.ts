import { Component, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'
import { PopulationPyramidService } from 'src/app/Services/home/population/population-pyramid.service'
import { PyramidType } from 'src/app/Types/population/Pyramid.type'
import { PyramidInputs } from './Pyramid.input'

@Component({
	selector: 'CustomizePyramid',
	templateUrl: './customize-pyramid.component.html',
	styleUrls: ['./customize-pyramid.component.scss'],
})
export class CustomizePyramidComponent implements OnInit {
	constructor(private service: PopulationPyramidService) {}

	types = ['Provincial', 'Muncipality', 'Barangay']

	ngOnInit(): void {}

	males: PyramidType = PyramidInputs.males
	females: PyramidType = PyramidInputs.females

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

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.service.create(this.populationPyramid).subscribe(() => {
				Created()
			})
		})
	}
}
