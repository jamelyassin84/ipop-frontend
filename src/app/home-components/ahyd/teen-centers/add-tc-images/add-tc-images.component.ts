import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddTCImages',
	templateUrl: './add-tc-images.component.html',
	styleUrls: ['./add-tc-images.component.scss'],
})
export class AddTcImagesComponent implements OnInit {
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
		Fire('Save Changes?', 'This will save all added images. Continue?', 'info', () => {})
	}
}
