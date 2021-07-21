import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Fire } from 'src/app/components/Alert'
import { ReloadService } from 'src/app/Services/reload.service'

@Component({
	selector: 'app-teen-centers',
	templateUrl: './teen-centers.component.html',
	styleUrls: ['./teen-centers.component.scss'],
})
export class TeenCentersComponent implements OnInit {
	constructor(private component: ReloadService) {
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

	ngOnInit(): void {}

	remove() {
		Fire('Remove Data?', 'Are you sure you want to remove this data?', 'info', () => {})
	}
}
