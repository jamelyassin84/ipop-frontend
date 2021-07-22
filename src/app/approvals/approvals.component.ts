import { Fire } from 'src/app/components/Alert'
import { UserType } from 'src/app/Types/User.types'
import { Component, OnInit } from '@angular/core'
import { Alert } from '../components/Alert'
import { ApprovalsService } from '../Services/Independent/approvals.service'

@Component({
	selector: 'app-approvals',
	templateUrl: './approvals.component.html',
	styleUrls: ['./approvals.component.scss'],
})
export class ApprovalsComponent implements OnInit {
	constructor(private service: ApprovalsService) {
		setInterval(() => {
			localStorage.setItem('hideNav', 'true')
		}, 50)
	}

	approvals: Approval[] = []
	ngOnInit(): void {
		this.approvals = []
		this.service.index().subscribe((data: any) => {
			this.approvals = data
		})
	}

	approve(mode: boolean) {
		const approval = mode === true ? 'Approve' : 'Discard'
		if (mode === true) {
			Fire(`${approval} content?`, `Are you sure you want to ${approval} this content?`, 'info', () => {
				this.service.update(this.data.id, { approved: mode }).subscribe(() => {
					Alert('Horay!', 'Content has beeen succesfully posted', 'success')
					this.ngOnInit()
					this.type = ''
				})
			})
		} else {
			Fire(`${approval} content?`, `Are you sure you want to ${approval} this content?`, 'info', () => {
				this.service.destroy(this.data.id).subscribe(() => {
					Alert('Content Discarded', 'Content has beeen  discarded', 'warning')
					this.ngOnInit()
					this.type = ''
				})
			})
		}
	}

	type: string = ''
	data: any = {}
	types = ['App\\Models\\Slider', 'AppModelsQuickLinks', 'AppModelsArticle', 'AppModelsCMSChart', 'AppModelsCMSChart']
}

type Approval = {
	approvable: any
	approvable_id: null
	approvable_type: any
	id: 176
	message: string
	requester: UserType
}
