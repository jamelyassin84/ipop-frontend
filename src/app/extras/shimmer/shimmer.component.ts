import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'Shimmer',
	templateUrl: './shimmer.component.html',
	styleUrls: ['./shimmer.component.scss'],
})
export class ShimmerComponent implements OnInit {
	constructor() {}

	@Input() type = 'line'

	ngOnInit(): void {}
}
