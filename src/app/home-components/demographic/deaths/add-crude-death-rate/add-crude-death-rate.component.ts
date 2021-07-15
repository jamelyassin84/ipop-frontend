import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddCrudeDeathRate',
	templateUrl: './add-crude-death-rate.component.html',
	styleUrls: ['./add-crude-death-rate.component.scss'],
})
export class AddCrudeDeathRateComponent implements OnInit {
	constructor() {}
	years: number[] = []
	ngOnInit(): void {
		for (let year = 2021; year < 2101; year++) {
			this.years.push(year)
		}
	}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
