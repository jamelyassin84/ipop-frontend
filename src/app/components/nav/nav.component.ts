import { Component, OnInit } from '@angular/core'
import { homeNavs } from 'src/app/home/homeNav'

@Component({
	selector: 'Navbar',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {
		setInterval(() => {
			if (localStorage.getItem('hideNav') !== 'true') {
				this.hideNav = true
			} else {
				this.hideNav = false
			}
		}, 50)
	}

	navs = homeNavs
	title: String = 'News'
	hideNav = false

	setTitle(title: String) {
		this.title = title
	}
}
