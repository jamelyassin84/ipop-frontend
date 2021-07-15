import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'
import { PyramidType } from 'src/app/Types/population/Pyramid.type'
import { PyramidInputs } from './Pyramid.input'

@Component({
	selector: 'CustomizePyramid',
	templateUrl: './customize-pyramid.component.html',
	styleUrls: ['./customize-pyramid.component.scss'],
})
export class CustomizePyramidComponent implements OnInit {
	constructor() {}

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

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
