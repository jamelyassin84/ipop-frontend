import { Component, OnInit } from '@angular/core'
import { Created, Fire, HasApprovals } from 'src/app/components/Alert'
import { KnowledgeOnFpService } from 'src/app/Services/home/rpfp/pmoc/knowledge-on-fp.service'

@Component({
	selector: 'CustomizeByKnowledgeOnFPChart',
	templateUrl: './customize-by-knowledge-on-fp-chart.component.html',
	styleUrls: ['./customize-by-knowledge-on-fp-chart.component.scss'],
})
export class CustomizeByKnowledgeOnFpChartComponent implements OnInit {
	constructor(private service: KnowledgeOnFpService) {}

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
			}
		)
	}
}
