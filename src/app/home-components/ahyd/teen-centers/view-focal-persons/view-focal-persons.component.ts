import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'ViewFocalPersons',
	templateUrl: './view-focal-persons.component.html',
	styleUrls: ['./view-focal-persons.component.scss'],
})
export class ViewFocalPersonsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	remove() {
		Fire('Remove Data?', 'Are you sure you want to remove this data?', 'info', () => {})
	}
}
