import {Component, OnInit} from '@angular/core'
import {Alert} from 'src/app/modules/extras/Alert'
import {BaseService} from 'src/app/Services/base.service'
import {FileUploadsService} from 'src/app/Services/home/others/file-uploads.service'
import {recordNavs} from '../../RecordNav'

@Component({
    selector: 'app-uploaded-records',
    templateUrl: './uploaded-records.component.html',
    styleUrls: ['./uploaded-records.component.scss'],
})
export class UploadedRecordsComponent implements OnInit {
    constructor(private service: FileUploadsService) {}

    readonly navs = recordNavs

    type = 'CPDB'

    files: any = []

    ngOnInit(): void {
        this.setType('CPDB')
    }

    setType(type: string) {
        this.type = type
        this.index()
    }

    index() {
        new BaseService(
            this.service.http,
            this.service.url,
            `type=${this.type}`,
        )
            .index()
            .subscribe((data) => {
                this.files = data
            })
    }

    approve(id: number) {
        this.service.update(id, {approved: true}).subscribe(() => {
            Alert('File successfully Approved', '', 'success')
            this.ngOnInit()
        })
    }

    reject(id: number) {
        this.service.destroy(id).subscribe(() => {
            Alert(
                'File Rejected',
                'This file has been permanently removed.',
                'error',
            )
            this.ngOnInit()
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
