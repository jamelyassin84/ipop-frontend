import { PmocDataService } from './../../../Services/home/rpfp/pmoc/pmoc-data.service'
import { PMOCType } from './../../../Types/rpfp/pmoc/PMOC.types'
import { KnowledgeOnFpService } from './../../../Services/home/rpfp/pmoc/knowledge-on-fp.service'
import { AverageMonthlyIncomeService } from './../../../Services/home/rpfp/pmoc/average-monthly-income.service'
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
import { ReloadService } from 'src/app/Services/reload.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-pmoc',
	templateUrl: './pmoc.component.html',
	styleUrls: ['./pmoc.component.scss'],
})
export class PmocComponent implements OnInit {
	constructor(
		private service: PmocDataService,
		private ByAgeGroupService: AgeGroupService,
		private ByCIvilStatusService: CivilStatusService,
		private ByEmploymentStatusService: EmploymentStatusService,
		private ByKnowledgeOnFPService: KnowledgeOnFpService,
		private byMonthlyIncomeService: AverageMonthlyIncomeService,
		private component: ReloadService
	) {
		this.subscriptions.add(
			this.component.shouldReload().subscribe(() => {
				this.fetch(this.location)
			})
		)
	}

	private subscriptions = new Subscription()

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	location: any = {
		municipality: null,
		year: null,
	}

	fetch(event: any) {
		this.location.municipality = event.municipality
		this.location.year = event.year
		this.getLocalData()
		this.getByAgeGroup()
		this.getByCIvilStatus()
		this.getByEmploymentStatus()
		this.getByKnowledgeOnFP()
		this.getbyMonthlyIncome()
	}

	localData: any = {}
	getLocalData() {
		for (let key in this.localData) {
			this.localData[key] = 0
		}
		const service = new BaseService(
			this.service.http,
			this.service.url,
			`municipality=${this.location['municipality']}&year=${this.location['year']}`
		)
		service.index().subscribe((pmc: any) => {
			if (pmc.data.id === undefined) {
				this.localData = { id: null }
			}
			this.localData = pmc.data
			this.renderNumberOfCouplesChart(pmc.month)
		})
	}

	renderNumberOfCouplesChart(data: any) {
		this.numberOfCouplesChart.datasets[0].data = []
		for (let index in data) {
			this.numberOfCouplesChart.datasets[0].data.push(data[index].males)
		}
	}

	getByAgeGroup() {
		const service = new BaseService(
			this.ByAgeGroupService.http,
			this.ByAgeGroupService.url,
			`municipality=${this.location['municipality']}&year=${this.location['year']}`
		)
		service.index().subscribe((data: any[] | any) => {
			data = data[0]
			if (data.length === 0) {
				return
			}
			this.ByAgeGroup.datasets[0].data = [
				parseFloat(data['15_to_19_female']),
				parseFloat(data['20_to_24_female']),
				parseFloat(data['25_to_29_female']),
				parseFloat(data['30_to_34_female']),
				parseFloat(data['35_to_39_female']),
				parseFloat(data['40_to_44_female']),
				parseFloat(data['45_and_above_female']),
			]
			this.ByAgeGroup.datasets[1].data = [
				parseFloat(data['15_to_19_male']),
				parseFloat(data['20_to_24_male']),
				parseFloat(data['25_to_29_male']),
				parseFloat(data['30_to_34_male']),
				parseFloat(data['35_to_39_male']),
				parseFloat(data['40_to_44_male']),
				parseFloat(data['45_and_above_male']),
			]
			this.ByAgeGroup.datasets[2].data = [
				parseFloat(data['15_to_19_female']) +
					parseFloat(data['15_to_19_male']),
				parseFloat(data['20_to_24_female']) +
					parseFloat(data['20_to_24_male']),
				parseFloat(data['25_to_29_female']) +
					parseFloat(data['25_to_29_male']),
				parseFloat(data['30_to_34_female']) +
					parseFloat(data['30_to_34_male']),
				parseFloat(data['35_to_39_female']) +
					parseFloat(data['35_to_39_male']),
				parseFloat(data['40_to_44_female']) +
					parseFloat(data['40_to_44_male']),
				parseFloat(data['45_and_above_female']) +
					parseFloat(data['45_and_above_male']),
			]
		})
	}

	getByCIvilStatus() {
		const service = new BaseService(
			this.ByCIvilStatusService.http,
			this.ByCIvilStatusService.url,
			`municipality=${this.location['municipality']}&year=${this.location['year']}`
		)
		service.index().subscribe((data: any[] | any) => {
			data = data[0]
			if (data.length === 0) {
				return
			}
			this.ByCIvilStatus.datasets[0].data = [
				parseFloat(data.single_female),
				parseFloat(data.live_in_female),
				parseFloat(data.widow_female),
				parseFloat(data['separated_female']),
			]
			this.ByCIvilStatus.datasets[1].data = [
				parseFloat(data.single_male),
				parseFloat(data.live_in_male),
				parseFloat(data.widow_male),
				parseFloat(data['separated_male']),
			]
			this.ByCIvilStatus.datasets[2].data = [
				(parseFloat(data.single_male) +
					parseFloat(data.single_female)) /
					2,
				(parseFloat(data.live_in_female) +
					parseFloat(data.live_in_female)) /
					2,
				(parseFloat(data.widow_male) + parseFloat(data.widow_female)) /
					2,

				(parseFloat(data.separated_male) +
					parseFloat(data.separated_female)) /
					2,
			]
		})
	}

	getByEmploymentStatus() {
		const service = new BaseService(
			this.ByEmploymentStatusService.http,
			this.ByEmploymentStatusService.url,
			`municipality=${this.location['municipality']}&year=${this.location['year']}`
		)
		service.index().subscribe((data: any[] | any) => {
			data = data[0]
			if (data.length === 0) {
				return
			}
			this.ByEmploymentStatus.datasets[0].data = [
				data.student_female,
				data.employed_female,
				data.not_employed_female,
			]
			this.ByEmploymentStatus.datasets[1].data = [
				data.student_male,
				data.employed_male,
				data.not_employed_male,
			]
			this.ByEmploymentStatus.datasets[2].data = [
				parseFloat(data.student_female) + parseFloat(data.student_male),
				parseFloat(data.employed_female) +
					parseFloat(data.employed_male),
				parseFloat(data.not_employed_female) +
					parseFloat(data.not_employed_male),
			]
		})
	}

	getByKnowledgeOnFP() {
		const service = new BaseService(
			this.ByKnowledgeOnFPService.http,
			this.ByKnowledgeOnFPService.url,
			`municipality=${this.location['municipality']}&year=${this.location['year']}`
		)
		service.index().subscribe((data: any[] | any) => {
			data = data[0]
			if (data.length === 0) {
				return
			}
			this.ByKnowledgeOnFP.datasets[0].data = [data.females]
			this.ByKnowledgeOnFP.datasets[1].data = [data.males]
			this.ByKnowledgeOnFP.datasets[2].data = [
				parseFloat(data.males) + parseFloat(data.females),
			]
		})
	}

	getbyMonthlyIncome() {
		const service = new BaseService(
			this.byMonthlyIncomeService.http,
			this.byMonthlyIncomeService.url,
			`municipality=${this.location['municipality']}&year=${this.location['year']}`
		)
		service.index().subscribe((data: any[] | any) => {
			data = data[0]
			if (data.length === 0) {
				return
			}
			this.byMonthlyIncome.datasets[0].data = [
				parseFloat(data.no_income_male),
				parseFloat(data.under_5k_male),
				parseFloat(data['5k_to_10k_female']),
				parseFloat(data['10k_to_15k_female']),
				parseFloat(data['15k_to_20k_female']),
				parseFloat(data['20k_to_25k_female']),
				parseFloat(data['above_25k_female']),
			]
			this.byMonthlyIncome.datasets[1].data = [
				parseFloat(data.no_income_male),
				parseFloat(data.under_5k_male),
				parseFloat(data['5k_to_10k_male']),
				parseFloat(data['10k_to_15k_male']),
				parseFloat(data['15k_to_20k_male']),
				parseFloat(data['20k_to_25k_male']),
				parseFloat(data['above_25k_male']),
			]
			this.byMonthlyIncome.datasets[2].data = [
				parseFloat(data.no_income_male) +
					parseFloat(data.no_income_female),
				parseFloat(data.under_5k_male) +
					parseFloat(data.under_5k_female),
				parseFloat(data['5k_to_10k_male']) +
					parseFloat(data['5k_to_10k_female']),
				parseFloat(data['10k_to_15k_male']) +
					parseFloat(data['10k_to_15k_female']),
				parseFloat(data['15k_to_20k_male']) +
					parseFloat(data['15k_to_20k_female']),
				parseFloat(data['20k_to_25k_male']) +
					parseFloat(data['20k_to_25k_female']),
				parseFloat(data['above_25k_male']) +
					parseFloat(data['above_25k_female']),
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
