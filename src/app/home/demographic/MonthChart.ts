export const MonthChartConfig = {
	options: {
		scaleShowVerticalLines: false,
		responsive: true,
	},
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
