import { Component, OnInit } from '@angular/core'
import { homeNavs } from 'src/app/home/homeNav'
import { UserService } from 'src/app/Services/Independent/user.service'

@Component({
	selector: 'Navbar',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	constructor(private user: UserService) {}
	public isMenuCollapsed = true
	ngOnInit(): void {
		setInterval(() => {
			if (localStorage.getItem('hideNav') !== 'true') {
				this.hideNav = true
			} else {
				this.hideNav = false
			}
		}, 50)
	}

	isUser = !this.user.isAdmin()

	navs = homeNavs
	title: String = 'News'
	hideNav = false

	setTitle(title: String) {
		this.title = title
	}
}
