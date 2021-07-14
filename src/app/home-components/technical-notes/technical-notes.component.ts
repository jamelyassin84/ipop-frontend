import { Component, OnInit } from '@angular/core'
import { TechnicalNotesDummy } from './TechnicalNotesDummy'

@Component({
	selector: 'TechnicalNotes',
	templateUrl: './technical-notes.component.html',
	styleUrls: ['./technical-notes.component.scss'],
})
export class TechnicalNotesComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	TechnicalNotes = TechnicalNotesDummy
}
