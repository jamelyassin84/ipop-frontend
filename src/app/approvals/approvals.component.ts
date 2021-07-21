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
	constructor(private service: ApprovalsService) {}

	approvals: Approval[] = []
	ngOnInit(): void {
		this.service.index().subscribe((data: any) => {
			this.approvals = data.data
		})
	}

	alert1() {
		Alert('aw', '', 'success')
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
