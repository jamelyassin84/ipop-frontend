import {Component, Input, OnInit} from '@angular/core'

@Component({
    selector: 'SliderImages',
    templateUrl: './approval-slider.component.html',
    styleUrls: ['./approval-slider.component.scss'],
})
export class ApprovalSliderComponent implements OnInit {
    constructor() {}

    @Input()
    data: any = ''

    images: any = []

    ngOnInit(): void {
        setTimeout(() => {
            this.images.push(this.data.photo.uri)
        }, 300)
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
