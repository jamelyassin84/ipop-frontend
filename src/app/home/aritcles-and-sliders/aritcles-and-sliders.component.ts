import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-aritcles-and-sliders',
	templateUrl: './aritcles-and-sliders.component.html',
	styleUrls: ['./aritcles-and-sliders.component.scss'],
})
export class AritclesAndSlidersComponent implements OnInit {
	images = [
		{ path: '../../../assets/ipop/home/1.jpg' },
		{ path: '../../../assets/ipop/home/2.jpg' },
		{ path: '../../../assets/ipop/home/3.jpg' },
		{ path: '../../../assets/ipop/home/4.jpg' },
	]

	constructor() {}

	ngOnInit(): void {}
}
