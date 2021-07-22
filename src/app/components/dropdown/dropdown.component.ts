import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'DropDown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
	constructor() {}

	@Input() buttons: any

	ngOnInit(): void {}
}
