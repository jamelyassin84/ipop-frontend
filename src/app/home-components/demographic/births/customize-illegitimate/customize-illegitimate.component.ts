import { IncidenceChartService } from './../../../../Services/home/demographic/incidence-chart.service'
import { Component, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeIllegitimate',
	templateUrl: './customize-illegitimate.component.html',
	styleUrls: ['./customize-illegitimate.component.scss'],
})
export class CustomizeIllegitimateComponent implements OnInit {
	constructor(private service: IncidenceChartService) {}

	data: any = {
		type: 'Birth',
		title: 'Incidence of Illegitimate Birth',
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
