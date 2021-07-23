import { LocationService } from './../../../Services/locations/province.service'
import { Component, OnInit } from '@angular/core'
import { Alert, Fire, HasApprovals } from 'src/app/modules/extras/Alert'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'
import { TopPopulatedService } from 'src/app/Services/home/population/top-populated.service'

@Component({
	selector: 'AddTopPopulated',
	templateUrl: './top-populated.component.html',
	styleUrls: ['./top-populated.component.scss'],
})
export class TopPopulatedComponent implements OnInit {
	constructor(
		private location: LocationService,
		private service: TopPopulatedService
	) {}

	ngOnInit(): void {
		this.getMuncipalities()
	}

	municipalities: MunicipalityType[] = []
	getMuncipalities() {
		this.location.municipalities().subscribe((data: any) => {
			this.municipalities = data
		})
	}

	changeHandler(event: any) {
		this.topPopulated.data.name =
			event.target.options[event.target.options.selectedIndex].text
	}

	topPopulated = {
		data: {
			name: '',
			total: '',
			percent: '',
		},
	}

	isLoading: boolean = false
	save() {
		Fire(
			'Save Changes?',
			'Are you sure you want to add this data?',
			'info',
			() => {
				this.isLoading = true
				this.service.create(this.topPopulated).subscribe(() => {
					HasApprovals('Created')
					this.isLoading = false
				})
			}
		)
	}
}
