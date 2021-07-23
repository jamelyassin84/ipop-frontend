import { LocalMigrationDataService } from './../../../../Services/home/demographic/migrations/local-migration-data.service'
import { Component, OnInit } from '@angular/core'
import { Fire, HasApprovals } from 'src/app/modules/extras/Alert'

@Component({
	selector: 'AddMigrationData',
	templateUrl: './add-migration-data.component.html',
	styleUrls: ['./add-migration-data.component.scss'],
})
export class AddMigrationDataComponent implements OnInit {
	constructor(private service: LocalMigrationDataService) {}

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
