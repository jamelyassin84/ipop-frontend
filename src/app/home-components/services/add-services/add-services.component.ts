import { Component, Input, OnInit } from '@angular/core'
import { Alert, Created, Fire, HasApprovals } from 'src/app/modules/extras/Alert'
import { ServiceOffersService } from 'src/app/Services/services-offered/service-offers.service'

@Component({
	selector: 'AddServices',
	templateUrl: './add-services.component.html',
	styleUrls: ['./add-services.component.scss'],
})
export class AddServicesComponent implements OnInit {
	constructor(private offers: ServiceOffersService) {}

	@Input() service_id = ''

	ngOnInit(): void {
		this.offer.service_id = this.service_id
	}

	offer = {
		title: '',
		service_id: '',
	}

	isLoading: boolean = false
	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.isLoading = true
			this.offers.create(this.offer).subscribe(() => {
				HasApprovals('Created')
				this.isLoading = false
			})
		})
	}
}
