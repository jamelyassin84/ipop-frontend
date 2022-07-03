import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
	selector: 'top-populated',
	templateUrl: './top-populated.component.html',
	styleUrls: ['./top-populated.component.scss'],
})
export class TopPopulatedSharedComponent implements OnInit {
	constructor() {}

	@Output() onDelete = new EventEmitter<number>()

	@Input() topPopulated?: TopPopulated[]

	ngOnInit(): void {}
}

export interface TopPopulated {
	data: { name: string; total: number; percentage: null | string }
}
