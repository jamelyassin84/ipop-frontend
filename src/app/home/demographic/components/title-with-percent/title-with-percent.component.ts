import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'TitleWithPercent',
	templateUrl: './title-with-percent.component.html',
	styleUrls: ['./title-with-percent.component.scss'],
})
export class TitleWithPercentComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	@Input() title: any = ''
	@Input() icon: any = ''
	@Input() value: any = ''
	@Input() color: any = ''
	@Input() percentValue: any = ''
	@Input() progressColor: any = ''
}
