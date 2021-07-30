import { HostListener } from '@angular/core'
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
	public innerWidth: any
	ngOnInit(): void {
		this.innerWidth = window.innerWidth
		setInterval(() => {
			if (localStorage.getItem('hideNav') !== 'true') {
				this.hideNav = true
			} else {
				this.hideNav = false
			}
		}, 50)
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.innerWidth = window.innerWidth
		// 1140
	}

	isUser = !this.user.isAdmin()

	navs = homeNavs
	title: String = 'News'
	hideNav = false

	setTitle(title: String) {
		this.title = title
	}

	showSmallNav = false
	setShowSmallNav() {
		this.showSmallNav = this.showSmallNav === false ? true : false
	}

	onClose() {
		this.showSmallNav = false
	}
}
