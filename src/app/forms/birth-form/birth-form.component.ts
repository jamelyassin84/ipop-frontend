import { Component, OnInit } from '@angular/core'
import { BirthType } from 'src/app/Types/forms/Birth.types'
import { BarangayType } from 'src/app/Types/locations/Barangay.types'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'
import {
	ageBrackets,
	birthOrders,
	maritalStatuses,
	months,
	occupations,
	placeofBirths,
	registeredLCRs,
	religions,
	sexs,
} from './BirthData'

@Component({
	selector: 'app-birth-form',
	templateUrl: './birth-form.component.html',
	styleUrls: ['./birth-form.component.scss'],
})
export class BirthFormComponent implements OnInit {
	barangayIsLoading = false
	isLoading = false
	municipalities: MunicipalityType[] = []
	barangays: BarangayType[] = []
	months = months
	sexs = sexs
	ageBrackets = ageBrackets
	registeredLCRs = registeredLCRs
	birthOrders = birthOrders
	placeofBirths = placeofBirths
	occupations = occupations
	religions = religions
	maritalStatuses = maritalStatuses
	fields: BirthType | any = {}
	invalid: any = {}

	constructor() {}

	ngOnInit(): void {}

	save() {
		this.isLoading = true
	}
}
