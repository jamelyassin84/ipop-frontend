import {Injectable} from '@angular/core'
import {ChartDataset} from 'src/app/app-core/models/chart-dataset.model'

@Injectable({providedIn: 'root'})
export class TypeofMarriageService {
    convertToChart(data: any): {
        labels: string[]
        datasets: ChartDataset[]
        summary: Summary
    } {
        let summary: Summary = {
            total_marriages: 0,
            population: 0,
            church: 0,
            civil: 0,
            others: 0,
        }

        for (let stat of data.summary) {
            summary.total_marriages += stat.total_marriages
            summary.population += stat.population
            summary.church += stat.church
            summary.civil += stat.civil
            summary.others += stat.others
        }

        let labels: any = []

        let datasets: ChartDataset[] = [
            'Church',
            'Civil',
            'Others',
            'Total Marriages',
        ].map((label) => {
            return {
                data: [],
                label: label,
            }
        })

        for (let index of data.month) {
            if (index.year !== 2100) {
                labels.push(index.year)
                datasets[0].data.push(index.church)
                datasets[1].data.push(index.civil)
                datasets[2].data.push(index.others)
                datasets[3].data.push(index.total_marriages)
            }
        }

        return {
            labels: labels,
            summary: summary,
            datasets: datasets,
        }
    }
}

interface Summary {
    total_marriages: number
    population: number
    church: number
    civil: number
    others: number
}
