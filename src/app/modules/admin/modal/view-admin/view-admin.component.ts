import { Component, Input, OnInit } from '@angular/core'
import { Alert, Fire } from 'src/app/components/Alert'
import { UserService } from 'src/app/Services/Independent/user.service'
import { ReloadService } from 'src/app/Services/reload.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'ViewAdmin',
	templateUrl: './view-admin.component.html',
	styleUrls: ['./view-admin.component.scss'],
})
export class ViewAdminModalComponent implements OnInit {
	constructor(private user: UserService, private component: ReloadService) {
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

	@Input() admin: any = {}

	ngOnInit(): void {}

	role = ''
	isLoading = false
	changeRole() {
		Fire(
			'Continue?',
			`This will change ${this.admin.fullname}'s level of authority. Continue?`,
			'info',
			() => {
				this.isLoading = true
				this.user
					.update(this.admin.id, {
						role: this.role,
					})
					.subscribe(() => {
						Alert(
							`${this.admin.fullname} has been changed to ${this.role}`,
							'',
							'success'
						)
						this.isLoading = false
						this.admin.roles[0].name = this.role
						this.role = ''
					})
			}
		)
	}
	block() {
		Fire(
			'Continue?',
			'Are you sure you want to perform this operation?',
			'info',
			() => {
				this.user
					.update(this.admin.id, {
						blocked: true,
					})
					.subscribe(() => {
						Alert(
							`${this.admin.fullname} has been blocked`,
							'',
							'warning'
						)
						this.admin.iterations = 5
					})
			}
		)
	}
	reactivate() {
		Fire(
			'Continue?',
			'Are you sure you want to perform this operation?',
			'info',
			() => {
				this.user
					.update(this.admin.id, {
						blocked: false,
					})
					.subscribe(() => {
						Alert(
							`Successfully Reactivated`,
							`${this.admin.fullname} has been successfully Reactivated`,
							'success'
						)
						this.admin.iterations = 0
					})
			}
		)
	}
	remove() {
		Fire(
			'Continue?',
			`Are you sure you want to remove ${this.admin.fullname} as admin?`,
			'info',
			() => {
				this.user.destroy(this.admin.id).subscribe(() => {
					Alert(
						`${this.admin.fullname} has been removed `,
						'',
						'warning'
					)
				})
			}
		)
	}
}
