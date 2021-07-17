import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'SliderImages',
	templateUrl: './approval-slider.component.html',
	styleUrls: ['./approval-slider.component.scss'],
})
export class ApprovalSliderComponent implements OnInit {
	images = [
		{ path: '../../../assets/ipop/home/1.jpg' },
		{ path: '../../../assets/ipop/home/2.jpg' },
		{ path: '../../../assets/ipop/home/3.jpg' },
		{ path: '../../../assets/ipop/home/4.jpg' },
	]

	constructor() {}

	ngOnInit(): void {}
}
