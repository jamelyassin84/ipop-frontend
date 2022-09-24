import {Deleted, Fire} from 'src/app/modules/extras/Alert'
import {Component, HostListener, OnInit} from '@angular/core'
import {PersonnelDirectoryService} from 'src/app/Services/home/about/personnel-directory.service'
import {ReloadService} from 'src/app/Services/reload.service'
import {PersonnelTypes} from './PersonnelTypes'
import {Subscription} from 'rxjs'
import {UserService} from 'src/app/Services/Independent/user.service'

@Component({
    selector: 'app-personnel-directory',
    templateUrl: './personnel-directory.component.html',
    styleUrls: ['./personnel-directory.component.scss'],
})
export class PersonnelDirectoryComponent implements OnInit {
    constructor(
        private service: PersonnelDirectoryService,
        private component: ReloadService,
        private user: UserService,
    ) {
        this.subscriptions.add(
            this.component.shouldReload().subscribe(() => {
                this.ngOnInit()
            }),
        )
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.innerWidth = window.innerWidth
    }

    readonly isUser = !this.user.isAdmin()

    innerWidth: number = 0

    subscriptions = new Subscription()

    types = PersonnelTypes

    ppo: any = []
    ad: any = []
    trd: any = []
    fod1: any = []
    fod2: any = []
    fod3: any = []
    fod4: any = []
    fod5: any = []
    apvw: any = []
    bod: any = []
    bspo1: any = []
    bspo2: any = []
    bspo3: any = []
    bspo4: any = []
    bspo5: any = []

    ngOnInit(): void {
        this.innerWidth = window.innerWidth
        this.service.index().subscribe((data) => {
            this.ppo = data.ppo
            this.ad = data.ad
            this.trd = data.trd
            this.fod1 = data.fod1
            this.fod2 = data.fod2
            this.fod3 = data.fod3
            this.fod4 = data.fod4
            this.fod5 = data.fod5
            this.apvw = data.apvw
            this.bod = data.bod
            this.bspo1 = data.bspo1
            this.bspo2 = data.bspo2
            this.bspo3 = data.bspo3
            this.bspo4 = data.bspo4
            this.bspo5 = data.bspo5
        })
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    remove(id: number) {
        Fire(
            'Remove Personnel?',
            'Are you sure you want to permanently remove this data?',
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
