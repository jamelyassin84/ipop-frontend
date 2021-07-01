import { Component, OnInit } from '@angular/core'
import { OutMigrationType } from 'src/app/Types/forms/OutMigration.types'
import { BarangayType } from 'src/app/Types/locations/Barangay.types'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'
import { ageBrackets, months, occupations, sexs } from '../birth-form/BirthData'
import {
	educationalAttainments,
	monthlyIncomes,
	placeOfOrigins,
	specificReasons,
} from '../in-migration-form/InMigrationData'

@Component({
	selector: 'app-out-migration-form',
	templateUrl: './out-migration-form.component.html',
	styleUrls: ['./out-migration-form.component.scss'],
})
export class OutMigrationFormComponent implements OnInit {
	municipalities: MunicipalityType[] = []
	barangays: BarangayType[] = []
	fields: OutMigrationType | any = {}
	barangayIsLoading: Boolean = false
	isLoading: Boolean = false
	monthOfMigrations = months
	sexs = sexs
	ageBrackets = ageBrackets
	educationalAttainment = educationalAttainments
	occupations = occupations
	monthlyIncome = monthlyIncomes
	reasonForInMagrating = specificReasons
	invalid: any = {}
	placeOfOrigin = placeOfOrigins

	constructor() {}

	ngOnInit(): void {}

	save() {}
}
