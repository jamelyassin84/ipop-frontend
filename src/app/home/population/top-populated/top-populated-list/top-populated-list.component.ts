import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { TopPopulated } from '../top-populated.component'

@Component({
	selector: 'top-populated-list',
	templateUrl: './top-populated-list.component.html',
	styleUrls: ['./top-populated-list.component.scss'],
})
export class TopPopulatedListComponent implements OnInit {
	constructor() {}

	@Output() onDelete = new EventEmitter<number>()

	@Input() topPopulated?: TopPopulated[]

	ngOnInit(): void {}
}
