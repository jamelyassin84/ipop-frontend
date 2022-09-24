import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core'
import {Router} from '@angular/router'
import {homeNavs} from 'src/app/home/homeNav'
import {Alert, Fire} from 'src/app/modules/extras/Alert'
import {UserService} from 'src/app/Services/Independent/user.service'

@Component({
    selector: 'SmallScreenNav',
    templateUrl: './small-screen-nav.component.html',
    styleUrls: ['./small-screen-nav.component.scss'],
})
export class SmallScreenNavComponent implements OnInit {
    constructor(private router: Router, private user: UserService) {}

    ngOnInit(): void {}

    @Input() data: any = false
    @Output() onClose = new EventEmitter()

    navs = homeNavs
    isUser = !this.user.isAdmin()

    setShowSmallNav() {
        this.data = false
        this.onClose.emit('false')
    }

    logout() {
        Fire('Sign-Out?', 'Are you sure you want to Sign-Out?', 'info', () => {
            localStorage.clear()
            this.router.navigate([''])
            Alert(
                'Thank you',
                `For using Iloilo Provincial Office's Automated System`,
                'success',
            )
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
