import { ProgramAreasService } from '../../Services/home/program-areas/program-areas.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Alert, Fire, pop } from 'src/app/modules/extras/Alert'
import { ReloadService } from 'src/app/Services/reload.service'
import { ActivityService } from 'src/app/Services/home/program-areas/activity.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-programs',
	templateUrl: './programs.component.html',
	styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private service: ProgramAreasService,
		private component: ReloadService,
		private activityService: ActivityService
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

	ngOnInit(): void {
		this.getProgramArea()
	}

	programArea: ProgramArea | any = {}
	getProgramArea() {
		this.route.params.subscribe((params) => {
			pop()
			this.service
				.show(params['id'])
				.subscribe((programArea: ProgramArea) => {
					this.programArea = programArea
				})
		})
	}

	removeActivity(id: number) {
		Fire(
			'Remove Activity?',
			'Are you sure you want to permanently remove this data?',
			'info',
			() => {
				this.activityService.destroy(id).subscribe(() => {
					Alert('Success', 'Activity has been removed', 'success')
				})
			}
		)
	}

	currentImages: any[] = []
	transformImages(photos: any) {
		this.currentImages = []
		photos.forEach((photo: any) => {
			this.currentImages.push(photo.file.uri)
		})
	}
}
interface ProgramArea {
	title: string
	description: string
	activities: Activities
}

interface Activities {
	files: any
	program_area_id: number
	title: number
	description: string
	created_at: any
}
