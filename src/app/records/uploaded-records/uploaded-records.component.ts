import { Component, OnInit } from '@angular/core'
import { Alert } from 'src/app/components/Alert'
import { BaseService } from 'src/app/Services/base.service'
import { FileUploadsService } from 'src/app/Services/home/others/file-uploads.service'

@Component({
	selector: 'app-uploaded-records',
	templateUrl: './uploaded-records.component.html',
	styleUrls: ['./uploaded-records.component.scss'],
})
export class UploadedRecordsComponent implements OnInit {
	constructor(private service: FileUploadsService) {}

	ngOnInit(): void {
		this.index()
	}

	files: any = []
	index() {
		new BaseService(this.service.http, this.service.url, 'type=Birth')
			.index()
			.subscribe((data) => {
				this.files = data
				console.log(data)
			})
	}

	approve(id: number) {
		this.service.update(id, { approved: true }).subscribe(() => {
			Alert('File successfully Approved', '', 'success')
			this.ngOnInit()
		})
	}

	reject(id: number) {
		this.service.destroy(id).subscribe(() => {
			Alert(
				'File Rejected',
				'This file has been permanently removed.',
				'error'
			)
			this.ngOnInit()
		})
	}
}
