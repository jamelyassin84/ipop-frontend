import { PmocDataService } from './../../../Services/home/rpfp/pmoc/pmoc-data.service'
import { PMOCType } from './../../../Types/rpfp/pmoc/PMOC.types'
import { AverageMonthlyIncomeType } from './../../../Types/charts/pmoc/AverageMonthlyIncome.types'
import { EmployemntStatusType } from './../../../Types/charts/pmoc/EmployemntStatus.types'
import { ByCivilStatusType } from './../../../Types/charts/pmoc/ByCivilStatus.types'
import { KnowledgeOnFpService } from './../../../Services/home/rpfp/pmoc/knowledge-on-fp.service'
import { AverageMonthlyIncomeService } from './../../../Services/home/rpfp/pmoc/average-monthly-income.service'
import { KnowledgeOnFPType } from './../../../Types/charts/pmoc/KnowledgeOnFP.types'
import { CivilStatusService } from './../../../Services/home/rpfp/pmoc/civil-status.service'
import { NumberOfCouplesService } from './../../../Services/home/rpfp/pmoc/number-of-couples.service'
import { Component, OnInit } from '@angular/core'
import { ByAgeGroupConfig } from './ByAgeGroup'
import { ByCIvilStatusConfig } from './ByCIvilStatus'
import { ByEmploymentStatusConfig } from './ByEmploymentStatus'
import { ByKnowledgeOnFPConfig } from './ByKnowledgeOnFP'
import { byMonthlyIncomeConfig } from './byMonthlyIncome'
import { PMOCMonthChartConfig } from './PMOCMonthChart'
import { AgeGroupService } from 'src/app/Services/home/rpfp/pmoc/age-group.service'
import { EmploymentStatusService } from 'src/app/Services/home/rpfp/pmoc/employment-status.service'
import { BaseService } from 'src/app/Services/base.service'
import { NumberOfCouplesFPType } from 'src/app/Types/charts/pmoc/NumberOfCouples.types'
import { AgeGroupType } from 'src/app/Types/charts/pmoc/AgeGroup.types'

@Component({
	selector: 'app-pmoc',
	templateUrl: './pmoc.component.html',
	styleUrls: ['./pmoc.component.scss'],
})
export class PmocComponent implements OnInit {
	constructor(
		private service: PmocDataService,
		private numberOfCouplesChartService: NumberOfCouplesService,
		private ByAgeGroupService: AgeGroupService,
		private ByCIvilStatusService: CivilStatusService,
		private ByEmploymentStatusService: EmploymentStatusService,
		private ByKnowledgeOnFPService: KnowledgeOnFpService,
		private byMonthlyIncomeService: AverageMonthlyIncomeService
	) {}

	location: any = {
		municipality: null,
		year: null,
	}

	fetch(event: any) {
		this.location.municipality = event.municipality
		this.location.year = event.year
		this.getLocalData()
		this.getNumberOfCouplesChart()
		this.getByAgeGroup()
		this.getByCIvilStatus()
		this.getByEmploymentStatus()
		this.getByKnowledgeOnFP()
		this.getbyMonthlyIncome()
	}

	localData: PMOCType | any = {}
	getLocalData() {
		for (let key in this.localData) {
			this.localData[key] = 0
		}
		const service = new BaseService(this.service.http, this.service.url, `municipality=${this.location['municipality']}&year=${this.location['year']}`)
		service.index().subscribe((pmc: any) => {
			this.localData = pmc.data[0]
		})
	}

	getNumberOfCouplesChart() {
		const service = new BaseService(this.numberOfCouplesChartService.http, this.numberOfCouplesChartService.url, `municipality=${this.location['municipality']}&year=${this.location['year']}&type=PMOC`)
		service.index().subscribe((data: NumberOfCouplesFPType) => {
			// console.log('NumberOfCouplesFPType', data)
		})
	}

	getByAgeGroup() {
		const service = new BaseService(this.ByAgeGroupService.http, this.ByAgeGroupService.url, `municipality=${this.location['municipality']}&year=${this.location['year']}`)
		service.index().subscribe((data: AgeGroupType[] | any) => {
			if (data.length === 0) {
				return
			}
			data = data[0]
			this.ByAgeGroup.datasets[0].data = [
				parseInt(data['15_to_19_female']),
				parseInt(data['20_to_24_female']),
				parseInt(data['25_to_29_female']),
				parseInt(data['30_to_34_female']),
				parseInt(data['35_to_39_female']),
				parseInt(data['40_to_44_female']),
				parseInt(data['45_and_above_female']),
			]
			this.ByAgeGroup.datasets[1].data = [parseInt(data['15_to_19_male']), parseInt(data['20_to_24_male']), parseInt(data['25_to_29_male']), parseInt(data['30_to_34_male']), parseInt(data['35_to_39_male']), parseInt(data['40_to_44_male']), parseInt(data['45_and_above_male'])]
			this.ByAgeGroup.datasets[2].data = [
				parseInt(data['15_to_19_female']) + parseInt(data['15_to_19_male']),
				parseInt(data['20_to_24_female']) + parseInt(data['20_to_24_male']),
				parseInt(data['25_to_29_female']) + parseInt(data['25_to_29_male']),
				parseInt(data['30_to_34_female']) + parseInt(data['30_to_34_male']),
				parseInt(data['35_to_39_female']) + parseInt(data['35_to_39_male']),
				parseInt(data['40_to_44_female']) + parseInt(data['40_to_44_male']),
				parseInt(data['45_and_above_female']) + parseInt(data['45_and_above_male']),
			]
		})
	}

	getByCIvilStatus() {
		const service = new BaseService(this.ByCIvilStatusService.http, this.ByCIvilStatusService.url, `municipality=${this.location['municipality']}&year=${this.location['year']}`)
		service.index().subscribe((data: ByCivilStatusType[] | any) => {
			if (data.length === 0) {
				return
			}
			data = data[0]
			this.ByCIvilStatus.datasets[0].data = [parseInt(data.single_female), parseInt(data.live_in_female), parseInt(data.widow_female), parseInt(data['separated_female'])]
			this.ByCIvilStatus.datasets[1].data = [parseInt(data.single_male), parseInt(data.live_in_male), parseInt(data.widow_male), parseInt(data['separated_male'])]
			this.ByCIvilStatus.datasets[2].data = [
				(parseInt(data.single_male) + parseInt(data.single_female)) / 2,
				(parseInt(data.live_in_female) + parseInt(data.live_in_female)) / 2,
				(parseInt(data.widow_male) + parseInt(data.widow_female)) / 2,

				(parseInt(data.separated_male) + parseInt(data.separated_female)) / 2,
			]
		})
	}

	getByEmploymentStatus() {
		const service = new BaseService(this.ByEmploymentStatusService.http, this.ByEmploymentStatusService.url, `municipality=${this.location['municipality']}&year=${this.location['year']}`)
		service.index().subscribe((data: EmployemntStatusType[] | any) => {
			if (data.length === 0) {
				return
			}
			data = data[0]
			this.ByEmploymentStatus.datasets[0].data = [data.student_female, data.employed_female, data.not_employed_female]
			this.ByEmploymentStatus.datasets[1].data = [data.student_male, data.employed_male, data.not_employed_male]
			this.ByEmploymentStatus.datasets[2].data = [parseInt(data.student_female) + parseInt(data.student_male), parseInt(data.not_employed_female) + parseInt(data.not_employed_male), parseInt(data.employed_male) + parseInt(data.employed_female)]
		})
	}

	getByKnowledgeOnFP() {
		const service = new BaseService(this.ByKnowledgeOnFPService.http, this.ByKnowledgeOnFPService.url, `municipality=${this.location['municipality']}&year=${this.location['year']}`)
		service.index().subscribe((data: KnowledgeOnFPType[] | any) => {
			if (data.length === 0) {
				return
			}
			data = data[0]
			this.ByKnowledgeOnFP.datasets[0].data = [data.females]
			this.ByKnowledgeOnFP.datasets[1].data = [data.males]
			this.ByKnowledgeOnFP.datasets[2].data = [parseInt(data.males) + parseInt(data.females)]
		})
	}

	getbyMonthlyIncome() {
		const service = new BaseService(this.byMonthlyIncomeService.http, this.byMonthlyIncomeService.url, `municipality=${this.location['municipality']}&year=${this.location['year']}`)
		service.index().subscribe((data: AverageMonthlyIncomeType[] | any) => {
			if (data.length === 0) {
				return
			}
			data = data[0]
			this.byMonthlyIncome.datasets[0].data = [
				parseInt(data.no_income_male),
				parseInt(data.under_5k_male),
				parseInt(data['5k_to_10k_female']),
				parseInt(data['10k_to_15k_female']),
				parseInt(data['15k_to_20k_female']),
				parseInt(data['20k_to_25k_female']),
				parseInt(data['above_25k_female']),
			]
			this.byMonthlyIncome.datasets[1].data = [parseInt(data.no_income_male), parseInt(data.under_5k_male), parseInt(data['5k_to_10k_male']), parseInt(data['10k_to_15k_male']), parseInt(data['15k_to_20k_male']), parseInt(data['20k_to_25k_male']), parseInt(data['above_25k_male'])]
			this.byMonthlyIncome.datasets[2].data = [
				parseInt(data.no_income_male) + parseInt(data.no_income_female),
				parseInt(data.under_5k_male) + parseInt(data.under_5k_female),
				parseInt(data['5k_to_10k_male']) + parseInt(data['5k_to_10k_female']),
				parseInt(data['10k_to_15k_male']) + parseInt(data['10k_to_15k_female']),
				parseInt(data['15k_to_20k_male']) + parseInt(data['15k_to_20k_female']),
				parseInt(data['20k_to_25k_male']) + parseInt(data['20k_to_25k_female']),
				parseInt(data['above_25k_male']) + parseInt(data['above_25k_female']),
			]
		})
	}

	numberOfCouplesChart = PMOCMonthChartConfig
	ByAgeGroup = ByAgeGroupConfig
	ByCIvilStatus = ByCIvilStatusConfig
	ByEmploymentStatus = ByEmploymentStatusConfig
	ByKnowledgeOnFP = ByKnowledgeOnFPConfig
	byMonthlyIncome = byMonthlyIncomeConfig
	ngOnInit(): void {}
}
