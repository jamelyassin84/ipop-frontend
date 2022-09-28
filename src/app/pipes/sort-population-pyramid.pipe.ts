export function sortPyramid(ageGroup: any[]) {
    const recommendedSort = [
        '0-4',
        '5-9',
        '10-14',
        '15-19',
        '20-24',
        '25-29',
        '35-39',
        '30-34',
        '40-44',
        '45-49',
        '50-54',
        '55-59',
        '60-64',
        '65-69',
        '70-74',
        '75-79',
        '80 and above',
        'Age',
    ].reverse()

    const sorted = ageGroup.sort((a, b) => {
        return recommendedSort.indexOf(a[0]) - recommendedSort.indexOf(b[0])
    })

    console.log(sorted)

    return sorted
}
