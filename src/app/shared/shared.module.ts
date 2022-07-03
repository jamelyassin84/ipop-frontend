import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TopPopulatedListComponent } from '../home/population/top-populated/top-populated-list/top-populated-list.component'
import { TopPopulatedGraphComponent } from '../home/population/top-populated/top-populated-graph/top-populated-graph.component'
import { TopPopulatedSharedComponent } from '../home/population/top-populated/top-populated.component'
import { GetPercentagePipe } from '../pipes/get-percentage.pipe'
import { SortByMunicipalityPipe } from '../pipes/sort-by-municipality.pipe'
import { GoogleChartsModule } from 'angular-google-charts'
import { ChartsModule } from 'ng2-charts'

const components = [
	TopPopulatedListComponent,
	TopPopulatedGraphComponent,
	TopPopulatedSharedComponent,
]

const modules = [CommonModule, ChartsModule, GoogleChartsModule]

const pipes = [GetPercentagePipe, SortByMunicipalityPipe]

@NgModule({
	declarations: [...components, ...pipes],
	imports: [...modules],
	exports: [...components, ...modules, ...pipes],
})
export class SharedModule {}
