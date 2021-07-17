import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Welcome } from 'src/app/components/Alert'
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

	ngOnInit(): void {}

	data: any = {
		username: '',
		password: '',
	}
	isLoading = false
	login() {
		this.isLoading = true
		this.auth.cache = ''
		this.auth.login(this.data)?.subscribe((data: Login) => {
			localStorage.setItem('token', data.token)
			const user: UserType = data.user
			console.log(user.roles[0].name)
			localStorage.setItem('isUser', stringify(user.roles[0].name))
			localStorage.setItem('user', stringify(user))
			this.isLoading = false
			Welcome(user.fullname)
			this.router.navigate(['home/index/news'])
		})
	}
}
interface Login {
	token: string
	user: UserType
}
