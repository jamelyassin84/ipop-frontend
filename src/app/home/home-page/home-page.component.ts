import {Component, OnInit} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {NavService} from 'src/app/components/nav/nav.service'
import {fader} from 'src/app/route-animation'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    animations: [fader],
})
export class HomePageComponent implements OnInit {
    constructor(private _navService: NavService) {}

    headerNotShown$ = this._navService.hide$

    public innerWidth: number = 0

    ngOnInit(): void {
        this.innerWidth = window.innerWidth
    }

    prepareRoute(outlet: RouterOutlet) {
        return (
            outlet &&
            outlet.activatedRouteData &&
            outlet.activatedRouteData.animation
        )
    }

    onResize() {
        this.innerWidth = window.innerWidth
        // 1140
    }
}
