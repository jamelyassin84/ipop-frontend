import {BaseService} from 'src/app/Services/base.service'
import {TeenCenterDataService} from './../../../Services/home/ahyd/teen-center/teen-center-data.service'
import {Component, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {Deleted, Fire} from 'src/app/modules/extras/Alert'
import {ReloadService} from 'src/app/Services/reload.service'
import {UserService} from 'src/app/Services/Independent/user.service'
import {HostListener} from '@angular/core'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {DISTRICT_TABS} from 'src/app/app-core/constants/ahyd/teen-center/district-tabs'

@Component({
    selector: 'app-teen-centers',
    templateUrl: './teen-centers.component.html',
    styleUrls: ['./teen-centers.component.scss'],
    animations: [...dbwAnimations],
})
export class TeenCentersComponent implements OnInit {
    constructor(
        private component: ReloadService,
        private service: TeenCenterDataService,
        private user: UserService,
    ) {
        this.subscriptions.add(
            this.component.shouldReload().subscribe(() => {
                this.setTab(this.district)
            }),
        )
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.innerWidth = window.innerWidth
    }

    readonly isUser = !this.user.isAdmin()
    readonly isSuperAdmin = !this.user.isSuperAdmin()
    readonly districtTabs = DISTRICT_TABS

    subscriptions = new Subscription()
    innerWidth: any
    district = 'district1'
    teenCenters: any = []

    teen_center_id: number = 0
    currenData: any = {}

    currentImages: any = []

    tabs: any = {
        district1: false,
        district2: false,
        district3: false,
        district4: false,
        district5: false,
    }

    ngOnInit(): void {
        this.setTab('district1')
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
        this.innerWidth = window.innerWidth
    }

    setTab(district: string) {
        for (let key in this.tabs) {
            this.tabs[key] = false
        }
        this.district = district
        this.tabs[district] = true
        this.getTeenCenters()
    }

    getTeenCenters() {
        new BaseService(
            this.service.http,
            this.service.url,
            `district=${this.transformDistrict(this.district)}`,
        )
            .index()
            .subscribe((data: any) => {
                this.teenCenters = data
            })
    }

    transformDistrict(district: string) {
        if (district === 'district1') {
            return 'I'
        }
        if (district === 'district2') {
            return 'II'
        }
        if (district === 'district3') {
            return 'III'
        }
        if (district === 'district4') {
            return 'IV'
        }
        return 'V'
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

    transformImages(photos: any) {
        this.currentImages = []
        photos.forEach((photo: any) => {
            this.currentImages.push(photo.file.uri)
        })
    }

    trackByFn(item: any, index: number): any {
        return item.id || index
    }
}
