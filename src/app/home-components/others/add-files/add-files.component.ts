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

	files: any = []

	setFiles(event: any) {
		this.files = event
	}

	thumbNailOnChange(event: any) {
		console.log(event)
	}

	isLoading = false
	save() {
		Fire(
			'Add File?',
			'Are you sure you want to add this data?',
			'info',
			() => {
				let formData = new FormData()
				formData.append('files', this.files)
				this.isLoading = true
				this.service.create(formData).subscribe(() => {
					this.isLoading = false
					Created()
				})
			}
		)
	}
}
