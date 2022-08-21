export const byMonthlyIncomeConfig = {
    options: {
        scaleShowVerticalLines: false,
        responsive: true,
    },
    labels: [
        'No Income',
        'Under ₱5,000',
        '₱5,000-₱9,999',
        '₱10,000-₱14,999',
        '₱15,000-₱19-999',
        '₱20,000-₱24,999',
        '₱25,000 Up',
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
    ],
}
