import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'app-teen-centers',
	templateUrl: './teen-centers.component.html',
	styleUrls: ['./teen-centers.component.scss'],
})
export class TeenCentersComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	remove() {
		Fire('Remove Data?', 'Are you sure you want to remove this data?', 'info', () => {})
	}
}
