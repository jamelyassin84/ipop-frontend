export const monthChartConfig = {
    options: {
        scaleShowVerticalLines: true,
        responsive: true,
    },
    labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    legend: true,
    colors: [],
    datasets: [
        {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            label: 'Female',
        },
        {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            label: 'Male',
        },
        {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            label: 'Total',
        },
        {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            label: ' ',
        },
    ],
}
