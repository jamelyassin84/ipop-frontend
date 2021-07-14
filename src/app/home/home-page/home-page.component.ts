import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { fader } from 'src/app/route-animation'
import { homeNavs } from '../homeNav'

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	animations: [fader],
})
export class HomePageComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	navs = homeNavs

	title: String = 'News'

	setTitle(title: String) {
		this.title = title
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
	}
}
