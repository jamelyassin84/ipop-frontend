import { MpcFdcDataService } from './../../../../Services/home/rpfp/mpc-fdc/mpc-fdc-data.service'
import { Component, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'
import { LocationService } from 'src/app/Services/locations/province.service'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'

@Component({
	selector: 'AddMPCFDCData',
	templateUrl: './add-mpc-fdc-data.component.html',
	styleUrls: ['./add-mpc-fdc-data.component.scss'],
})
export class AddMpcFdcDataComponent implements OnInit {
	constructor(private location: LocationService, private service: MpcFdcDataService) {}

	districts = ['I', 'II', 'III', 'IV', 'V']

	ngOnInit(): void {
		this.getMuncipalities()
	}

	municipalities: MunicipalityType[] = []
	getMuncipalities() {
		this.location.municipalities().subscribe((municipalities: MunicipalityType[]) => {
			this.municipalities = municipalities
		})
	}

	data: any = {}
	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.service.create(this.data).subscribe(() => {
				Created()
			})
		})
	}
}
