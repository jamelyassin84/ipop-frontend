export const ByAgeGroupConfig = {
	options: {
		scaleShowVerticalLines: false,
		responsive: true,
	},
	labels: ['15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45 & Up'],
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
