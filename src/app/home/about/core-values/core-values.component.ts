import {Component, OnInit} from '@angular/core'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'app-core-values',
    templateUrl: './core-values.component.html',
    styleUrls: ['./core-values.component.scss'],
    animations: [...dbwAnimations],
})
export class CoreValuesComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
