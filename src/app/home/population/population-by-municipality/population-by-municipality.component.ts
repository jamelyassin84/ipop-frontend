import {Component, OnInit, Input} from '@angular/core'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'population-by-municipality',
    templateUrl: './population-by-municipality.component.html',
    styleUrls: ['./population-by-municipality.component.scss'],
    animations: [...dbwAnimations],
})
export class PopulationByMunicipalityComponent implements OnInit {
    constructor() {}

    @Input()
    populationByMunicipality: any

    @Input()
    innerWidth?: number

    ngOnInit(): void {}

    total(x: string | any, y: string | any) {
        return parseFloat(x) + parseFloat(y)
    }
}
