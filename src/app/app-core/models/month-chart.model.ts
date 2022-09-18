import {LocationFIlter} from './location-filter.model'
import {MonthlyData} from './PMOC.model'

export interface MonthChart extends LocationFIlter {
    type: string
    males: MonthlyData
    females: MonthlyData
    months?: MonthlyData
    gender: 'male' | 'female'
}
