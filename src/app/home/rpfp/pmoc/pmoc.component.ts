import {PmocDataService} from './../../../Services/home/rpfp/pmoc/pmoc-data.service'
import {KnowledgeOnFpService} from './../../../Services/home/rpfp/pmoc/knowledge-on-fp.service'
import {AverageMonthlyIncomeService} from './../../../Services/home/rpfp/pmoc/average-monthly-income.service'
import {CivilStatusService} from './../../../Services/home/rpfp/pmoc/civil-status.service'
import {Component, OnInit} from '@angular/core'
import {ByAgeGroupConfig} from './ByAgeGroup'
import {ByCIvilStatusConfig} from './ByCIvilStatus'
import {ByEmploymentStatusConfig} from './ByEmploymentStatus'
import {ByKnowledgeOnFPConfig} from './ByKnowledgeOnFP'
import {byMonthlyIncomeConfig} from './byMonthlyIncome'
import {PMOCMonthChartConfig} from './PMOCMonthChart'
import {AgeGroupService} from 'src/app/Services/home/rpfp/pmoc/age-group.service'
import {EmploymentStatusService} from 'src/app/Services/home/rpfp/pmoc/employment-status.service'
import {BaseService} from 'src/app/Services/base.service'
import {ReloadService} from 'src/app/Services/reload.service'
import {Subscription} from 'rxjs'
import {UserService} from 'src/app/Services/Independent/user.service'
import {Color} from 'ng2-charts'
import {empty} from 'src/@digital_brand_work/pipes/is-empty.pipe'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'app-pmoc',
    templateUrl: './pmoc.component.html',
    styleUrls: ['./pmoc.component.scss'],
    animations: [...dbwAnimations],
})
export class PmocComponent implements OnInit {
    constructor(
        private service: PmocDataService,
        private ByAgeGroupService: AgeGroupService,
        private ByCIvilStatusService: CivilStatusService,
        private ByEmploymentStatusService: EmploymentStatusService,
        private ByKnowledgeOnFPService: KnowledgeOnFpService,
        private byMonthlyIncomeService: AverageMonthlyIncomeService,
        private component: ReloadService,
        private user: UserService,
    ) {
        this.subscriptions.add(
            this.component.shouldReload().subscribe(() => {
                this.fetch(this.location)
            }),
        )
    }

    subscriptions = new Subscription()

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    readonly isUser = !this.user.isAdmin()

    readonly Colors: Color[] = [
        {backgroundColor: '#CD1125'},
        {backgroundColor: '#0039A9'},
        {backgroundColor: '#D7A405'},
    ]

    readonly location: any = {
        municipality: null,
        year: null,
    }

    localData: any = undefined

    numberOfCouplesChart = {...PMOCMonthChartConfig}
    ByAgeGroup = {...ByAgeGroupConfig}
    ByCIvilStatus = {...ByCIvilStatusConfig}
    ByEmploymentStatus = {...ByEmploymentStatusConfig}
    ByKnowledgeOnFP = {...ByKnowledgeOnFPConfig}
    byMonthlyIncome = {...byMonthlyIncomeConfig}

    numberOfCouplesData?: any
    ageGroupeData?: any
    employmentStatusData?: any
    KnowledgeOnFP?: any
    civilStatusData?: any
    monthlyIncomeData?: any
    pmocData?: any

    ngOnInit(): void {}

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

    getLocalData() {
        this.localData = undefined
        const service = new BaseService(
            this.service.http,
            this.service.url,
            `municipality=${this.location['municipality']}&year=${this.location['year']}`,
        )
        service.index().subscribe((pmc: any) => {
            this.pmocData = pmc.data

            if (empty(pmc) || empty(pmc.data) || empty(pmc.data.id)) {
                this.localData = {id: null}
            }
            this.localData = pmc.data
            this.renderNumberOfCouplesChart(pmc.month)
        })
    }

    renderNumberOfCouplesChart(data: any) {
        this.numberOfCouplesData = data

        this.numberOfCouplesChart.datasets = [{data: [0], label: 'Couples'}]

        this.numberOfCouplesChart.datasets[0].data = []

        for (let index in data) {
            const males = data[index].males

            this.numberOfCouplesChart.datasets[0].data.push(males)
        }
    }

    getByAgeGroup() {
        this.ageGroupeData = undefined
        const service = new BaseService(
            this.ByAgeGroupService.http,
            this.ByAgeGroupService.url,
            `municipality=${this.location['municipality']}&year=${this.location['year']}`,
        )
        service.index().subscribe((data: any[] | any) => {
            this.ageGroupeData = undefined
            if (data.length === 0) {
                this.ByAgeGroup = {
                    ...ByAgeGroupConfig,
                    datasets: [
                        ...['Female', 'Male', 'Total', ''].map((label) => {
                            return {
                                label: label,
                                data: '12'.split('').map(() => 0),
                            }
                        }),
                    ],
                }
                return
            }
            data = data[0]
            this.ageGroupeData = data
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
        this.civilStatusData = undefined
        const service = new BaseService(
            this.ByCIvilStatusService.http,
            this.ByCIvilStatusService.url,
            `municipality=${this.location['municipality']}&year=${this.location['year']}`,
        )
        service.index().subscribe((data: any[] | any) => {
            if (data.length === 0) {
                this.ByCIvilStatus = {
                    ...ByCIvilStatusConfig,
                    datasets: [
                        ...['Female', 'Male', 'Total', ''].map((label) => {
                            return {
                                label: label,
                                data: '12'.split('').map(() => 0),
                            }
                        }),
                    ],
                }

                return
            }
            data = data[0]
            this.civilStatusData = data
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
                parseFloat(data.single_male) + parseFloat(data.single_female),
                parseFloat(data.live_in_female) +
                    parseFloat(data.live_in_female),
                parseFloat(data.widow_male) + parseFloat(data.widow_female),
                parseFloat(data.separated_male) +
                    parseFloat(data.separated_female),
            ]
        })
    }

    getByEmploymentStatus() {
        const service = new BaseService(
            this.ByEmploymentStatusService.http,
            this.ByEmploymentStatusService.url,
            `municipality=${this.location['municipality']}&year=${this.location['year']}`,
        )
        service.index().subscribe((data: any[] | any) => {
            this.employmentStatusData = undefined
            if (data.length === 0) {
                this.ByEmploymentStatus = {
                    ...ByEmploymentStatusConfig,
                    datasets: [
                        ...['Female', 'Male', 'Total'].map((label) => {
                            return {
                                label: label,
                                data: '12'.split('').map(() => 0),
                            }
                        }),
                    ],
                }

                return
            }
            data = data[0]
            this.employmentStatusData = data
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
            `municipality=${this.location['municipality']}&year=${this.location['year']}`,
        )
        service.index().subscribe((data: any[] | any) => {
            this.KnowledgeOnFP = undefined

            if (data.length === 0) {
                this.ByKnowledgeOnFP = {
                    ...ByKnowledgeOnFPConfig,
                    datasets: [
                        ...['Female', 'Male', 'Total', ''].map((label) => {
                            return {
                                label: label,
                                data: '12'.split('').map(() => 0),
                            }
                        }),
                    ],
                }

                return
            }
            data = data[0]
            this.KnowledgeOnFP = data
            this.ByKnowledgeOnFP.datasets[0].data = [data.females]
            this.ByKnowledgeOnFP.datasets[1].data = [data.males]
            this.ByKnowledgeOnFP.datasets[2].data = [
                parseFloat(data.males) + parseFloat(data.females),
            ]
            this.ByKnowledgeOnFP.datasets[3].data = [0]
        })
    }

    getbyMonthlyIncome() {
        this.monthlyIncomeData = undefined
        const service = new BaseService(
            this.byMonthlyIncomeService.http,
            this.byMonthlyIncomeService.url,
            `municipality=${this.location['municipality']}&year=${this.location['year']}`,
        )
        service.index().subscribe((data: any[] | any) => {
            if (data.length === 0) {
                this.byMonthlyIncome = {
                    ...byMonthlyIncomeConfig,
                    datasets: [
                        ...['Female', 'Male', 'Total', ''].map((label) => {
                            return {
                                label: label,
                                data: '12'.split('').map(() => 0),
                            }
                        }),
                    ],
                }
                return
            }
            data = data[0]
            this.monthlyIncomeData = data
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
                parseFloat(data.no_income_female),
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
}
