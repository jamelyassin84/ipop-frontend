import { Component, OnInit } from '@angular/core'
import { MarriagesType } from 'src/app/Types/forms/Marriages.types'
import { BarangayType } from 'src/app/Types/locations/Barangay.types'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'
import { ageBrackets, months, sexs } from '../birth-form/BirthData'

@Component({
	selector: 'app-marriages-form',
	templateUrl: './marriages-form.component.html',
	styleUrls: ['./marriages-form.component.scss'],
})
export class MarriagesFormComponent implements OnInit {
	municipalities: MunicipalityType[] = []
	barangays: BarangayType[] = []
	fields: MarriagesType | any = {}
	barangayIsLoading: Boolean = false
	isLoading: Boolean = false
	months = months
	sexs = sexs
	ageBrackets = ageBrackets
	typeOfWeddingCeremonies = ['Church', 'Civil', 'Tribal Rites']
	solemnizingOfficers = ['Judge', 'Mayor', 'Priest/Pastor/Imam']
	registeredLCRs = ['Yes', 'No']

	constructor() {}

	ngOnInit(): void {}

	invalid: any = {}

	save() {}
}
