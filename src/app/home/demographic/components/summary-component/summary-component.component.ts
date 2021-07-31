import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'SummaryComponent',
	templateUrl: './summary-component.component.html',
	styleUrls: ['./summary-component.component.scss'],
})
export class SummaryComponentComponent implements OnInit {
	constructor() {}

	@Input() title: any = ''
	@Input() icon: any = ''
	@Input() spanClass: any = ''
	@Input() value: any = ''
	ngOnInit(): void {}
}
