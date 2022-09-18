export const ByCIvilStatusConfig = {
    options: {
        scaleShowVerticalLines: true,
        responsive: true,
    },
    labels: ['Single', 'Co-Habiting/Live-in', 'Widow/er', 'Divorced/Separated'],
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
