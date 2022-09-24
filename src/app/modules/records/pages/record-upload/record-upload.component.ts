import {FileUploadService} from '../../../../Services/bulk-records/file-upload.service'
import {Component, OnInit} from '@angular/core'
import {Created, Fire, Alert} from 'src/app/modules/extras/Alert'

@Component({
    selector: 'app-record-upload',
    templateUrl: './record-upload.component.html',
    styleUrls: ['./record-upload.component.scss'],
})
export class RecordUploadComponent implements OnInit {
    constructor(private service: FileUploadService) {}

    readonly types = [
        'CPDB',
        'Birth',
        'Death',
        'InMigration',
        'OutMigration',
        'Marriage',
    ]

    file: any = {}
    type = ''
    isLoading = false

    ngOnInit(): void {}

    onSelect(event: any) {
        this.file = event.addedFiles[0]
    }

    remove() {
        this.file = {}
    }

    setType(event: any) {
        this.type = event.target.value
    }

    save() {
        if (this.type === '') {
            return Alert('Error!', 'Target Path should not be null', 'error')
        }
        if (this.file.name === undefined) {
            return Alert('Error!', 'No FIle Selected', 'error')
        }
        let formData = new FormData()
        formData.append('file', this.file)
        formData.append('type', this.type)
        Fire(
            'Upload File(s)?',
            `Are you sure you want to upload a ${this.type} Record`,
            'info',
            () => {
                this.isLoading = true
                this.service.create(formData).subscribe(() => {
                    Created()
                    this.isLoading = false
                })
            },
        )
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
