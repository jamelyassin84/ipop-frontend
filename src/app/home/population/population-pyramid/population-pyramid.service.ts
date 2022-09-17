import {empty} from 'src/@digital_brand_work/pipes/is-empty.pipe'
import {Injectable} from '@angular/core'

@Injectable({providedIn: 'root'})
export class PopulationPyramidChartService {
    readonly LAST = '80 and above'

    process(data: any) {
        let ageDistribution: any[] = [['Age', 'Male', 'Female']]

        if (data.length !== 0) {
            data = data.reverse()

            const {male, female} = data[0]?.data

            for (let key in female) {
                if (key !== 'below_1_year_old') {
                    if (key !== '1-4') {
                        let newText = ''

                        if (key === 'eighty_and_above') {
                            newText = '80 and above'
                        }

                        ageDistribution.push([
                            key === 'eighty_and_above' ? newText : key,
                            -Math.abs(parseFloat(male[key])),
                            parseFloat(female[key]),
                        ])
                    }
                }
            }

            ageDistribution.push([
                '0-4',
                -Math.abs(
                    parseFloat(male['below_1_year_old']) +
                        parseFloat(male['1-4']),
                ),
                Math.abs(
                    parseFloat(female['below_1_year_old']) +
                        parseFloat(female['1-4']),
                ),
            ])
        } else {
            ageDistribution = []
        }

        return ageDistribution[1][0] === this.LAST
            ? ageDistribution
            : ageDistribution.reverse()
    }
}
