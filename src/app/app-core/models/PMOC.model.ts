import {LocationFIlter} from './location-filter.model'

export interface PreMarriageData extends LocationFIlter {
    type: string
    males: MonthlyData
    females: MonthlyData
    months?: MonthlyData
}

export interface MonthlyData {
    January: number
    February: number
    March: number
    April: number
    May: number
    June: number
    July: number
    August: number
    September: number
    October: number
    November: number
    December: number
}
