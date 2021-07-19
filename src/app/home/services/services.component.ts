import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Alert, Fire, pop } from 'src/app/components/Alert'
import { ServicesOfferedService } from 'src/app/Services/services-offered/services-offered.service'
import { ReloadService } from 'src/app/Services/reload.service'
import { ServiceOffersService } from 'src/app/Services/services-offered/service-offers.service'

@Component({
	selector: 'app-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private service: ServicesOfferedService,
		private offers: ServiceOffersService,
		private component: ReloadService
	) {
		this.component.shouldReload().subscribe(() => {
			this.ngOnInit()
		})
	}

	ngOnInit(): void {
		this.servicesOffered()
	}

	serviceOffered: any = {}
	servicesOffered() {
		this.route.params.subscribe((params) => {
			pop()
			this.service.show(params['id']).subscribe((service: any) => {
				this.serviceOffered = service
				console.log(service)
			})
		})
	}

	removeService(id: number) {
		Fire('Remove Service?', 'Are you sure you want to permanently remove this data?', 'info', () => {
			this.offers.destroy(id).subscribe(() => {
				Alert('Success', 'Service has been removed', 'success')
			})
		})
	}
}
