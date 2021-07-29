import { Component, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/modules/extras/Alert'
import { OthersService } from 'src/app/Services/Independent/other.service'

@Component({
	selector: 'AddOtherFiles',
	templateUrl: './add-files.component.html',
	styleUrls: ['./add-files.component.scss'],
})
export class AddFilesComponent implements OnInit {
	constructor(private service: OthersService) {}

	ngOnInit(): void {}

	data: any = {
		files: [],
		thumbnail: '',
		name: '',
	}

	setFiles(event: any) {
		this.data.files = event
	}

	thumbNailOnChange(event: any) {
		this.data.thumbnail = event
	}

	isLoading = false
	save() {
		Fire(
			'Add File?',
			'Are you sure you want to add this data?',
			'info',
			() => {
				let formData = new FormData()
				for (let key in this.data) {
					if (key !== 'files') {
						formData.append(key, this.data[key])
					}
				}
				for (let index in this.data.files) {
					formData.append('files' + index, this.data.files[index])
				}
				this.isLoading = true
				this.service.create(formData).subscribe(() => {
					this.isLoading = false
					Created()
				})
			}
		)
	}
}
