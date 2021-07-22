import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-record-upload',
	templateUrl: './record-upload.component.html',
	styleUrls: ['./record-upload.component.scss'],
})
export class RecordUploadComponent implements OnInit {
	constructor() {}

	types = [
		'CPDB',
		'Birth',
		'Death',
		'InMigration',
		'OutMigration',
		'Marriage',
	]

	ngOnInit(): void {}
}
