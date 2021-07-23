import { Component, Input, OnInit } from '@angular/core'
import { ServicesOfferedService } from 'src/app/Services/services-offered/services-offered.service'

@Component({
	selector: 'ServicesOffered',
	templateUrl: './approval-services-offered.component.html',
	styleUrls: ['./approval-services-offered.component.scss'],
})
export class ApprovalServicesOfferedComponent implements OnInit {
	constructor(private service: ServicesOfferedService) {}
	@Input() data: any = ''

	ngOnInit(): void {
		this.servicesOffered()
	}

	serviceOffered: any = {}
	servicesOffered() {
		this.service.show(this.data['service_id']).subscribe((service: any) => {
			this.serviceOffered = service
		})
	}
}
