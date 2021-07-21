import { CivilStatusService } from './../../../../Services/home/rpfp/pmoc/civil-status.service'
import { Component, OnInit } from '@angular/core'
import { Created, Fire, HasApprovals } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeByCivilStatusChart',
	templateUrl: './customize-by-civil-status-chart.component.html',
	styleUrls: ['./customize-by-civil-status-chart.component.scss'],
})
export class CustomizeByCivilStatusChartComponent implements OnInit {
	constructor(private service: CivilStatusService) {}

	ngOnInit(): void {}

	data: any = {
		barangay: null,
		municipality: null,
		year: null,
	}

	fetch(event: any) {
		this.data.barangay = event.barangay
		this.data.municipality = event.municipality
		this.data.year = event.year
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
}
