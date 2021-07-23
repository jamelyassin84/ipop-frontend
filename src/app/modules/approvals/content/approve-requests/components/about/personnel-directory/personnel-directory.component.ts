import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'ApprovalsPersonnelDirectory',
	templateUrl: './personnel-directory.component.html',
	styleUrls: ['./personnel-directory.component.scss'],
})
export class ApprovalsPersonnelDirectoryComponent implements OnInit {
	constructor() {}

	@Input() data: any = {}

	ngOnInit(): void {}
}
