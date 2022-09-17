import {Component, OnInit, Input} from '@angular/core'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'

@Component({
    selector: 'population-profile',
    templateUrl: './population-profile.component.html',
    styleUrls: ['./population-profile.component.scss'],
    animations: [...dbwAnimations],
})
export class PopulationProfileComponent implements OnInit {
    constructor() {}

    @Input()
    populationProfile: any

    @Input()
    location?: LocationFIlter

    ngOnInit(): void {}
}
