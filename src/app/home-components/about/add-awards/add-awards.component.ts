import { Component, OnInit } from '@angular/core'
import { Alert, Fire } from 'src/app/components/Alert'
import { AwardsService } from 'src/app/Services/home/about/awards.service'

@Component({
	selector: 'AddAwards',
	templateUrl: './add-awards.component.html',
	styleUrls: ['./add-awards.component.scss'],
})
export class AddAwardsComponent implements OnInit {
	constructor(private service: AwardsService) {}

	ngOnInit(): void {}

	photos: any[] = []

	award: any = {
		url: '',
		title: '',
		files: [],
	}

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

	saveAritcle() {
		this.award.files = this.photos
		Fire('Save Changes?', 'Are you sure you want to add this article?', 'info', () => {
			this.service.create(this.award).subscribe(() => {
				Alert('Success', 'New Article Added', 'success')
			})
		})
	}
}
