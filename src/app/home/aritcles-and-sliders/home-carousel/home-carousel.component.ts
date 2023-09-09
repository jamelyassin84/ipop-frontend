import {Component, OnInit, Input} from '@angular/core'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'home-carousel',
    templateUrl: './home-carousel.component.html',
    animations: [...dbwAnimations],
})
export class HomeCarouselComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    @Input()
    image?: string

    loaded: boolean = false
}
