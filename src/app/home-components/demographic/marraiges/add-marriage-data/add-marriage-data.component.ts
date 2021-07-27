import { MarraigesService } from './../../../../Services/home/demographic/marraiges/marraiges.service'
import { Component, OnInit } from '@angular/core'
import { Fire, HasApprovals } from 'src/app/modules/extras/Alert'

@Component({
	selector: 'AddMarriageData',
	templateUrl: './add-marriage-data.component.html',
	styleUrls: ['./add-marriage-data.component.scss'],
})
export class AddMarriageDataComponent implements OnInit {
	constructor(private service: MarraigesService) {}

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
