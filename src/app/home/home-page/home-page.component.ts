import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { fader } from 'src/app/route-animation'

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	animations: [fader],
})
export class HomePageComponent implements OnInit {
	public innerWidth: any

	constructor() {}

	ngOnInit(): void {
		this.innerWidth = window.innerWidth
	}

	prepareRoute(outlet: RouterOutlet) {
		return (
			outlet &&
			outlet.activatedRouteData &&
			outlet.activatedRouteData['animation']
		)
	}

	onResize() {
		this.innerWidth = window.innerWidth
		// 1140
	}
}
