import { Component, OnInit } from '@angular/core'
import { CPDBType } from 'src/app/Types/forms/CPDB.types'
import { BarangayType } from 'src/app/Types/locations/Barangay.types'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'
import { ageBrackets, sexs } from '../birth-form/BirthData'
import {
	CivilStatuses,
	FPCurrentlyUseds,
	GradeYearLevelofSchoolAttendances,
	HHUsualSourceofWaterforDrinkings,
	HighestEducationalAttainments,
	HouseConstructionMaterials,
	HouseholdIncomeBrackets,
	HouseholdLocation,
	HouseholdsGarbageDisposals,
	houseHoldSizeBrackets,
	PhilHealthMemberships,
	PlaceofWorkorEmploymentoftheEarningHHMembers,
	ReasonforNotAttendingSchools,
	RelationshiptoHouseholdHeads,
	ReligiousAffiliations,
	TypeofDisabilities,
	TypeofFuelUseforLighting,
	TypeofSpecialSkills,
	TypeofToilettheHouseholdwns,
	UsualOccupationofWorkingHHMembers,
	WaterLevelinfloodpronearea,
} from './CPDBData'

@Component({
	selector: 'app-cpdb-form',
	templateUrl: './cpdb-form.component.html',
	styleUrls: ['./cpdb-form.component.scss'],
})
export class CpdbFormComponent implements OnInit {
	municipalities: MunicipalityType[] = []
	barangays: BarangayType[] = []
	field: CPDBType | any = {}
	barangayIsLoading: Boolean = false
	isLoading: Boolean = false

	constructor() {}

	ngOnInit(): void {}

	select = {
		houseHoldSizeBrackets: houseHoldSizeBrackets,
		RelationshiptoHouseholdHeads: RelationshiptoHouseholdHeads,
		Sexes: sexs,
		AgeBrackets: ageBrackets,
		CivilStatuses: CivilStatuses,
		HighestEducationalAttainments: HighestEducationalAttainments,
		SchoolAttendances: ['No', 'Yes'],
		GradeYearLevelofSchoolAttendances: GradeYearLevelofSchoolAttendances,
		ReasonforNotAttendingSchools: ReasonforNotAttendingSchools,
		ReligiousAffiliations: ReligiousAffiliations,
		TypeofSpecialSkills: TypeofSpecialSkills,
		TypeofDisabilities: TypeofDisabilities,
		NameofIndigenousorTribes: ['Sulodnon', 'Ati', 'Panayanon', 'Bukidnon'],
		PhilHealthMemberships: PhilHealthMemberships,
		UsualOccupationofWorkingHHMembers: UsualOccupationofWorkingHHMembers,
		IncomeBrackets: ['5,000 pesos & Below', '5001 - 15,000 pesos', '30,001 - 50,000 pesos', '50,000 pesos & Over'],
		PlaceofWorkorEmploymentoftheEarningHHMembers: PlaceofWorkorEmploymentoftheEarningHHMembers,
		NoofYearsStayBrackets: ['Below 1 Year', '1-2', '3-4', '5 and over'],
		FPCurrentlyUseds: FPCurrentlyUseds,
		HouseholdIncomeBrackets: HouseholdIncomeBrackets,
		HouseOwnerships: ['Owned', 'Pay rent', 'Stay for free'],
		Howmanystories: ['One', 'Two', 'More than two'],
		HouseConstructionMaterials: HouseConstructionMaterials,
		HomelotOwnershipStatuses: ['Owned', 'Rented', "With Owner's Consent", "Without owner's consent"],
		HHUsualSourceofWaterforDrinkings: HHUsualSourceofWaterforDrinkings,
		TypeofToilettheHouseholdwns: TypeofToilettheHouseholdwns,
		HouseholdsGarbageDisposals: HouseholdsGarbageDisposals,
		TypeofFuelUseforLighting: TypeofFuelUseforLighting,
		TypeofuelforCooking: ['Electricity', 'Kerosene (Gas)', 'LPG', 'Wood/charcoal'],
		HouseholdLocation: HouseholdLocation,
		WaterLevelinfloodpronearea: WaterLevelinfloodpronearea,
		AccesstoInformationTechnology: ['Cable Satellite services', 'Internet Services', 'Mobile service providers'],
	}

	specify: any = {}

	changeHandler(chosen_field: any) {
		if (chosen_field.target.value == 'Others, please specify reason') {
			this.specify.reason_for_not_attending_school = true
			this.field.reason_for_not_attending_school = ''
		}
		if (chosen_field.target.value == 'Others (Born Again, Mormon, etc.)') {
			this.specify.religious_affiliation = true
			this.field.religious_affiliation = ''
		}
		if (chosen_field.target.value == 'Others, specify special skill') {
			this.specify.type_of_special_skill = true
			this.field.type_of_special_skill = ''
		}
		if (chosen_field.target.value == 'Others, specify tribe') {
			this.specify.name_of_group_or_tribe = true
			this.field.name_of_group_or_tribe = ''
		}
		if (chosen_field.target.value == 'Others, specify ususal occupation') {
			this.specify.usual_occupation_of_working_household_member = true
			this.field.usual_occupation_of_working_household_member = ''
		}
		if (chosen_field.target.value == 'Others, specify source of water') {
			this.specify.source_of_drinking_water = true
			this.field.source_of_drinking_water = ''
		}
		if (chosen_field.target.value == 'Others, specify fuel use for lighting') {
			this.specify.type_of_lighting_fuel = true
			this.field.type_of_lighting_fuel = ''
		}
		if (chosen_field.target.value == 'Others, specify fuel use for cooking') {
			this.specify.type_of_cooking_fuel = true
			this.field.type_of_cooking_fuel = ''
		}
		if (chosen_field.target.value == 'Others, specify access to information technology') {
			this.specify.access_to_infotech = true
			this.field.access_to_infotech = ''
		}
		if (chosen_field.target.value == 'Others, specify house hold location') {
			this.specify.household_location = true
			this.field.household_location = ''
		}
	}

	requiredFields: any = {}

	submit() {}
}
