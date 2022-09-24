import {Component, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {Deleted, Fire} from 'src/app/modules/extras/Alert'
import {OthersService} from 'src/app/Services/Independent/other.service'
import {UserService} from 'src/app/Services/Independent/user.service'
import {ReloadService} from 'src/app/Services/reload.service'

@Component({
    selector: 'app-others',
    templateUrl: './others.component.html',
    styleUrls: ['./others.component.scss'],
})
export class OthersComponent implements OnInit {
    constructor(
        private service: OthersService,
        private component: ReloadService,
        private user: UserService,
    ) {
        this.subscriptions.add(
            this.component.shouldReload().subscribe(() => {
                this.ngOnInit()
            }),
        )
    }

    subscriptions = new Subscription()

    isUser = !this.user.isAdmin()

    others: any = []

    files = []

    ngOnInit(): void {
        this.getOthers()
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    getOthers() {
        this.service.index().subscribe((others: any) => {
            this.others = others
        })
    }

    setFiles(files: []) {
        this.files = files
    }

    removeFile(id: number) {
        Fire(
            'Remove this file?',
            'Are you sure you want to permanently remove this file? This file and all of its content will be removed.',
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
