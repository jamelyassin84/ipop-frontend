import { Component } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { fader } from './route-animation'
import { NetworkStatusAngularService } from 'network-status-angular'
import { Alert, Fire } from './modules/extras/Alert'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [fader],
})
export class AppComponent {
	title = 'IPOP'
	constructor(
		private NetworkStatusAngularService: NetworkStatusAngularService,
		private router: Router
	) {
		this.NetworkStatusAngularService.status.subscribe(
			(hasInternetConnection: boolean) => {
				if (hasInternetConnection) {
					Fire(
						'Your Connection was restored',
						'Your back online! Go to Home Page?',
						'success',
						() => {
							this.router.navigate(['/home/index/news'])
						}
					)
				} else {
					this.router.navigate(['/no-internet'])
				}
			}
		)
	}

	prepareRoute(outlet: RouterOutlet) {
		return (
			outlet &&
			outlet.activatedRouteData &&
			outlet.activatedRouteData.animation
		)
	}
}
