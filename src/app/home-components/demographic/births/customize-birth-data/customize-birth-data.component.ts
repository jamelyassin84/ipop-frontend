import {LocalBirthDataService} from './../../../../Services/home/demographic/births/local-birth-data.service'
import {Component, Input, OnInit} from '@angular/core'
import {Fire, HasApprovals, Updated} from 'src/app/modules/extras/Alert'

@Component({
    selector: 'CustomizeBirthData',
    templateUrl: './customize-birth-data.component.html',
    styleUrls: ['./customize-birth-data.component.scss'],
})
export class CustomizeBirthDataComponent implements OnInit {
    constructor(private service: LocalBirthDataService) {}

    @Input()
    data: any = {}

    isLoading: boolean = false

    ngOnInit(): void {}

    save() {
        const data = {...this.data}

        for (let key in data) {
            data[key] = data[key].toString()
        }

        Fire(
            'Save Changes?',
            'Are you sure you want to add this data?',
            'info',
            () => {
                this.isLoading = true

                this.service.update(data.id, data).subscribe(() => {
                    HasApprovals('Updated')
                    this.isLoading = false
                })
            },
        )
    }
}
