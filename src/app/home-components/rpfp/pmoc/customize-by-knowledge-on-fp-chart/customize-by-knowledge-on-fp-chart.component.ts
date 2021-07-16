import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeByKnowledgeOnFPChart',
	templateUrl: './customize-by-knowledge-on-fp-chart.component.html',
	styleUrls: ['./customize-by-knowledge-on-fp-chart.component.scss'],
})
export class CustomizeByKnowledgeOnFpChartComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {})
	}
}
