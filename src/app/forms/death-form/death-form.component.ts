import { DeathType } from './../../Types/forms/Death.types'
import { Component, OnInit } from '@angular/core'
import { ageBrackets, months, registeredLCRs, sexs } from '../birth-form/BirthData'
import { placeOfDeaths } from './DeathData'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'
import { BarangayType } from 'src/app/Types/locations/Barangay.types'

@Component({
	selector: 'app-death-form',
	templateUrl: './death-form.component.html',
	styleUrls: ['./death-form.component.scss'],
})
export class DeathFormComponent implements OnInit {
	municipalities: MunicipalityType[] = []
	barangays: BarangayType[] = []
	fields: DeathType | any = {}
	barangayIsLoading: Boolean = false
	isLoading: Boolean = false
	months = months
	sexs = sexs
	ageBrackets = ageBrackets
	placeOfDeaths = placeOfDeaths
	registeredLCRs = registeredLCRs
	invalid: any = {}

	constructor() {}

	ngOnInit(): void {}

	save() {}
}
