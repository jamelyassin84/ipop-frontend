import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'get_dataset_by_year'})
export class GetDataSetByPipe implements PipeTransform {
    transform(chartData: any, year: number | null): number {
        const yearIndex = chartData.labels.findIndex((y: any) => {
            return y + '' === year?.toString()
        })

        if (yearIndex >= 0) {
            return chartData.datasets[0].data[yearIndex]
        }

        return 0
    }
}
