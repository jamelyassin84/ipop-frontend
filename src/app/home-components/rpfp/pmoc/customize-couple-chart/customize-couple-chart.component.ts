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
		barangay: null,
		municipality: null,
		year: null,
		gender: 'male',
	}

	fetch(event: any) {
		this.data.barangay = event.barangay
		this.data.municipality = event.municipality
		this.data.year = event.year
	}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.service.create(this.data).subscribe(() => {
				Created()
			})
		})
	}
}
