import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'SingleFileUploads',
	templateUrl: './single-file-upload.component.html',
	styleUrls: ['./single-file-upload.component.scss'],
})
export class SingleFileUploadComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	@Input() base64: boolean = false
	@Input() class: any = ''
	@Output() onChange = new EventEmitter()

	triggerInput() {
		document.getElementById('file')?.click()
	}

	src: any = '../../../assets/ipop/placeholders/thumbnail.png'
	readUrl(event: any) {
		const reader = new FileReader()
		reader.readAsDataURL(event.target.files[0])
		reader.onload = (e: any) => {
			this.src = e.target.result
			if (!this.base64) {
				this.onChange.emit(event.target.files[0])
				return
			}
			this.onChange.emit(this.src)
		}
	}
}
