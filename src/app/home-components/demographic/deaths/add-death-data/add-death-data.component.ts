import { LocalDeathDataService } from './../../../../Services/home/demographic/deaths/local-death-data.service'
import { Component, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'

@Component({
	selector: 'AddDeathData',
	templateUrl: './add-death-data.component.html',
	styleUrls: ['./add-death-data.component.scss'],
})
export class AddDeathDataComponent implements OnInit {
	constructor(private service: LocalDeathDataService) {}

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
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.service.create(this.data).subscribe(() => {
				Created()
			})
		})
	}
}
