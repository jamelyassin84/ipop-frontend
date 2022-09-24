import {Component, Input, OnInit} from '@angular/core'
import {ProgramAreasService} from 'src/app/Services/home/program-areas/program-areas.service'

@Component({
    selector: 'ProgramAreas',
    templateUrl: './approval-activity.component.html',
    styleUrls: ['./approval-activity.component.scss'],
})
export class ApprovalActivityComponent implements OnInit {
    constructor(private service: ProgramAreasService) {}

    @Input()
    data: any = ''

    programArea: any | any = {}
    currentImages: any[] = []

    ngOnInit(): void {
        this.getProgramArea()
    }

    getProgramArea() {
        this.service
            .show(this.data['program_area_id'])
            .subscribe((programArea: any) => {
                this.programArea = programArea
            })
    }

    transformImages(photos: any) {
        this.currentImages = []
        photos.forEach((photo: any) => {
            this.currentImages.push(photo.file.uri)
        })
    }

    toArray(text: string) {
        return text.split(', ')
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
