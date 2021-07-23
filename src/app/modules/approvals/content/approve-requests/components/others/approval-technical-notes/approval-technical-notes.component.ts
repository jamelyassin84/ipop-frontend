import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'Technical-Notes',
	templateUrl: './approval-technical-notes.component.html',
	styleUrls: ['./approval-technical-notes.component.scss'],
})
export class ApprovalTechnicalNotesComponent implements OnInit {
	constructor() {}
	TechnicalNotes: any = []
	@Input() data: any = ''

	ngOnInit(): void {}
}
