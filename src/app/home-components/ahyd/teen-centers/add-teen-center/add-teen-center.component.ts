import {TeenCenterDataService} from './../../../../Services/home/ahyd/teen-center/teen-center-data.service'
import {Component, OnInit} from '@angular/core'
import {Created, Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {LocationService} from 'src/app/Services/locations/province.service'
import {MunicipalityType} from 'src/app/Types/locations/Municipality.types'

@Component({
    selector: 'AddTeenCenter',
    templateUrl: './add-teen-center.component.html',
    styleUrls: ['./add-teen-center.component.scss'],
})
export class AddTeenCenterComponent implements OnInit {
    constructor(
        private location: LocationService,
        private service: TeenCenterDataService,
    ) {}

    districts = ['I', 'II', 'III', 'IV', 'V']
    municipalities: MunicipalityType[] = []
    isLoading: boolean = false
    data: any = {}

    ngOnInit(): void {
        this.getMuncipalities()
    }

    getMuncipalities() {
        this.location
            .municipalities()
            .subscribe((municipalities: MunicipalityType[]) => {
                this.municipalities = municipalities
            })
    }

    save() {
        Fire(
            'Save Changes?',
            'Are you sure you want to add this data?',
            'info',
            () => {
                this.isLoading = true
                this.service.create(this.data).subscribe(() => {
                    HasApprovals('Created')
                    this.isLoading = false
                })
            },
        )
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
