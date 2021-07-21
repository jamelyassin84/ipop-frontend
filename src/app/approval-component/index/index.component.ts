import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'ApprovalIndex',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
	constructor() {}
	@Input() type: any = ''
	@Input() data: any = ''
	ngOnInit(): void {}
}
