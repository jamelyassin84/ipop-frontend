import {Component, Input, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {Deleted, Fire} from 'src/app/modules/extras/Alert'
import {BaseService} from 'src/app/Services/base.service'
import {PersonnelInchargeOfTeenCenterService} from 'src/app/Services/home/ahyd/teen-center/personnel-incharge-of-teen-center.service'
import {UserService} from 'src/app/Services/Independent/user.service'
import {ReloadService} from 'src/app/Services/reload.service'

@Component({
    selector: 'ViewPersonnelIncharge',
    templateUrl: './view-tc-personnel-incharge.component.html',
    styleUrls: ['./view-tc-personnel-incharge.component.scss'],
})
export class ViewTcPersonnelInchargeComponent implements OnInit {
    constructor(
        private service: PersonnelInchargeOfTeenCenterService,
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

    personnels: any = []

    subscriptions = new Subscription()

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    @Input() teen_center_id: number = 0

    ngOnInit(): void {
        setTimeout(() => {
            new BaseService(
                this.service.http,
                this.service.url,
                `sbmptc_id=${this.teen_center_id}`,
            )
                .index()
                .subscribe((data: any) => {
                    this.personnels = data
                })
        }, 300)
    }

    remove(id: number) {
        Fire(
            'Remove Data?',
            'Are you sure you want to remove this data?',
            'info',
            () => {
                this.service.destroy(id).subscribe(() => {
                    Deleted()
                })
            },
        )
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
