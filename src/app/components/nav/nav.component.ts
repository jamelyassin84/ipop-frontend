import {BehaviorSubject, Subscription} from 'rxjs'
import {HostListener} from '@angular/core'
import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {homeNavs} from 'src/app/home/homeNav'
import {UserService} from 'src/app/Services/Independent/user.service'
import {NavService} from './nav.service'

@Component({
    selector: 'Navbar',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    animations: [...dbwAnimations],
})
export class NavComponent implements OnInit {
    constructor(
        private _router: Router,
        private _user: UserService,
        private _navService: NavService,
    ) {}

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.innerWidth = window.innerWidth
    }

    readonly isUser = !this._user.isAdmin()

    readonly navs = homeNavs

    hideNav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    subscription?: Subscription

    title: string = 'News'

    showSmallNav = false

    isMenuCollapsed = true

    innerWidth: any

    ngOnInit(): void {
        this.innerWidth = window.innerWidth

        this.hideNav$.subscribe((value) => {
            this._navService.hide$.next(value)
        })

        setInterval(() => {
            if (localStorage.getItem('hideNav') !== 'true') {
                this.hideNav$.next(true)
            } else {
                this.hideNav$.next(false)
            }
        }, 50)
    }

    setTitle(title: string) {
        this.title = title
    }

    setShowSmallNav() {
        this.showSmallNav = this.showSmallNav === false ? true : false
    }

    onClose() {
        this.showSmallNav = false
    }

    icludesUrl(urL: any) {
        if (this._router.url.indexOf(urL) > -1) {
            return true
        }
        return false
    }
}
