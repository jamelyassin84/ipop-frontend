import {Component, OnInit, Input} from '@angular/core'

@Component({
    selector: 'age-distribution',
    templateUrl: './age-distribution.component.html',
    styleUrls: ['./age-distribution.component.scss'],
})
export class AgeDistributionComponent implements OnInit {
    constructor() {}

    @Input()
    ageDistributionAndAgeDependencyRatio?: any

    @Input()
    innerWidth?: number

    ngOnInit(): void {}

    getPercentage(value: number, basis: number) {
        return (value * 100) / basis
    }
}
