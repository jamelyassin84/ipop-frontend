export const MigrationChartConfig = {
	options: {
		scaleShowVerticalLines: false,
		responsive: true,
	},
	labels: ['Out Migrations', 'In Migrations', 'Net Migrations'],
	legend: true,
	colors: [],
	datasets: [
		{
			data: [0, 0, 0],
			label: 'Data',
		},
	],
}

export const MarriageChartConfig = {
	options: {
		scaleShowVerticalLines: false,
		responsive: true,
	},
	labels: ['', '', ''],
	legend: true,
	colors: [],
	datasets: [
		{
			data: [0, 0, 0],
			label: 'Data',
		},
	],
}
