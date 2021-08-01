import { Component, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'FileDropZone',
	templateUrl: './file-dropzone.component.html',
})
export class FileDropzoneComponent implements OnInit {
	@Output() onEmit = new EventEmitter()

	constructor() {}

	ngOnInit(): void {}

	files: any = []

	onSelect(event: any) {
		this.files.push(...event.addedFiles)
		this.onEmit.emit(this.files)
	}

	onRemove(event: any) {
		this.files.splice(this.files.indexOf(event), 1)
		this.onEmit.emit(this.files)
	}
}
