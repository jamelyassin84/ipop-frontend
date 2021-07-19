import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'CustomizePMOCTeam',
	templateUrl: './customize-pmoc-team.component.html',
	styleUrls: ['./customize-pmoc-team.component.scss'],
})
export class CustomizePMOCTeamComponent implements OnInit {
	// constructor(private service: LocalBirthDataService) {}

	ngOnInit(): void {}

	data: any = {
		barangay: null,
		municipality: null,
		year: null,
		gender: 'male',
	}

	fetch(event: any) {
		this.data.barangay = event.barangay
		this.data.municipality = event.municipality
		this.data.year = event.year
	}

	save() {
		// Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
		// 	this.service.create(this.data).subscribe(() => {
		// 		Created()
		// 	})
		// })
	}
}
