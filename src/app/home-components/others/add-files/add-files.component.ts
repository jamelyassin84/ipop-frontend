import { Component, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'
import { OthersService } from 'src/app/Services/Independent/other.service'

@Component({
	selector: 'AddOtherFiles',
	templateUrl: './add-files.component.html',
	styleUrls: ['./add-files.component.scss'],
})
export class AddFilesComponent implements OnInit {
	constructor(private service: OthersService) {}

	ngOnInit(): void {}

	file: any = []

	readURL(event: any) {
		if (event.target.files && event.target.files[0]) {
			this.file = []
			Object.keys(event.target.files).forEach((i: any) => {
				const reader = new FileReader()
				reader.readAsDataURL(event.target.files[i])
				reader.onload = (event: any) => {
					this.file.push((<FileReader>event.target).result)
				}
			})
		}
	}

	isLoading = false
	save() {
		Fire(
			'Add File?',
			'Are you sure you want to add this data?',
			'info',
			() => {
				this.isLoading = true
				this.service.create({ file: this.file }).subscribe(() => {
					this.isLoading = false
					Created()
				})
			}
		)
	}
}
