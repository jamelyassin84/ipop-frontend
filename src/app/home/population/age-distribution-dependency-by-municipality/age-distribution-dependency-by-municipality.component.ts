import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'
import {UserService} from 'src/app/Services/Independent/user.service'

@Component({
    selector: 'age-distribution-dependency-by-municipality',
    templateUrl: './age-distribution-dependency-by-municipality.component.html',
    styleUrls: ['./age-distribution-dependency-by-municipality.component.scss'],
})
export class AgeDistributionDependencyByMunicipalityComponent
    implements OnInit
{
    constructor(private user: UserService) {}

    readonly isUser = !this.user.isAdmin()

    @Output()
    onRemove = new EventEmitter<string>()

    @Input()
    ageDistributionAndAgeDependencyRatio?: any

    @Input()
    innerWidth?: number

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
