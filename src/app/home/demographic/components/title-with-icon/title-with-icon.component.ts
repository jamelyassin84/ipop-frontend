import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'TitleWithIcon',
	templateUrl: './title-with-icon.component.html',
	styleUrls: ['./title-with-icon.component.scss'],
})
export class TitleWithIconComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	@Input() title: any = ''
	@Input() icon: any = ''
	@Input() value: any = ''
	@Input() color: any = ''
}
