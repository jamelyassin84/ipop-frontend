import { LocalDeathDataService } from './../../../../Services/home/demographic/deaths/local-death-data.service'
import { Component, OnInit } from '@angular/core'
import { Fire, HasApprovals } from 'src/app/components/Alert'

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
