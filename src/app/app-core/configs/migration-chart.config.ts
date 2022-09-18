export const migrationChartConfig = {
    options: {
        scaleShowVerticalLines: true,
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
