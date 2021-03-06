import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Deleted, Fire } from 'src/app/modules/extras/Alert'
import { AhydTeamService } from 'src/app/Services/home/ahyd/teen-center/ahyd-team.service'
import { UserService } from 'src/app/Services/Independent/user.service'
import { ReloadService } from 'src/app/Services/reload.service'

@Component({
	selector: 'ViewHAYDTeam',
	templateUrl: './view-ahyd-team.component.html',
	styleUrls: ['./view-ahyd-team.component.scss'],
})
export class ViewAhydTeamComponent implements OnInit {
	constructor(
		private service: AhydTeamService,
		private component: ReloadService,
		private user: UserService
	) {
		this.subscriptions.add(
			this.component.shouldReload().subscribe(() => {
				this.ngOnInit()
			})
		)
	}

	isUser = !this.user.isAdmin()
	isSuperAdmin = !this.user.isSuperAdmin()

	private subscriptions = new Subscription()

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	AHYDTeam: any = []
	ngOnInit(): void {
		this.service.index().subscribe((data: any) => {
			this.AHYDTeam = data
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
