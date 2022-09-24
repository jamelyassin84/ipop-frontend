import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Alert, Fire, pop} from 'src/app/modules/extras/Alert'
import {ServicesOfferedService} from 'src/app/Services/services-offered/services-offered.service'
import {ReloadService} from 'src/app/Services/reload.service'
import {ServiceOffersService} from 'src/app/Services/services-offered/service-offers.service'
import {Subscription} from 'rxjs'
import {UserService} from 'src/app/Services/Independent/user.service'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss'],
    animations: [...dbwAnimations],
})
export class ServicesComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private service: ServicesOfferedService,
        private offers: ServiceOffersService,
        private component: ReloadService,
        private user: UserService,
    ) {
        this.subscriptions.add(
            this.component.shouldReload().subscribe(() => {
                this.ngOnInit()
            }),
        )
    }

    readonly isUser = !this.user.isAdmin()
    readonly isSuperAdmin = !this.user.isSuperAdmin()

    serviceOffered: any = {}

    private subscriptions = new Subscription()

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }
    ngOnInit(): void {
        this.servicesOffered()
    }

    servicesOffered() {
        this.route.params.subscribe((params) => {
            pop()
            this.service.show(params['id']).subscribe((service: any) => {
                this.serviceOffered = service
            })
        })
    }

    removeService(id: number) {
        Fire(
            'Remove Service?',
            'Are you sure you want to permanently remove this data?',
            'info',
            () => {
                this.offers.destroy(id).subscribe(() => {
                    Alert('Success', 'Service has been removed', 'success')
                })
            },
        )
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
