import {HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TopPopulatedListComponent} from '../home/population/top-populated/top-populated-list/top-populated-list.component'
import {TopPopulatedGraphComponent} from '../home/population/top-populated/top-populated-graph/top-populated-graph.component'
import {TopPopulatedSharedComponent} from '../home/population/top-populated/top-populated.component'
import {GoogleChartsModule} from 'angular-google-charts'
import {ChartsModule} from 'ng2-charts'
import {appPipes, globalPipes} from './global.pipe'
import {appDirectives, globalDirectives} from './global.directive'
import {matModules} from './mat.modules'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

const components = [
    TopPopulatedListComponent,
    TopPopulatedGraphComponent,
    TopPopulatedSharedComponent,
]

const modules = [
    CommonModule,
    ChartsModule,
    GoogleChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    ...matModules,
]

const pipes = [...globalPipes, ...appPipes]

const directives = [...globalDirectives, ...appDirectives]

@NgModule({
    declarations: [...components, ...pipes, ...directives],
    imports: [...modules],
    exports: [...components, ...modules, ...pipes, ...directives],
})
export class SharedModule {}
