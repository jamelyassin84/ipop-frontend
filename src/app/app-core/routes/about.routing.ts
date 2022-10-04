import {Route} from '@angular/router'
import {AwardsComponent} from 'src/app/home/about/awards/awards.component'
import {CoreValuesComponent} from 'src/app/home/about/core-values/core-values.component'
import {MandateComponent} from 'src/app/home/about/mandate/mandate.component'
import {OrganizationalChartComponent} from 'src/app/home/about/organizational-chart/organizational-chart.component'
import {PersonnelDirectoryComponent} from 'src/app/home/about/personnel-directory/personnel-directory.component'
import {VmgComponent} from 'src/app/home/about/vmg/vmg.component'

export const ABOUT_ROUTING: Route = {
    path: 'about',
    children: [
        {
            path: 'ppo-mandate',
            component: MandateComponent,
            data: {animation: 'fade'},
        },
        {
            path: 'mission-values-and-goals',
            component: VmgComponent,
            data: {animation: 'fade'},
        },
        {
            path: 'core-values',
            component: CoreValuesComponent,
            data: {animation: 'fade'},
        },
        {
            path: 'organizational-structure',
            component: OrganizationalChartComponent,
            data: {animation: 'fade'},
        },
        {
            path: 'personnel-directory',
            component: PersonnelDirectoryComponent,
            data: {animation: 'fade'},
        },
        {
            path: 'awards',
            component: AwardsComponent,
            data: {animation: 'fade'},
        },
    ],
}
