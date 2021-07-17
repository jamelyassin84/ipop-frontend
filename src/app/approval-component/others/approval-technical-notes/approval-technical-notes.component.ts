import { Component, OnInit } from '@angular/core'
import { TechnicalNotesDummy } from 'src/app/home-components/technical-notes/TechnicalNotesDummy'

@Component({
	selector: 'Technical-Notes',
	templateUrl: './approval-technical-notes.component.html',
	styleUrls: ['./approval-technical-notes.component.scss'],
})
export class ApprovalTechnicalNotesComponent implements OnInit {
	constructor() {}
	TechnicalNotes = TechnicalNotesDummy
	ngOnInit(): void {}
}
