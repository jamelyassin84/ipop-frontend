import { Component, Input, OnInit } from '@angular/core'
import { Color } from 'ng2-charts'
import { MigrationChartConfig } from 'src/app/home/demographic/MigrationChart'
import { TopPopulated } from '../top-populated.component'

@Component({
	selector: 'top-populated-graph',
	templateUrl: './top-populated-graph.component.html',
	styleUrls: ['./top-populated-graph.component.scss'],
})
export class TopPopulatedGraphComponent implements OnInit {
	constructor() {}

	@Input('topPopulated') set setTopPopulated(topPopulated: TopPopulated[]) {
		let labels: string[] = []

		let datasets: number[] = []

		for (let municipality of topPopulated) {
			labels.push(municipality.data.name)

			datasets.push(municipality.data.total)
		}

		this.migrationChart.labels = labels

		this.migrationChart.datasets[0].data = datasets
	}

	migrationChart = MigrationChartConfig

	Colors: Color[] = [{ backgroundColor: '#2196F3' }]

	ngOnInit(): void {}
}
