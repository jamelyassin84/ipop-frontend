export const ByCIvilStatusConfig = {
	options: {
		scaleShowVerticalLines: false,
		responsive: true,
	},
	labels: ['Single', 'Co-Habiting/Live-in', 'Widow/er', 'Devorced/Separated'],
	legend: true,
	colors: [],
	datasets: [
		{
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			label: 'Females',
		},
		{
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			label: 'Males',
		},
		{
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			label: 'Total',
		},
	],
}
