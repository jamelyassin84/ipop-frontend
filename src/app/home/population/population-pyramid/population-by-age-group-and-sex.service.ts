import {Injectable} from '@angular/core'
import {empty} from 'src/@digital_brand_work/pipes/is-empty.pipe'
import {getPercent} from 'src/app/constants/Shortcuts'

@Injectable({providedIn: 'root'})
export class PopulationByAgeGroupTableService {
    readonly LAST = '80 and above'

    process(data: any, type: string) {
        let temp: any[] = []

        const {male, female} = data[0]?.data

        for (let key in female) {
            let newText: string = ''
            if (key === 'eighty_and_above') {
                newText = '80 and above'
            }
            if (key === 'below_1_year_old') {
                newText = 'Below 1 Year Old'
            }
            if (type === 'Marriage' && key === '20-24') {
                newText = '18-24'
            }
            let total = parseFloat(male[key]) + parseFloat(female[key])
            temp.push({
                ageGroup:
                    key === 'eighty_and_above' ||
                    key === 'below_1_year_old' ||
                    (type === 'Marriage' && key === '20-24')
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

        if (temp.length === 0 || empty(temp[0].ageGroup)) {
            return temp
        }
        return temp[0].ageGroup === this.LAST ? temp.reverse() : temp
    }
}
