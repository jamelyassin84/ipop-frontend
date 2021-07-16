import { Fire } from 'src/app/components/Alert'
import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'AddMPCFDCImages',
	templateUrl: './add-mpc-images.component.html',
	styleUrls: ['./add-mpc-images.component.scss'],
})
export class AddMpcImagesComponent implements OnInit {
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
