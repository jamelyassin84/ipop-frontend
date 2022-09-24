import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {Fire} from 'src/app/modules/extras/Alert'
import {TopPopulatedService} from 'src/app/Services/home/population/top-populated.service'
import {TopPopulated} from '../top-populated.component'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'

@Component({
    selector: 'top-populated-list',
    templateUrl: './top-populated-list.component.html',
    styleUrls: ['./top-populated-list.component.scss'],
    animations: [...dbwAnimations],
})
export class TopPopulatedListComponent implements OnInit {
    constructor(private _topPopulatedService: TopPopulatedService) {}

    @Output()
    onDelete = new EventEmitter<number>()

    @Input()
    topPopulated?: any[]

    @Input()
    location?: LocationFIlter

    ngOnInit(): void {}

    deleteTopPopulated(id: number) {
        Fire(
            'Remove Municipality?',
            'Are you sure you want to remove this data?',
            'info',
            () => {
                this._topPopulatedService.destroy(id).subscribe()
            },
        )
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
