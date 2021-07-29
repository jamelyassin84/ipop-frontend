import { Deleted, Fire } from 'src/app/modules/extras/Alert'
import { Component, OnInit } from '@angular/core'
import { MpcFdcTeamService } from 'src/app/Services/home/rpfp/mpc-fdc/mpc-fdc-team.service'
import { ReloadService } from 'src/app/Services/reload.service'
import { Subscription } from 'rxjs'
import { UserService } from 'src/app/Services/Independent/user.service'

@Component({
	selector: 'ViewMPCFDCTeam',
	templateUrl: './view-mpc-fdc-team.component.html',
	styleUrls: ['./view-mpc-fdc-team.component.scss'],
})
export class ViewMpcFdcTeamComponent implements OnInit {
	constructor(
		private service: MpcFdcTeamService,
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

	private subscriptions = new Subscription()

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}
	teams: any = []
	ngOnInit(): void {
		this.service.index().subscribe((data: any) => {
			this.teams = data.data
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
