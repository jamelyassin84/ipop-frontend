import { BaseService } from './../../../../Services/base.service'
import { MpcFdcPersonnelInchargeService } from './../../../../Services/home/rpfp/mpc-fdc/mpc-fdc-personnel-incharge.service'
import { Component, Input, OnInit } from '@angular/core'
import { Deleted, Fire } from 'src/app/components/Alert'
import { ReloadService } from 'src/app/Services/reload.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'ViewMPCFDCPersonnelIncharge',
	templateUrl: './view-personnel-incharge.component.html',
	styleUrls: ['./view-personnel-incharge.component.scss'],
})
export class ViewPersonnelInchargeComponent implements OnInit {
	constructor(
		private service: MpcFdcPersonnelInchargeService,
		private component: ReloadService
	) {
		this.subscriptions.add(
			this.component.shouldReload().subscribe(() => {
				this.ngOnInit()
			})
		)
	}

	private subscriptions = new Subscription()

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	@Input() mpcfdc_id: any

	personnels: any = []

	ngOnInit(): void {
		setTimeout(() => {
			new BaseService(
				this.service.http,
				this.service.url,
				`mpcfdc_id=${this.mpcfdc_id}`
			)
				.index()
				.subscribe((data: any) => {
					this.personnels = data
				})
		}, 300)
	}

	remove(id: number) {
		Fire(
			'Remove Data?',
			'Are you sure you want to remove this data?',
			'info',
			() => {
				this.service.destroy(id).subscribe(() => {
					Deleted()
				})
			}
		)
	}
}
