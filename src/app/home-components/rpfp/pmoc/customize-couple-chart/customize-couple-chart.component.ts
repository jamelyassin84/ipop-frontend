import {Component, OnInit, Input} from '@angular/core'
import {preMarriageData} from 'src/app/app-core/constants/pmoc/pmoc-data'
import {PreMarriageData} from 'src/app/app-core/models/PMOC.model'
import {LocationFIlter} from 'src/app/app-core/store/ngrx/locatition-filter/location-filter.model'
import {Fire, HasApprovals} from 'src/app/modules/extras/Alert'
import {MonthChartService} from 'src/app/Services/home/demographic/month-chart.service'

@Component({
    selector: 'CustomizeCoupleChart',
    templateUrl: './customize-couple-chart.component.html',
    styleUrls: ['./customize-couple-chart.component.scss'],
})
export class CustomizeCoupleChartComponent implements OnInit {
    constructor(private service: MonthChartService) {}

    @Input('data')
    set setData(data: any[]) {
        this.data = {
            ...this.data,
            males: Object.assign(
                {},
                ...data.map((monthData) => {
                    return {[monthData.month]: monthData.males}
                }),
            ),
        }
    }

    data = {...preMarriageData}

    isLoading: boolean = false

    ngOnInit(): void {}

    fetch(location: LocationFIlter) {
        this.data = {...this.data, ...location}
    }

    save() {
        this.data.months = this.data.males

        Fire(
            'Save Changes?',
            'Are you sure you want to add this data?',
            'info',
            () => {
                this.isLoading = true
                this.service.create(this.data).subscribe(() => {
                    HasApprovals('Created')
                    this.isLoading = false
                })
            },
        )
    }
}
