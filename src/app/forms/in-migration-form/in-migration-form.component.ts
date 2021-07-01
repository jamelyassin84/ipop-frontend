import { Component, OnInit } from '@angular/core'
import { InMigrationType } from 'src/app/Types/forms/InMigration.types'
import { BarangayType } from 'src/app/Types/locations/Barangay.types'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'
import { ageBrackets, months, sexs } from '../birth-form/BirthData'
import {
	educationalAttainments,
	monthlyIncomes,
	occupations,
	placeOfOrigins,
	reasonForInMagratings,
	specificReasons,
} from './InMigrationData'

@Component({
	selector: 'app-in-migration-form',
	templateUrl: './in-migration-form.component.html',
	styleUrls: ['./in-migration-form.component.scss'],
})
export class InMigrationFormComponent implements OnInit {
	municipalities: MunicipalityType[] = []
	barangays: BarangayType[] = []
	fields: InMigrationType | any = {}
	barangayIsLoading: Boolean = false
	isLoading: Boolean = false
	monthOfMigrations = months
	sexs = sexs
	ageBrackets = ageBrackets
	educationalAttainments = educationalAttainments
	occupations = occupations
	monthlyIncomes = monthlyIncomes
	placeOfOrigins = placeOfOrigins
	reasonForInMagratings = reasonForInMagratings
	specificReasons = specificReasons
	invalid: any = {}

	constructor() {}

	ngOnInit(): void {}

	save() {}
}
