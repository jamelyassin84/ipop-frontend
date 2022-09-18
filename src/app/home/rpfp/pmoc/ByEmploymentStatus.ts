export const ByEmploymentStatusConfig = {
    options: {
        scaleShowVerticalLines: true,
        responsive: true,
    },
    labels: ['Students', 'Employed', 'Unemployed'],
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
    ],
}
