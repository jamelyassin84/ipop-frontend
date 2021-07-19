import { Component, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'
import { IncidenceChartService } from 'src/app/Services/home/demographic/incidence-chart.service'

@Component({
	selector: 'AddCrudeDeathRate',
	templateUrl: './add-crude-death-rate.component.html',
	styleUrls: ['./add-crude-death-rate.component.scss'],
})
export class AddCrudeDeathRateComponent implements OnInit {
	constructor(private service: IncidenceChartService) {}

	data: any = {
		type: 'Death',
		title: 'Crude Death Rate',
		years: [],
	}

	fetch(event: any) {
		this.data.barangay = event.barangay
		this.data.municipality = event.municipality
		this.data.years[0] = event.year
	}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.service.create(this.data).subscribe(() => {
				Created()
			})
		})
	}

	ngOnInit(): void {}
}
