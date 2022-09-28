export const byMonthlyIncomeConfig = {
    options: {
        scaleShowVerticalLines: true,
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
    datasets: ['Female', 'Male', 'Total'].map((label) => {
        return {
            label: label,
            data: '12'.split('').map(() => 0),
        }
    }),
}
