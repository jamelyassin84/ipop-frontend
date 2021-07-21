import { Component, OnInit } from '@angular/core'
import { Created, Fire, HasApprovals } from 'src/app/components/Alert'
import { IncidenceChartService } from 'src/app/Services/home/demographic/incidence-chart.service'

@Component({
	selector: 'CustomizeTeenage',
	templateUrl: './customize-teenage.component.html',
	styleUrls: ['./customize-teenage.component.scss'],
})
export class CustomizeTeenageComponent implements OnInit {
	constructor(private service: IncidenceChartService) {}

	data: any = {
		type: 'Birth',
		title: 'Incidence of Teenage Birth',
		years: [],
	}

	fetch(event: any) {
		this.data.barangay = event.barangay
		this.data.municipality = event.municipality
		this.data.years[0] = event.year
	}

	isLoading: boolean = false
	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.isLoading = true
			this.service.create(this.data).subscribe(() => {
				HasApprovals('Created')
				this.isLoading = false
			})
		})
	}

	ngOnInit(): void {}
}
