import { Component, Input, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'
import { TeenCenterDataService } from 'src/app/Services/home/ahyd/teen-center/teen-center-data.service'

@Component({
	selector: 'AddTCImages',
	templateUrl: './add-tc-images.component.html',
	styleUrls: ['./add-tc-images.component.scss'],
})
export class AddTcImagesComponent implements OnInit {
	constructor(private service: TeenCenterDataService) {}

	sliders: any[] = []
	photos: any[] = []
	@Input() data: any = {}

	ngOnInit(): void {}

	trigger() {
		document.getElementById('file')?.click()
	}

	readURL(event: any) {
		if (event.target.files && event.target.files[0]) {
			this.photos = []
			Object.keys(event.target.files).forEach((i: any) => {
				const reader = new FileReader()
				reader.readAsDataURL(event.target.files[i])
				reader.onload = (event: any) => {
					this.photos.push((<FileReader>event.target).result)
				}
			})
		}
	}

	deleteTemporaryImage(index: number) {
		this.photos.splice(index, 1)
	}

	saveImages() {
		Fire('Save Changes?', 'This will save all added images. Continue?', 'info', () => {
			this.service.update(this.data.id, { photos: this.photos }).subscribe(() => {
				Created()
			})
		})
	}
}
