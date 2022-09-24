export const migrationChartConfig = {
    options: {
        scaleShowVerticalLines: true,
        responsive: true,
        scales: {
            yAxes: [
                {
                    display: true,
                    ticks: {
                        suggestedMin: 0,
                        beginAtZero: true,
                    },
                },
            ],
        },
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
