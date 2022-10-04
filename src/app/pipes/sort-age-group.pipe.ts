import {Pipe, PipeTransform} from '@angular/core'
import {AgeGroupAndSex} from '../app-core/models/age-group-and-sex.model'

@Pipe({name: 'sort_age_group', pure: true})
export class SortAgeGroupPipe implements PipeTransform {
    transform(ageGroup: AgeGroupAndSex[]) {
        return sort_age_group(ageGroup)
    }
}

export function sort_age_group(ageGroup: AgeGroupAndSex[]): AgeGroupAndSex[] {
    const recommendedSort = [
        'Below 1 Year Old',
        '1-4',
        '5-9',
        '10-14',
        '15-19',
        '20-24',
        '25-29',
        '30-34',
        '35-39',
        '40-44',
        '45-49',
        '50-54',
        '55-59',
        '60-64',
        '65-69',
        '70-74',
        '75-79',
        '80 and above',
    ]

    return ageGroup.sort(
        (a, b) =>
            recommendedSort.indexOf(a.ageGroup) -
            recommendedSort.indexOf(b.ageGroup),
    )
}
