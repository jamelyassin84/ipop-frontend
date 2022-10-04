import {Route} from '@angular/router'
import {BirthDemographicComponent} from 'src/app/home/demographic/birth-demographic/birth-demographic.component'
import {DeathDemographicComponent} from 'src/app/home/demographic/death-demographic/death-demographic.component'
import {MarriageDemographicComponent} from 'src/app/home/demographic/marriage-demographic/marriage-demographic.component'
import {MigrationsDemographicComponent} from 'src/app/home/demographic/migrations-demographic/migrations-demographic.component'

export const DEMOGRAPHIC_ROUTES: Route = {
    path: 'demographic',
    children: [
        {
            path: 'deaths',
            component: DeathDemographicComponent,
            data: {animation: 'fade'},
        },
        {
            path: 'births',
            component: BirthDemographicComponent,
            data: {animation: 'fade'},
        },
        {
            path: 'migrations',
            component: MigrationsDemographicComponent,
            data: {animation: 'fade'},
        },
        {
            path: 'marriages',
            component: MarriageDemographicComponent,
            data: {animation: 'fade'},
        },
    ],
}
