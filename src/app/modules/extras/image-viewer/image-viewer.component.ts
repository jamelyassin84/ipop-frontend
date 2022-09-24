import {Component, Input, OnInit} from '@angular/core'

@Component({
    selector: 'ImageViewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
    constructor() {}

    @Input()
    images: any = []

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
