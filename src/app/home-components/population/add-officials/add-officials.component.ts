import {MunicipalService} from './../../../Services/home/officials/municipal.service'
import {ProvincialService} from './../../../Services/home/officials/provincial.service'
import {Component, OnInit} from '@angular/core'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {SpMemberService} from 'src/app/Services/home/officials/sp-member.service'
import {BarangayService} from 'src/app/Services/home/officials/barangay.service'
import {LocationService} from 'src/app/Services/locations/province.service'
import {BarangayOfficialType} from 'src/app/Types/officials/BarangayOfficials.types'
import {MunicipalityType} from 'src/app/Types/locations/Municipality.types'

@Component({
    selector: 'AddOfficials',
    templateUrl: './add-officials.component.html',
    styleUrls: ['./add-officials.component.scss'],
})
export class AddOfficialsComponent implements OnInit {
    constructor(
        private provincialOfficial: ProvincialService,
        private SPMember: SpMemberService,
        private municipalOfficial: MunicipalService,
        private barangayOfficial: BarangayService,
        private location: LocationService,
    ) {}

    types = [
        'Provincial Official',
        'Sanguniang Panlalawigan Member',
        'Municipal Official',
        'Barangay Official',
    ]
    type: string = 'Provincial Official'

    isLoading: boolean = false

    data: any = {}
    municipalities: MunicipalityType[] = []
    barangays: BarangayOfficialType[] = []

    ngOnInit(): void {
        this.getMuncipalities()
    }

    save() {
        Fire(
            'Save Changes?',
            'Are you sure you want to add this data?',
            'info',
            () => {
                this.isLoading = true
                if (this.type === 'Provincial Official') {
                    this.addProvincialOfficial()
                }
                if (this.type === 'Sanguniang Panlalawigan Member') {
                    this.addSPMember()
                }
                if (this.type === 'Municipal Official') {
                    this.addMunicipalOfficial()
                }
                if (this.type === 'Barangay Official') {
                    this.addBarangayOfficial()
                }
            },
        )
    }

    reset() {
        this.data = {
            municipality: null,
            barangay: null,
        }
    }

    addProvincialOfficial() {
        this.provincialOfficial.create(this.data).subscribe(() => {
            HasApprovals('Created')
            this.isLoading = false
        })
    }

    addSPMember() {
        this.SPMember.create(this.data).subscribe(() => {
            HasApprovals('Created')
            this.isLoading = false
        })
    }

    addMunicipalOfficial() {
        this.municipalOfficial.create(this.data).subscribe(() => {
            HasApprovals('Created')
            this.isLoading = false
        })
    }

    addBarangayOfficial() {
        this.barangayOfficial.create(this.data).subscribe(() => {
            HasApprovals('Created')
            this.isLoading = false
        })
    }

    getMuncipalities() {
        this.location.municipalities().subscribe((data: any) => {
            this.municipalities = data
        })
    }

    getBarangays(event: any) {
        this.data.municipality =
            event.target.options[event.target.options.selectedIndex].text
        this.location.barangays(event.target.value).subscribe((data: any) => {
            this.barangays = data
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
