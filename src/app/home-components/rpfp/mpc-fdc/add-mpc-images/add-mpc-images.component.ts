import { Alert, Deleted, Fire, HasApprovals, pop } from 'src/app/components/Alert'
import { Component, Input, OnInit } from '@angular/core'
import { MpcFdcDataService } from 'src/app/Services/home/rpfp/mpc-fdc/mpc-fdc-data.service'
import { BaseService } from 'src/app/Services/base.service'

@Component({
	selector: 'AddMPCFDCImages',
	templateUrl: './add-mpc-images.component.html',
	styleUrls: ['./add-mpc-images.component.scss'],
})
export class AddMpcImagesComponent implements OnInit {
	constructor(private service: MpcFdcDataService) {}

	sliders: any[] = []
	photos: any[] = []
	@Input() data: any = {}

	ngOnInit(): void {
		console.log(this.data)
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

	isLoading: boolean = false
	save() {
		Fire('Save Changes?', 'This will save all added images. Continue?', 'info', () => {
			this.isLoading = true
			this.service.update(this.data.id, { files: this.photos }).subscribe(() => {
				HasApprovals('Created')
				this.isLoading = false
			})
		})
	}
}
