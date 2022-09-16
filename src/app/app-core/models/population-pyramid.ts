export interface PopulationPyramid {
    data: {
        male: PyramidData
        females: PyramidData
    }
    barangay: null | string
    municipality: null | string
    year: null | string
}

export interface PyramidData {
    eighty_and_above: number
    '75-79': number
    '70-74': number
    '65-69': number
    '60-64': number
    '55-59': number
    '50-54': number
    '45-49': number
    '40-44': number
    '35-39': number
    '30-34': number
    '25-29': number
    '20-24': number
    '15-19': number
    '10-14': number
    '5-9': number
}
