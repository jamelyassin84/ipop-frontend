import { Component, OnInit } from '@angular/core'
import { PersonnelTypes } from './PersonnelTypes'

@Component({
	selector: 'app-personnel-directory',
	templateUrl: './personnel-directory.component.html',
	styleUrls: ['./personnel-directory.component.scss'],
})
export class PersonnelDirectoryComponent implements OnInit {
	constructor() {}

	types = PersonnelTypes

	ngOnInit(): void {}
}
