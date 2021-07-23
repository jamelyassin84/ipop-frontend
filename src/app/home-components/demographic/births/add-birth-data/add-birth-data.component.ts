import { LocalBirthDataService } from './../../../../Services/home/demographic/births/local-birth-data.service'
import { Component, OnInit } from '@angular/core'
import { Created, Fire, HasApprovals } from 'src/app/modules/extras/Alert'

@Component({
	selector: 'AddBirthData',
	templateUrl: './add-birth-data.component.html',
	styleUrls: ['./add-birth-data.component.scss'],
})
export class AddBirthDataComponent implements OnInit {
	constructor(private service: LocalBirthDataService) {}

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

	isLoading: boolean = false
	save() {
		Fire(
			'Save Changes?',
			'Are you sure you want to add this data?',
			'info',
			() => {
				this.isLoading = true
				this.service.create(this.data).subscribe(() => {
					HasApprovals('Created')
					this.isLoading = false
				})
			}
		)
	}
}
