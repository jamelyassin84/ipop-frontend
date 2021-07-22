import { PmocDataService } from './../../../../Services/home/rpfp/pmoc/pmoc-data.service'
import { Component, OnInit } from '@angular/core'
import { Fire, HasApprovals } from 'src/app/components/Alert'

@Component({
	selector: 'AddPMOCData',
	templateUrl: './add-pmoc-data.component.html',
	styleUrls: ['./add-pmoc-data.component.scss'],
})
export class AddPmocDataComponent implements OnInit {
	constructor(private service: PmocDataService) {}

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
