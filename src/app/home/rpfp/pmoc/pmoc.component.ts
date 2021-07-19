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
			console.log('NumberOfCouplesFPType', data)
		})
	}

	getByAgeGroup() {
		const service = new BaseService(this.ByAgeGroupService.http, this.ByAgeGroupService.url, `municipality=${this.location['municipality']}&year=${this.location['year']}`)
		service.index().subscribe((data: AgeGroupType) => {
			console.log('AgeGroupType', data)
		})
	}

	getByCIvilStatus() {
		const service = new BaseService(this.ByCIvilStatusService.http, this.ByCIvilStatusService.url, `municipality=${this.location['municipality']}&year=${this.location['year']}`)
		service.index().subscribe((data: ByCivilStatusType) => {
			console.log('ByCivilStatusType', data)
		})
	}

	getByEmploymentStatus() {
		const service = new BaseService(this.ByEmploymentStatusService.http, this.ByEmploymentStatusService.url, `municipality=${this.location['municipality']}&year=${this.location['year']}`)
		service.index().subscribe((data: EmployemntStatusType) => {
			console.log('EmployemntStatusType', data)
		})
	}

	getByKnowledgeOnFP() {
		const service = new BaseService(this.ByKnowledgeOnFPService.http, this.ByKnowledgeOnFPService.url, `municipality=${this.location['municipality']}&year=${this.location['year']}`)
		service.index().subscribe((data: KnowledgeOnFPType) => {
			console.log('KnowledgeOnFPType', data)
		})
	}

	getbyMonthlyIncome() {
		const service = new BaseService(this.byMonthlyIncomeService.http, this.byMonthlyIncomeService.url, `municipality=${this.location['municipality']}&year=${this.location['year']}`)
		service.index().subscribe((data: AverageMonthlyIncomeType) => {
			console.log('AverageMonthlyIncomeType', data)
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
