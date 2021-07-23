import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'SliderImages',
	templateUrl: './approval-slider.component.html',
	styleUrls: ['./approval-slider.component.scss'],
})
export class ApprovalSliderComponent implements OnInit {
	@Input() data: any = ''

	constructor() {}

	images: any = []

	ngOnInit(): void {
		setTimeout(() => {
			this.images.push(this.data.photo.uri)
		}, 300)
	}
}
