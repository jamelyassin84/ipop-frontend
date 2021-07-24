export const ChartOptions = {
	pyramidChartOptions: {
		backgroundColor: {
			fill: 'transparent',
			opacity: 0,
		},
		titleTextStyle: {
			color: 'gray',
			fontSize: 30,
			align: 'center',
			bold: true,
		},
		colors: ['#0039A9', '#CD1125'],
		chartArea: { backgroundColor: 'transparent', height: '100%', top: '%' },
		isStacked: true,
		hAxis: {
			textPosition: 'none',
			format: ';',
			title: '',
			textStyle: {
				color: 'gray',
			},
		},
		vAxis: {
			direction: 1,
			title: '',
			textStyle: {
				color: 'gray',
			},
		},
		legend: { textStyle: { color: 'gray' } },
	},
}

const googleChartOptions = ChartOptions

export function drawChart(chartId: any, chartData: any) {
	let style = googleChartOptions.pyramidChartOptions
	const chart = () => {
		var data = google.visualization.arrayToDataTable(chartData)
		var chart = new google.visualization.BarChart(
			document.getElementById(chartId)!
		)
		var formatter = new google.visualization.NumberFormat({
			pattern: ';',
		})
		formatter.format(data, 2)
		chart.draw(data, style)
	}
	google.load('visualization', '1', { packages: ['corechart'] })
	google.setOnLoadCallback(chart)
}
