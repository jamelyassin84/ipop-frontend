import {Injectable} from '@angular/core'
import {empty} from 'src/@digital_brand_work/pipes/is-empty.pipe'
import {getPercent} from 'src/app/constants/Shortcuts'

@Injectable({providedIn: 'root'})
export class PopulationByAgeGroupTableService {
    process(data: any) {
        let temp: any = []

        const {male, female} = data[0]?.data

        for (let key in female) {
            let newText: string = ''
            if (key === 'eighty_and_above') {
                newText = '80 and above'
            }
            if (key === 'below_1_year_old') {
                newText = 'Below 1 Year Old'
            }
            let total = parseFloat(male[key]) + parseFloat(female[key])
            temp.push({
                ageGroup:
                    key === 'eighty_and_above' || key === 'below_1_year_old'
                        ? newText
                        : key,
                male: male[key],
                percent_male: getPercent(male[key], total),
                female: female[key],
                percent_female: getPercent(female[key], total),
                total: total,
                percent_total:
                    getPercent(female[key], total) +
                    getPercent(male[key], total),
            })
        }
        return temp
    }
}
