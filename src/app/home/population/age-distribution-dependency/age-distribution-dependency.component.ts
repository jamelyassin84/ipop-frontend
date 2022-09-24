import {Component, OnInit, Input} from '@angular/core'

@Component({
    selector: 'age-distribution-dependency',
    templateUrl: './age-distribution-dependency.component.html',
    styleUrls: ['./age-distribution-dependency.component.scss'],
})
export class AgeDistributionDependencyComponent implements OnInit {
    constructor() {}

    @Input()
    ageDistributionAndAgeDependencyRatio?: any

    @Input()
    innerWidth?: number

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
