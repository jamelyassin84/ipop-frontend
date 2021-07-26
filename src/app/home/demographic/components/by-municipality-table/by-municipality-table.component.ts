import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'ByMunicipalityTable',
	templateUrl: './by-municipality-table.component.html',
	styleUrls: ['./by-municipality-table.component.scss'],
})
export class ByMunicipalityTableComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	@Input() title: any = ''
	@Input() headerClass: any = ''
	@Input() headers: Array<string> = []
	@Input() body: Array<any> = []
}
