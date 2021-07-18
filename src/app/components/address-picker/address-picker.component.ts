import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { LocationService } from 'src/app/Services/locations/province.service'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'
import { BarangayOfficialType } from 'src/app/Types/officials/BarangayOfficials.types'

@Component({
	selector: 'AddressPicker',
	templateUrl: './address-picker.component.html',
	styleUrls: ['./address-picker.component.scss'],
})
export class AddressPickerComponent implements OnInit {
	constructor(private location: LocationService) {}

	municipalities: MunicipalityType[] = []
	barangays: BarangayOfficialType[] = []

	@Output() onEmit = new EventEmitter()

	ngOnInit(): void {
		this.getMuncipalities()
		this.currentData = { municipality: null, barangay: null }
		this.onEmit.emit(this.currentData)
	}

	getMuncipalities() {
		this.location.municipalities().subscribe((municipalities: MunicipalityType[]) => {
			this.municipalities = municipalities
		})
	}

	getBarangays(event: any) {
		this.currentData.municipality = event.target.options[event.target.options.selectedIndex].text
		this.onEmit.emit(this.currentData)
		this.location.barangays(event.target.value).subscribe((barangays: BarangayOfficialType[]) => {
			this.barangays = barangays
		})
	}

	setBarangay(event: any) {
		this.currentData.barangay = event.target.value
		this.onEmit.emit(this.currentData)
	}

	tabs: any = {
		province: true,
		municipality: false,
		barangay: false,
	}

	currentData: any
	changeTab(tab: string) {
		this.currentData = { municipality: null, barangay: null }
		for (let key in this.tabs) {
			this.tabs[key] = false
		}
		this.ngOnInit()
		this.tabs[tab] = true
		if (tab === 'province') {
			this.onEmit.emit(this.currentData)
		}
	}
}
