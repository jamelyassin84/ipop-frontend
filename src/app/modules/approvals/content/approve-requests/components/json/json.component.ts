import { Input } from '@angular/core'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-json',
	templateUrl: './json.component.html',
	styles: [],
})
export class JsonComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
