import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'TablePlaceholder',
	templateUrl: './table-placeholder.component.html',
	styleUrls: ['./table-placeholder.component.scss'],
})
export class TablePlaceholderComponent implements OnInit {
	constructor() {}
	@Input() columns = [1, 2, 4, 5, 6, 7, 8, 9]
	@Input() rows = [1, 2, 3, 5]
	ngOnInit(): void {}
}
