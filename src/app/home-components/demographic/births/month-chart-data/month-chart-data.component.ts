import {MonthChartService} from './../../../../Services/home/demographic/month-chart.service'
import {Component, Input, OnInit} from '@angular/core'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'
import {monthChartData} from 'src/app/app-core/constants/month-chart/month-chart-data'
import {Statistic} from 'src/app/home/demographic/migrations-demographic/migrations-demographic.component'

@Component({
    selector: 'CustomizeMonthChart',
    templateUrl: './month-chart-data.component.html',
    styleUrls: ['./month-chart-data.component.scss'],
})
export class MonthChartDataComponent implements OnInit {
    constructor(private service: MonthChartService) {}

    @Input()
    single: boolean = false

    @Input()
    location?: LocationFIlter

    @Input('type')
    set setType(type: string) {
        this.monthChartData.type = type
    }

    @Input('chartData')
    set setForms(months: Statistic[]) {
        const assignData = (key: 'males' | 'females') => {
            return Object.assign(
                {},
                ...months.map((monthData) => {
                    return {[monthData.month]: monthData[key]}
                }),
            )
        }

        let males = {...this.monthChartData.males}
        let females = {...this.monthChartData.females}

        if (months.length !== 0) {
            males = assignData('males')
            females = assignData('females')
        }

        this.monthChartData = {
            ...this.monthChartData,
            males: males,
            females: females,
        }
    }

    tabs: any = {
        males: true,
        famales: false,
    }

    isLoading: boolean = false

    monthChartData = {...monthChartData}

    ngOnInit(): void {}

    changeTab(tab: any) {
        for (let key in this.tabs) {
            this.tabs[key] = false
        }
        this.tabs[tab] = true
    }

    save() {
        if (this.location) {
            this.monthChartData = {
                ...this.monthChartData,
                ...(this.location as any),
            }
        }

        Fire(
            'Save Changes?',
            'Are you sure you want to add this data?',
            'info',
            () => {
                this.isLoading = true
                this.monthChartData.gender = 'male'
                this.monthChartData.months = this.monthChartData.males

                this.service.create(this.monthChartData).subscribe(() => {
                    HasApprovals('Created')

                    this.isLoading = false
                })
            },
        )
    }
}
