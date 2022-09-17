import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'

@Component({
    selector: 'age-distribution-dependency-by-municipality',
    templateUrl: './age-distribution-dependency-by-municipality.component.html',
    styleUrls: ['./age-distribution-dependency-by-municipality.component.scss'],
})
export class AgeDistributionDependencyByMunicipalityComponent
    implements OnInit
{
    constructor() {}

    @Output()
    onRemove = new EventEmitter<string>()

    @Input()
    ageDistributionAndAgeDependencyRatio?: any

    @Input()
    innerWidth?: number

    ngOnInit(): void {}
}
