import {Component, OnInit} from '@angular/core'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'app-mandate',
    templateUrl: './mandate.component.html',
    styleUrls: ['./mandate.component.scss'],
    animations: [...dbwAnimations],
})
export class MandateComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
