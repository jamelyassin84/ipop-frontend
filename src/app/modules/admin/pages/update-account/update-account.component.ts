import { Component, OnInit } from '@angular/core'
import {
	Alert,
	Created,
	Fire,
	ValidationError,
} from 'src/app/modules/extras/Alert'
import { UserService } from 'src/app/Services/Independent/user.service'

@Component({
	selector: 'app-update-account',
	templateUrl: './update-account.component.html',
	styleUrls: ['./update-account.component.scss'],
})
export class UpdateAccountComponent implements OnInit {
	constructor(private service: UserService) {}

	admin: any = {}
	src: any = ''
	ngOnInit(): void {
		this.service.show(this.service.id()).subscribe((data: any) => {
			this.admin = data
			this.src =
				this.admin?.profile_picture?.uri || '/assets/avatars/face-7.jpg'
		})
	}

	triggerFile() {
		document.getElementById('file')?.click()
	}

	readURL(event: any) {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader()
			reader.readAsDataURL(event.target.files[0])
			reader.onload = (event: any) => {
				this.src = event.target.result
				this.admin.profile_picture = event.target.result
			}
		}
	}

	isLoading = false
	save() {
		if (this.admin.new_password !== this.admin.confirm_new_password) {
			return Alert('Error!', 'Password does not match!', 'error')
		}
		if (
			this.admin.username === '' ||
			this.admin.old_password === '' ||
			this.admin.new_password === '' ||
			this.admin.confirm_new_password === ''
		) {
			return ValidationError()
		}
		Fire(
			'Update Account',
			'This will update your account. Continue?',
			'info',
			() => {
				this.isLoading = true
				this.service
					.update(this.service.id(), this.admin)
					.subscribe((user: any) => {
						Created()
						this.isLoading = false
						localStorage.setItem('user', JSON.stringify(user))
						localStorage.setItem('role', user.roles[0].name)
						localStorage.setItem(
							'avatar',
							user.profile_picture?.uri || 'null'
						)
						setTimeout(() => {
							location.reload()
						}, 1000)
					})
			}
		)
	}
}
