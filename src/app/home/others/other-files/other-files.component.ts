import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'OtherFiles',
	templateUrl: './other-files.component.html',
	styleUrls: ['./other-files.component.scss'],
})
export class OtherFilesComponent implements OnInit {
	constructor() {}
	@Input() files: any[] = []
	ngOnInit(): void {}
}
