import { Fire } from 'src/app/modules/extras/Alert'
import { UserType } from 'src/app/Types/User.types'
import { Component, OnInit } from '@angular/core'
import { Alert } from '../../../../extras/Alert'
import { ApprovalsService } from '../../../../../Services/Independent/approvals.service'

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
		this.service.index().subscribe((data: any) => {
			this.approvals = data
		})
	}

	isLoading = false
	approve(mode: boolean) {
		const approval = mode === true ? 'Approve' : 'Discard'
		if (mode === true) {
			Fire(
				`${approval} content?`,
				`Are you sure you want to ${approval} this content?`,
				'info',
				() => {
					this.isLoading = true
					this.service
						.update(this.id, { approved: mode })
						.subscribe(() => {
							Alert(
								'Horay!',
								'Content has been succesfully posted',
								'success'
							)
							this.ngOnInit()
							this.type = ''
							this.isLoading = false
						})
				}
			)
		} else {
			Fire(
				`${approval} content?`,
				`Are you sure you want to ${approval} this content?`,
				'info',
				() => {
					this.isLoading = true
					this.service.destroy(this.id).subscribe(() => {
						Alert(
							'Discarded',
							'Content has been discarded,rejected and removed',
							'warning'
						)
						this.ngOnInit()
						this.type = ''
						this.isLoading = false
					})
				}
			)
		}
	}

	id: number = 0
	type: string = ''
	data: any = {}

	storedApprovalID: number[] = []

	onCheck(id: number, event: any, index: number) {
		const isChecked = event.currentTarget.checked
		if (isChecked) {
			this.storedApprovalID.push(id)
			return
		}
		this.storedApprovalID.splice(index, 1)
	}

	updateApprovals(mode: boolean) {
		const approval = mode === true ? 'Approve' : 'Discard'
		Fire(
			`${approval} All Content?`,
			`Are you sure you want to ${approval} this content?`,
			'info',
			() => {
				this.isLoading = true
				for (let id in this.storedApprovalID) {
					if (parseInt(id) === this.storedApprovalID.length - 1) {
						Alert(`${approval} Successfull`, '', 'success')
						break
					}
					if (mode === true) {
						this.service
							.update(this.storedApprovalID[id], {
								approved: mode,
							})
							.subscribe(() => {
								this.ngOnInit()
								this.type = ''
								this.isLoading = false
							})
					} else {
						this.service
							.destroy(this.storedApprovalID[id])
							.subscribe(() => {
								this.ngOnInit()
								this.type = ''
								this.isLoading = false
							})
					}
				}
			}
		)
	}
}

type Approval = {
	approvable: any
	approvable_id: null
	approvable_type: any
	id: 176
	message: string
	requester: UserType
}
