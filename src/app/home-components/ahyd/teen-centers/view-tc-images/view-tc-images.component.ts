import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/modules/extras/Alert'

@Component({
	selector: 'ViewTCImages',
	templateUrl: './view-tc-images.component.html',
	styleUrls: ['./view-tc-images.component.scss'],
})
export class ViewTcImagesComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	deleteImage() {
		Fire(
			'Delete Image?',
			'Are you sure you want to delete this image? The image will be permanently deleted',
			'info',
			() => {}
		)
	}

	saveImages() {
		Fire(
			'Save Changes?',
			'This will save all added images. Continue?',
			'info',
			() => {}
		)
	}
}
