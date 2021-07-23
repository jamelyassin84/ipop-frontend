import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Welcome } from 'src/app/modules/extras/Alert'
import { stringify } from 'src/app/constants/Shortcuts'
import { AuthService } from 'src/app/Services/Independent/auth.service'
import { UserType } from 'src/app/Types/User.types'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	constructor(private router: Router, private auth: AuthService) {}

	ngOnInit(): void {
		if (localStorage.getItem('token') != undefined) {
			this.router.navigate(['home/index/news'])
		}
	}

	data: any = {
		username: '',
		password: '',
	}

	isLoading = false
	login() {
		this.isLoading = true
		this.auth.cache = ''
		this.auth.login(this.data)?.subscribe(
			(data: Login) => {
				localStorage.setItem('token', data.token)
				const user: UserType = data.user
				console.log(user.roles[0].name)
				localStorage.setItem('role', user.roles[0].name)
				localStorage.setItem(
					'avatar',
					user.profile_picture?.uri || 'null'
				)
				localStorage.setItem('user', stringify(user))
				this.isLoading = false
				Welcome(user.fullname)
				this.router.navigate(['home/index/news'])
			},
			() => (this.isLoading = false)
		)
	}
}

interface Login {
	token: string
	user: UserType
}
