export const MigrationChartConfig = {
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {min: 0, max: 150000},
                },
            ],
        },
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

export const MarriageChartConfig = {
    options: {
        scaleShowVerticalLines: true,
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
