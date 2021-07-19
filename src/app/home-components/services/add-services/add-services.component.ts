import { Component, Input, OnInit } from '@angular/core'
import { Alert, Created, Fire } from 'src/app/components/Alert'
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

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.offers.create(this.offer).subscribe(() => {
				Created()
			})
		})
	}
}
