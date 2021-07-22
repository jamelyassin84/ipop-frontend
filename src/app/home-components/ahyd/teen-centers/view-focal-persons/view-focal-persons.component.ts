import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Deleted, Fire } from 'src/app/components/Alert'
import { FocalPersonsService } from 'src/app/Services/home/ahyd/teen-center/focal-persons.service'
import { ReloadService } from 'src/app/Services/reload.service'

@Component({
	selector: 'ViewFocalPersons',
	templateUrl: './view-focal-persons.component.html',
	styleUrls: ['./view-focal-persons.component.scss'],
})
export class ViewFocalPersonsComponent implements OnInit {
	constructor(
		private service: FocalPersonsService,
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

	focaPersons: any = []
	ngOnInit(): void {
		this.service.index().subscribe((data: any) => {
			this.focaPersons = data
		})
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
