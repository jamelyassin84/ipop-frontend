import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'ApprovalMarriages',
	templateUrl: './approval-marriages.component.html',
	styles: [],
})
export class ApprovalMarriagesComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''
	ngOnInit(): void {}

	getPercentage(value: number, basis: number) {
		return (value * 100) / basis
	}
}
