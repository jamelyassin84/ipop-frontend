import { Component, OnInit } from '@angular/core'
import { ByAgeGroupConfig } from './ByAgeGroup'
import { ByCIvilStatusConfig } from './ByCIvilStatus'
import { ByEmploymentStatusConfig } from './ByEmploymentStatus'
import { ByKnowledgeOnFPConfig } from './ByKnowledgeOnFP'
import { byMonthlyIncomeConfig } from './byMonthlyIncome'
import { PMOCMonthChartConfig } from './PMOCMonthChart'

@Component({
	selector: 'app-pmoc',
	templateUrl: './pmoc.component.html',
	styleUrls: ['./pmoc.component.scss'],
})
export class PmocComponent implements OnInit {
	constructor() {}

	location: any = {
		barangay: null,
		municipality: null,
		year: null,
	}
	fetch(event: any) {
		this.location = event
	}

	numberOfCouplesChart = PMOCMonthChartConfig
	ByAgeGroup = ByAgeGroupConfig
	ByCIvilStatus = ByCIvilStatusConfig
	ByEmploymentStatus = ByEmploymentStatusConfig
	ByKnowledgeOnFP = ByKnowledgeOnFPConfig
	byMonthlyIncome = byMonthlyIncomeConfig
	ngOnInit(): void {}
}
