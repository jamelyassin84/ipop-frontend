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

	currentImages: any = []

	transformImages(photos: any) {
		this.currentImages = []
		photos.forEach((photo: any) => {
			this.currentImages.push(photo.file.uri)
		})
	}
}
