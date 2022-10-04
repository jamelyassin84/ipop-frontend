import {UserType} from '../../../../Types/User.types'
import {Component, OnInit} from '@angular/core'
import {UserService} from 'src/app/Services/Independent/user.service'
import {ReloadService} from 'src/app/Services/reload.service'
import {Subscription} from 'rxjs'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'app-view-admins',
    templateUrl: './view-admins.component.html',
    styleUrls: ['./view-admins.component.scss'],
    animations: [...dbwAnimations],
})
export class ViewAdminsComponent implements OnInit {
    constructor(private user: UserService, private component: ReloadService) {
        this.subscriptions.add(
            this.component.shouldReload().subscribe(() => {
                this.ngOnInit()
            }),
        )
    }

    subscriptions = new Subscription()

    currentAdmin: UserType | any = {}

    admins: UserType[] = []

    paginationMeta: any = {links: []}

    ngOnInit(): void {
        this.getAdmins()
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    onPageChange(event: any) {
        this.paginationMeta = event
        this.admins = event.data
    }

    getAdmins() {
        this.user.index().subscribe((pages: any) => {
            this.admins = pages.data
            this.paginationMeta = pages
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
