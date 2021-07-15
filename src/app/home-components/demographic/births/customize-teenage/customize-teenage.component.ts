import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeTeenage',
	templateUrl: './customize-teenage.component.html',
	styleUrls: ['./customize-teenage.component.scss'],
})
export class CustomizeTeenageComponent implements OnInit {
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
