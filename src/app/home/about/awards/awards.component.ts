import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Alert, Fire } from 'src/app/components/Alert'
import { AwardsService } from 'src/app/Services/home/about/awards.service'
import { ReloadService } from 'src/app/Services/reload.service'

@Component({
	selector: 'app-awards',
	templateUrl: './awards.component.html',
	styleUrls: ['./awards.component.scss'],
})
export class AwardsComponent implements OnInit {
	constructor(
		private service: AwardsService,
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

	awards: any[] = []
	currentImages: any = []

	ngOnInit(): void {
		this.service.index().subscribe((awards: any[]) => {
			this.awards = awards
		})
	}

	transformImages(photos: any) {
		this.currentImages = []
		photos.forEach((photo: any) => {
			this.currentImages.push(photo.file.uri)
		})
	}

	removeAward(id: number) {
		Fire(
			'Remove Award?',
			'Are you sure you want to permanently remove this data?',
			'info',
			() => {
				this.service.destroy(id).subscribe(() => {
					Alert('Success', 'Award has been removed', 'success')
				})
			}
		)
	}
}
