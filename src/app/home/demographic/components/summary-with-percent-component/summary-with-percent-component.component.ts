import { Input } from '@angular/core'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'SummaryWithPercent',
	templateUrl: './summary-with-percent-component.component.html',
	styleUrls: ['./summary-with-percent-component.component.scss'],
})
export class SummaryWithPercentComponentComponent implements OnInit {
	constructor() {}
	@Input() title: any = ''
	@Input() icon: any = ''
	@Input() spanClass: any = ''
	@Input() value: any = ''
	@Input() percentValue: any = ''
	@Input() progressClass: any = ''

	ngOnInit(): void {}
}
