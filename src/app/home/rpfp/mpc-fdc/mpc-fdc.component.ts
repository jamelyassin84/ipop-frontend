import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Deleted, Fire } from 'src/app/components/Alert'
import { BaseService } from 'src/app/Services/base.service'
import { MpcFdcDataService } from 'src/app/Services/home/rpfp/mpc-fdc/mpc-fdc-data.service'
import { LocationService } from 'src/app/Services/locations/province.service'
import { ReloadService } from 'src/app/Services/reload.service'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'

@Component({
	selector: 'app-mpc-fdc',
	templateUrl: './mpc-fdc.component.html',
	styleUrls: ['./mpc-fdc.component.scss'],
})
export class MpcFdcComponent implements OnInit {
	constructor(
		private location: LocationService,
		private service: MpcFdcDataService,
		private component: ReloadService
	) {
		this.subscriptions.add(
			this.component.shouldReload().subscribe(() => {
				this.ngOnInit()
				this.getMPCFDC
			})
		)
	}

	private subscriptions = new Subscription()

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	districts = ['I', 'II', 'III', 'IV', 'V']

	ngOnInit(): void {
		this.getMuncipalities()
	}

	locations: any = {
		municipality: '',
		district: '',
	}

	municipalities: MunicipalityType[] = []
	getMuncipalities() {
		this.location
			.municipalities()
			.subscribe((municipalities: MunicipalityType[]) => {
				this.municipalities = municipalities
			})
	}

	MPCFDCs: any = []
	getMPCFDC() {
		const service = new BaseService(
			this.service.http,
			this.service.url,
			`municipality=${this.locations.municipality}&district=${this.locations.district}`
		)
		service.index().subscribe((data: any) => {
			this.MPCFDCs = data
		})
	}

	currenData: any = {}

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

	currentImages: any = []
	transformImages(photos: any) {
		this.currentImages = []
		photos.forEach((photo: any) => {
			this.currentImages.push(photo.file.uri)
		})
	}

	mpcfdc_id = 0
}
