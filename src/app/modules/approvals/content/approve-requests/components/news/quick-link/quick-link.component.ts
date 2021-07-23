import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'QuikLinkApproval',
	templateUrl: './quick-link.component.html',
	styleUrls: ['./quick-link.component.scss'],
})
export class QuickLinkComponent implements OnInit {
	constructor() {}

	@Input() data: any = ''

	ngOnInit(): void {}
}
