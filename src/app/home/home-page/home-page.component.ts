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
	constructor() {}

	ngOnInit(): void {}

	prepareRoute(outlet: RouterOutlet) {
		return (
			outlet &&
			outlet.activatedRouteData &&
			outlet.activatedRouteData['animation']
		)
	}
}
