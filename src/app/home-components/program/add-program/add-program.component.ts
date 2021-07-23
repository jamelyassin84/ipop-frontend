import { Component, Input, OnInit } from '@angular/core'
import { Alert, Fire, HasApprovals } from 'src/app/modules/extras/Alert'
import { ActivityService } from 'src/app/Services/home/program-areas/activity.service'

@Component({
	selector: 'AddProgram',
	templateUrl: './add-program.component.html',
	styleUrls: ['./add-program.component.scss'],
})
export class AddProgramComponent implements OnInit {
	constructor(private service: ActivityService) {}

	@Input() program_area_id = ''

	ngOnInit(): void {
		this.activity.program_area_id = this.program_area_id
	}

	photos: any[] = []

	activity: any = {
		title: '',
		description: '',
		program_area_id: '',
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
		this.activity.files = this.photos
		Fire(
			'Save Changes?',
			'Are you sure you want to add this article?',
			'info',
			() => {
				this.isLoading = true
				this.service.create(this.activity).subscribe(() => {
					HasApprovals('Created')
					this.isLoading = false
				})
			}
		)
	}
}
