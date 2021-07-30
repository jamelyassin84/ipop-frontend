import { MarraigesService } from './../../../Services/home/demographic/marraiges/marraiges.service'
import { Component, OnInit, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs'
import { BaseService } from 'src/app/Services/base.service'
import { ReloadService } from 'src/app/Services/reload.service'
import { PopulationPyramidComponent } from '../../population/population-pyramid/population-pyramid.component'
import { MonthChartConfig } from '../MonthChart'
import { UserService } from 'src/app/Services/Independent/user.service'
import { Color } from 'ng2-charts'
import { MarriageChartConfig } from '../MigrationChart'

@Component({
	selector: 'app-marriage-demographic',
	templateUrl: './marriage-demographic.component.html',
	styleUrls: ['./marriage-demographic.component.scss'],
})
export class MarriageDemographicComponent implements OnInit {
	@ViewChild(PopulationPyramidComponent) pyramid: any

	constructor(
		private component: ReloadService,
		private service: MarraigesService,
		private user: UserService
	) {
		this.subscriptions.add(
			this.component.shouldReload().subscribe(() => {
				this.ngOnInit()
				this.fetch(this.location)
			})
		)
	}

	isUser = !this.user.isAdmin()

	private subscriptions = new Subscription()

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	Colors: Color[] = [
		{ backgroundColor: '#FDEADB' },
		{ backgroundColor: '#D4A77D' },
		{ backgroundColor: '#D7A405' },
		{ backgroundColor: '#B4833A' },
	]

	location: any = {
		barangay: null,
		municipality: null,
		year: null,
	}
	fetch(event: any) {
		this.location = event
		this.getSummary()
		this.getLocalData()
		this.getMarriagesByMuncipality()
	}

	summaries: any = {}
	getSummary() {
		new BaseService(
			this.service.http,
			'marriage-statistics/summary',
			`year=${this.location['year']}`
		)
			.index()
			.subscribe((data) => {
				this.summaries = data
				this.pyramid.fetch()
				let labels: any = []
				let datasets: any = [
					{
						data: [],
						label: 'Church',
					},
					{
						data: [],
						label: 'Civil',
					},
					{
						data: [],
						label: 'Others',
					},
					{
						data: [],
						label: 'Total Weddings',
					},
				]
				for (let index of data.month) {
					labels.push(index.year)
					datasets[0].data.push(index.church)
					datasets[1].data.push(index.civil)
					datasets[2].data.push(index.others)
					datasets[3].data.push(index.total_marriages)
				}
				this.marriageConfig.labels = labels
				this.marriageConfig.datasets = datasets
			})
	}

	localData: any = {}
	getLocalData() {
		this.localData = {
			total: 0,
			crude_death_rate: 0,
		}
		const service = new BaseService(
			this.service.http,
			this.service.url,
			`municipality=${this.location['municipality']}&barangay=${this.location['barangay']}&year=${this.location['year']}`
		)
		service.index().subscribe((summaries: any) => {
			this.localData = summaries?.data || {}
			this.processStatisticalChart(summaries.month)
		})
	}

	processStatisticalChart(months: Array<Statistic>) {
		this.statisticalChart.labels = []
		this.statisticalChart.datasets = [{ data: [0], label: 'Wedding' }]
		if (months.length === 0) {
			return
		}
		let labels: any = []
		let males: any = []
		months.forEach((data: Statistic) => {
			if (!labels.includes(data.month)) {
				labels.push(data.month)
			}
			males.push(data.males)
		})
		this.statisticalChart.labels = labels
		this.statisticalChart.datasets[0].data = males
	}

	marriagesByMuncipality: any = []
	marriagesByMuncipalityKeys: any = [
		'municipality',
		'population',
		'total_marriages',
		'church',
		'civil',
		'others',
	]
	marriagesByMuncipalityHeaders = [
		'Municipality',
		'Population',
		'Total Marriages',
		'Church',
		'Civil',
		'Others',
	]
	getMarriagesByMuncipality() {
		new BaseService(
			this.service.http,
			'marriage-statistics-by-municipality',
			`year=${this.location['year']}`
		)
			.index()
			.subscribe((data) => {
				this.marriagesByMuncipality = data
			})
	}

	statisticalChart = MonthChartConfig
	ngOnInit(): void {}

	getPercentage(value: number, basis: number) {
		return (value * 100) / basis
	}

	marriageConfig = MarriageChartConfig
}

type Statistic = {
	males: number
	females: number
	total: number
	month: number
}
