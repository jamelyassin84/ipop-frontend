import {HttpClient} from '@angular/common/http'
import {HostListener} from '@angular/core'
import {Component, OnInit, ViewChild} from '@angular/core'
import {Subscription} from 'rxjs'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'
import {NavService} from 'src/app/components/nav/nav.service'
import {Deleted, Fire, pop} from 'src/app/modules/extras/Alert'
import {BaseService} from 'src/app/Services/base.service'
import {AgeDistributionAndAgeDependecyRatioService} from 'src/app/Services/home/population/age-distribution-and-age-dependecy-ratio.service'
import {TopPopulatedService} from 'src/app/Services/home/population/top-populated.service'
import {UserService} from 'src/app/Services/Independent/user.service'
import {ReloadService} from 'src/app/Services/reload.service'
import {PopulationPyramidComponent} from './population-pyramid/population-pyramid.component'

@Component({
    selector: 'app-population',
    templateUrl: './population.component.html',
    styleUrls: ['./population.component.scss'],
    animations: [...dbwAnimations],
})
export class PopulationComponent implements OnInit {
    constructor(
        private _http: HttpClient,
        private user: UserService,
        private _navService: NavService,
        private component: ReloadService,
        private topPopulatedService: TopPopulatedService,
        private adaadr: AgeDistributionAndAgeDependecyRatioService,
    ) {
        this.subscriptions.add(
            this.component.shouldReload().subscribe(() => {
                this.ngOnInit()
            }),
        )
    }

    @ViewChild(PopulationPyramidComponent)
    pyramid: any

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.innerWidth = window.innerWidth
    }

    readonly isUser = !this.user.isAdmin()

    headerNotShown$ = this._navService.hide$

    innerWidth: number = 0

    subscriptions = new Subscription()

    topPopulated: any[] = []

    location: LocationFIlter = {
        barangay: null,
        municipality: null,
        year: null,
    }

    populationProfile: any = {}
    populationByMunicipality: any[] = []
    ageDistributionAndAgeDependencyRatio: any = []
    ageDistributionAndAgeDependencyRatioByMunicipality: any = []

    ngOnInit(): void {
        this.innerWidth = window.innerWidth
        this.getTopPopulated()
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    getTopPopulated() {
        this.topPopulatedService.index().subscribe((data: any[]) => {
            this.topPopulated = data
            pop()
        })
    }

    deleteTopPopulated(id: number) {
        Fire(
            'Remove Municipality?',
            'Are you sure you want to remove this data?',
            'info',
            () => {
                this.topPopulatedService.destroy(id).subscribe()
            },
        )
    }

    fetch(event: any) {
        this.location = event
        this.getPopulationData()
        this.getPopulationByMunicipality()
        this.getAgeDistributionAndAgeDependencyRatio()
        this.getAgeDistributionAndAgeDependencyRatioByMunicipality()
    }

    getPopulationData() {
        const service = new BaseService(
            this._http,
            'statistic-profiles',
            `municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}`,
        )
        service.index().subscribe((populationProfile: any) => {
            this.populationProfile = {}
            this.pyramid.fetch()
            if (populationProfile.length !== 0) {
                this.populationProfile = populationProfile[0]
            }
        })
    }

    getPopulationByMunicipality() {
        new BaseService(
            this.topPopulatedService.http,
            'statistic-profiles/by-municipality',
            `year=${this.location['year']}`,
        )
            .index()
            .subscribe((data: any) => {
                this.populationByMunicipality = data
            })
    }

    getAgeDistributionAndAgeDependencyRatio() {
        this.adaadr.index(`year=${this.location['year']}`).subscribe((data) => {
            this.ageDistributionAndAgeDependencyRatio = data
        })
    }

    getAgeDistributionAndAgeDependencyRatioByMunicipality() {
        new BaseService(
            this.adaadr.http,
            `${this.adaadr.url}/by-municipality`,
            `year=${this.location['year']}`,
        )
            .index()
            .subscribe((data) => {
                this.ageDistributionAndAgeDependencyRatioByMunicipality = data
            })
    }

    removeDependency(id: number) {
        Fire(
            'Remove Data?',
            'Are you sure you want to permanently remove this data?',
            'info',
            () => {
                this.adaadr.destroy(id).subscribe(() => {
                    Deleted()
                })
            },
        )
    }

    total(x: string | any, y: string | any) {
        return parseFloat(x) + parseFloat(y)
    }

    getPercentage(value: number, basis: number) {
        return (value * 100) / basis
    }
}
