import { Component, OnInit } from '@angular/core'
import { Alert, Fire, pop } from 'src/app/components/Alert'
import { SliderService } from 'src/app/Services/home/news/slider.service'

@Component({
	selector: 'EditSliderImage',
	templateUrl: './edit-slider-image.component.html',
	styleUrls: ['./edit-slider-image.component.scss'],
})
export class EditSliderImageComponent implements OnInit {
	constructor(private slideService: SliderService) {}

	ngOnInit(): void {
		this.getSliders()
	}

	sliders: any[] = []
	photos: any[] = []

	getSliders() {
		this.slideService.index().subscribe((sliders: []) => {
			this.sliders = sliders
			sliders.length !== 0 ? pop() : ''
		})
	}

	trigger() {
		document.getElementById('file')?.click()
	}

	readURL(event: any) {
		if (event.target.files && event.target.files[0]) {
			this.photos = []
			Object.keys(event.target.files).forEach((i: any) => {
				// this.sliders.push(event.target.files[i])
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

	deleteImage(id: number) {
		Fire(
			'Delete Image?',
			'Are you sure you want to delete this image? The image will be permanently deleted',
			'info',
			() => {
				this.slideService.destroy(id).subscribe(() => {
					this.ngOnInit()
				})
			}
		)
	}

	saveImages() {
		Fire('Save Changes?', 'This will save all added images. Continue?', 'info', () => {
			this.slideService.create({ photos: this.photos }).subscribe(() => {
				Alert('Success', 'New Images Added', 'success')
			})
		})
	}
}
