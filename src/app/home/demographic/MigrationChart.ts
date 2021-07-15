export const MigrationChartConfig = {
	options: {
		scaleShowVerticalLines: false,
		responsive: true,
	},
	labels: ['2018', '2019', '2020'],
	legend: true,
	colors: [],
	datasets: [
		{
			data: [Math.random(), Math.random(), Math.random()],
			label: 'Out Migrations',
		},
		{
			data: [Math.random(), Math.random(), Math.random()],
			label: 'In Migrations',
		},
		{
			data: [Math.random(), Math.random(), Math.random()],
			label: 'Net Migrations',
		},
	],
}
