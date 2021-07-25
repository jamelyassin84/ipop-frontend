import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { years } from 'src/app/constants/AppConstants'
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
	@Input() showBarangay = true
	@Output() onEmit = new EventEmitter()

	years: number[] = years()
	setYear(event: any) {
		this.currentData.year = event.target.value
	}

	ngOnInit(): void {
		this.getMuncipalities()
		this.currentData = {
			municipality: null,
			barangay: null,
			year: new Date().getFullYear(),
		}
		this.onEmit.emit(this.currentData)
	}

	municipalities: MunicipalityType[] = []
	getMuncipalities() {
		this.location
			.municipalities()
			.subscribe((municipalities: MunicipalityType[]) => {
				this.municipalities = municipalities
			})
	}

	barangays: BarangayOfficialType[] = []
	getBarangays(event: any) {
		this.currentData.municipality =
			event.target.options[event.target.options.selectedIndex].text
		this.location
			.barangays(event.target.value)
			.subscribe((barangays: BarangayOfficialType[]) => {
				this.barangays = barangays
			})
	}

	emit() {
		this.onEmit.emit(this.currentData)
	}

	setBarangay(event: any) {
		this.currentData.barangay = event.target.value
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
	}
}
