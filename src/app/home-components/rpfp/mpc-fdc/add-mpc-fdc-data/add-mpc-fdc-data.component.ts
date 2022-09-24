import {MpcFdcDataService} from './../../../../Services/home/rpfp/mpc-fdc/mpc-fdc-data.service'
import {Component, OnInit} from '@angular/core'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {LocationService} from 'src/app/Services/locations/province.service'
import {MunicipalityType} from 'src/app/Types/locations/Municipality.types'

@Component({
    selector: 'AddMPCFDCData',
    templateUrl: './add-mpc-fdc-data.component.html',
    styleUrls: ['./add-mpc-fdc-data.component.scss'],
})
export class AddMpcFdcDataComponent implements OnInit {
    constructor(
        private location: LocationService,
        private service: MpcFdcDataService,
    ) {}

    districts = ['I', 'II', 'III', 'IV', 'V']

    municipalities: MunicipalityType[] = []
    data: any = {}
    isLoading: boolean = false

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
