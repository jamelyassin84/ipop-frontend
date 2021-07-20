import { Component, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'
import { MonthChartService } from 'src/app/Services/home/demographic/month-chart.service'

@Component({
	selector: 'CustomizeCoupleChart',
	templateUrl: './customize-couple-chart.component.html',
	styleUrls: ['./customize-couple-chart.component.scss'],
})
export class CustomizeCoupleChartComponent implements OnInit {
	constructor(private service: MonthChartService) {}

	ngOnInit(): void {}

	data: any = {
		males: {
			January: 0,
			February: 0,
			March: 0,
			April: 0,
			May: 0,
			June: 0,
			July: 0,
			August: 0,
			September: 0,
			October: 0,
			November: 0,
			December: 0,
		},
		females: {
			January: 0,
			February: 0,
			March: 0,
			April: 0,
			May: 0,
			June: 0,
			July: 0,
			August: 0,
			September: 0,
			October: 0,
			November: 0,
			December: 0,
		},
	}

	fetch(event: any) {
		this.data.barangay = event.barangay
		this.data.municipality = event.municipality
		this.data.year = event.year
	}

	save() {
		this.data.months = this.data.males
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.service.create(this.data).subscribe(() => {
				Created()
			})
		})
	}
}
