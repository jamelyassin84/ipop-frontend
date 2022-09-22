import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {UserService} from 'src/app/Services/Independent/user.service'
import {SidebarType} from 'src/app/Types/navs/Sidebar.types'
import {Alert, Fire} from '../../modules/extras/Alert'
import {ADMIN, normal} from './Sidebar'

@Component({
    selector: 'Sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [...dbwAnimations],
})
export class SidebarComponent implements OnInit {
    constructor(private router: Router, private user: UserService) {}

    name = this.user.name()
    username = this.usernamify(this.user.name())
    avatar = localStorage.getItem('avatar')
    url = this.router.url
    mode = ''

    ngOnInit(): void {
        this.setMode()
        this.setMode()
    }

    sidebar: SidebarType[] =
        localStorage.getItem('role') !== 'Super Admin' ? normal : ADMIN

    usernamify(name: string) {
        let temp = name.split(' ')
        return `@${temp.join('_').toLowerCase()}`
    }

    handleChangeTab() {
        setTimeout(() => {
            this.url = this.router.url
        }, 100)
    }

    setMode() {
        localStorage.getItem('theme') === 'dark'
            ? localStorage.setItem('theme', 'light')
            : localStorage.setItem('theme', 'dark')
        localStorage.getItem('theme') === 'dark'
            ? (this.mode = 'Light')
            : (this.mode = 'Dark')
    }

    logout() {
        Fire('Sign-Out?', 'Are you sure you want to Sign-Out?', 'info', () => {
            localStorage.clear()
            this.router.navigate(['/admin'])
            Alert(
                'Thank you',
                `For using Iloilo Provincial Office's Automated System`,
                'success',
            )
        })
    }
}
