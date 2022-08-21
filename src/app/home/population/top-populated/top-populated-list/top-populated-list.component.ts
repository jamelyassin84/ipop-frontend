import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Fire} from 'src/app/modules/extras/Alert'
import {TopPopulatedService} from 'src/app/Services/home/population/top-populated.service'
import {TopPopulated} from '../top-populated.component'

@Component({
    selector: 'top-populated-list',
    templateUrl: './top-populated-list.component.html',
    styleUrls: ['./top-populated-list.component.scss'],
})
export class TopPopulatedListComponent implements OnInit {
    constructor(private _topPopulatedService: TopPopulatedService) {}

    @Output() onDelete = new EventEmitter<number>()

    @Input() topPopulated?: TopPopulated[]

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
}
