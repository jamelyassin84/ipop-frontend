import {Component, OnInit} from '@angular/core'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'app-vmg',
    templateUrl: './vmg.component.html',
    styleUrls: ['./vmg.component.scss'],
    animations: [...dbwAnimations],
})
export class VmgComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
