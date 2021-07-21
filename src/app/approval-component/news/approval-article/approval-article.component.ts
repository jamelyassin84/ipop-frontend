import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'Articles',
	templateUrl: './approval-article.component.html',
	styleUrls: ['./approval-article.component.scss'],
})
export class ApprovalArticleComponent implements OnInit {
	constructor() {}
	@Input() data: any = ''

	ngOnInit(): void {}
}
